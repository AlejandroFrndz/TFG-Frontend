import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { selectProject } from "src/redux/projects/selectors";
import { IProject } from "src/utils/api/resources/project";
import { MarcoTAO } from "src/utils/constants";
import {
  Affix,
  Button,
  Col,
  Divider,
  message,
  Modal,
  Popconfirm,
  Row,
  Tooltip,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { ITriple } from "src/utils/api/resources/triple";
import API from "src/utils/api";
import { FullScreenLoader } from "src/shared/components/FullScreenLoader";
import { TaggingTable } from "./components/TaggingTable";
import _ from "lodash";
import { ISemanticRoleTag } from "src/utils/api/resources/tags/semanticRole";
import { ILexicalDomainTag } from "src/utils/api/resources/tags/lexicalDomain";
import { ISemanticCategoryTag } from "src/utils/api/resources/tags/semanticCategory";
import { IErrorTag } from "src/utils/api/resources/tags/error";
import { setProject } from "src/redux/projects/actions";
import { CloudDownloadOutlined } from "@ant-design/icons";
import { DownloadFiles } from "../VisualizationStep/components/DownloadFiles";

const { Title, Text } = Typography;

const isTripleMissingTag = (triple: ITriple) => {
  if (triple.problem) {
    return false;
  }

  const noun1 = !!(triple.noun1.sc && triple.noun1.tr);
  const verb = !!triple.verb.domain;
  const noun2 = !!(triple.noun2.sc && triple.noun2.tr);

  return !(noun1 && noun2 && verb);
};

export const TaggingStep: React.FC = () => {
  const project = useSelector(selectProject()) as IProject;
  const dispatch = useDispatch();

  const [triples, setTriples] = useState<ITriple[]>([]);
  const [trTags, setTrTags] = useState<ISemanticRoleTag[]>([]);
  const [scTags, setScTags] = useState<ISemanticCategoryTag[]>([]);
  const [domainTags, setDomainTags] = useState<ILexicalDomainTag[]>([]);
  const [errorTags, setErrorTags] = useState<IErrorTag[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [updatedTriples, setUpdatedTriples] = useState<ITriple[]>([]);
  const [isLoadingTagsUpdate, setIsLoadingTagsUpdate] = useState(false);

  const [isFinishAlertVisible, setIsFinishAlertVisible] = useState(false);

  const [isDownloadModalVisible, setIsDownloadModalVisible] = useState(false);

  const hideDownloadModal = () => setIsDownloadModalVisible(false);
  const showDownloadModal = () => setIsDownloadModalVisible(true);

  useEffect(() => {
    const fetchTriples = async () => {
      setIsLoading(true);

      const [triplesResponse, tagsResponse] = await Promise.all([
        API.triple.getAllForProject(project.id),
        API.tags.getAll(),
      ]);

      if (triplesResponse.isSuccess()) {
        setTriples(triplesResponse.value);
      }

      if (tagsResponse.isSuccess()) {
        const { lexicalDomain, semanticRole, semanticCategory, errors } =
          tagsResponse.value;

        setDomainTags(lexicalDomain);
        setTrTags(semanticRole);
        setScTags(semanticCategory);
        setErrorTags(errors);
      }

      setIsLoading(false);
    };

    fetchTriples();
  }, [project]);

  const addTripleToUpdate = (updatedTriple: ITriple) => {
    if (updatedTriple.problem === undefined) {
      updatedTriple.problem = null;
    }
    // Update triples in table data
    const newTriples = triples.map((triple) => {
      if (triple.id === updatedTriple.id) {
        return updatedTriple;
      } else {
        return triple;
      }
    });

    // Copy state data as it should be immutable (mutated only through setter function)
    const newUpdatedTriples = [...updatedTriples];

    const updatedTripleIndex = newUpdatedTriples.findIndex(
      (triple) => triple.id === updatedTriple.id
    );

    if (updatedTripleIndex >= 0) {
      newUpdatedTriples[updatedTripleIndex] = updatedTriple;
    } else {
      newUpdatedTriples.push(updatedTriple);
    }

    setTriples(newTriples);
    setUpdatedTriples(newUpdatedTriples);
  };

  const handleFinishAlertVisibleChange = async (newVisibility: boolean) => {
    if (!newVisibility) {
      setIsFinishAlertVisible(false);
      return;
    }

    if (triples.some((triple) => isTripleMissingTag(triple))) {
      setIsFinishAlertVisible(true);
    } else {
      await handleFinish();
    }
  };

  const handleFinish = async () => {
    // Check if there are pending updates and, if so, run them
    if (updatedTriples.length > 0) {
      const error = await onSave();

      // If updates fail, abort finishing the phase
      if (error) {
        return;
      }
    }

    const apiResponse = await API.project.finishTagging(project.id);

    if (apiResponse.isSuccess()) {
      dispatch(setProject(apiResponse.value));
    } else {
      message.error(
        "An error occurred while updating the project. Please, refresh the page and try again"
      );
    }
  };

  const onSave = async (): Promise<boolean> => {
    setIsLoadingTagsUpdate(true);

    const updatePromises = updatedTriples.map((updateTriple) =>
      API.triple.update(
        _.pick(updateTriple, [
          "id",
          "project",
          "noun1",
          "verb",
          "noun2",
          "problem",
        ])
      )
    );

    const updateResponses = await Promise.all(updatePromises);

    const successfulResponses = updateResponses.filter((response) =>
      response.isSuccess()
    );

    let error: boolean = false;

    if (successfulResponses.length === updateResponses.length) {
      // All triples updated successfully
      setUpdatedTriples([]);
      message.success("Changes saved successfully");
    } else if (successfulResponses.length === 0) {
      // All updates failed
      message.error(
        "Couldn't save you work right now. Please try again later or, if the problem persists, contact support"
      );
      error = true;
    } else {
      /* Partial Success. Some updates failed. In this case, we leave the failed triples in the updated array in order to not lose the information
      and allow future retry of the update
    */
      const successfulUpdateIds = successfulResponses.map(
        (response) => response.value.id
      );

      const failedTriples = updatedTriples.filter((triple) =>
        successfulUpdateIds.find((successId) => successId === triple.id)
      );

      setUpdatedTriples(failedTriples);

      message.warning(
        "Some triples could not be saved. If you leave the page now some work may be lost. Please, try again later. If the problem persists, contact support"
      );
      error = true;
    }

    setIsLoadingTagsUpdate(false);

    return error;
  };

  return (
    <>
      <Helmet>
        <title>
          {MarcoTAO} - {project.domainName}
        </title>
      </Helmet>

      <Row style={styles.titleRow}>
        <Col span={24}>
          <Title>Search Results</Title>
        </Col>
        <Col span={24}>
          <Text>
            These are the results found in the searches previously configured
          </Text>
        </Col>
        <Col span={24}>
          <Text>
            Tag each element with one of the tags from the selection, or mark
            them as errors if they are incorrect
          </Text>
        </Col>
        <Col span={24}>
          <Text>
            You may also edit the search results if you deem it appropiate
          </Text>
        </Col>
      </Row>

      <Divider />

      {isLoading ? (
        <FullScreenLoader
          wrapperWidth="100vw"
          wrapperHeight="40vh"
          type="Hash"
        />
      ) : (
        <>
          <TaggingTable
            data={triples}
            updateTriple={addTripleToUpdate}
            trTags={trTags}
            domTags={domainTags}
            scTags={scTags}
            errorTags={errorTags}
          />
          <Row justify="center">
            <Popconfirm
              title="Some triples have not been fully tagged. Are you sure you want to finish this phase?"
              visible={isFinishAlertVisible}
              onVisibleChange={handleFinishAlertVisibleChange}
              onConfirm={handleFinish}
            >
              <Button type="primary" style={styles.finishButton}>
                Finish Tagging
              </Button>
            </Popconfirm>
          </Row>
          <Affix offsetBottom={40} style={styles.affix}>
            <Row justify="space-between" align="middle">
              <Col span={1}>
                <Tooltip
                  overlay="Download Triples"
                  placement="right"
                  mouseEnterDelay={0.5}
                >
                  <Button
                    type="primary"
                    shape="round"
                    size="large"
                    style={styles.downloadButton}
                    block
                    icon={<CloudDownloadOutlined />}
                    onClick={showDownloadModal}
                  />
                </Tooltip>
              </Col>
              {updatedTriples.length > 0 ? (
                <Button
                  type="primary"
                  shape="round"
                  size="large"
                  style={styles.saveButton}
                  block
                  loading={isLoadingTagsUpdate}
                  onClick={onSave}
                >
                  {isLoadingTagsUpdate ? "Saving" : "Save"}
                </Button>
              ) : null}
            </Row>
          </Affix>

          <Modal
            visible={isDownloadModalVisible}
            width="1000px"
            centered
            cancelButtonProps={{ style: { display: "none" } }}
            onOk={hideDownloadModal}
            onCancel={hideDownloadModal}
          >
            <DownloadFiles modalView />
          </Modal>
        </>
      )}
    </>
  );
};

const styles = {
  titleRow: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  } as CSSProperties,

  saveButton: {
    padding: "20px",
    height: "80px",
    width: "200px",
    fontSize: "24px",
    pointerEvents: "all",
  } as CSSProperties,

  downloadButton: {
    pointerEvents: "all",
    marginLeft: "20px",
  } as CSSProperties,

  affix: {
    marginRight: "40px",
    pointerEvents: "none",
  } as CSSProperties,

  finishButton: {
    marginBottom: "20px",
  } as CSSProperties,
};
