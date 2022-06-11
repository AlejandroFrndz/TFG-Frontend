import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { selectProject } from "src/redux/projects/selectors";
import { IProject } from "src/utils/api/resources/project";
import { MarcoTAO } from "src/utils/constants";
import { Affix, Button, Col, Divider, message, Row, Typography } from "antd";
import { CSSProperties, useEffect, useState } from "react";
import { ITriple } from "src/utils/api/resources/triple";
import API from "src/utils/api";
import { FullScreenLoader } from "src/shared/FullScreenLoader";
import { TaggingTable } from "./components/TaggingTable";
import _ from "lodash";
import { ISemanticRoleTag } from "src/utils/api/resources/tags/semanticRole";
import { ILexicalDomainTag } from "src/utils/api/resources/tags/lexicalDomain";
import { ISemanticCategoryTag } from "src/utils/api/resources/tags/semanticCategory";

const { Title, Text } = Typography;

export const TaggingStep: React.FC = () => {
  const project = useSelector(selectProject()) as IProject;

  const [triples, setTriples] = useState<ITriple[]>([]);
  const [trTags, setTrTags] = useState<ISemanticRoleTag[]>([]);
  const [scTags, setScTags] = useState<ISemanticCategoryTag[]>([]);
  const [domainTags, setDomainTags] = useState<ILexicalDomainTag[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [updatedTriples, setUpdatedTriples] = useState<ITriple[]>([]);
  const [isLoadingTagsUpdate, setIsLoadingTagsUpdate] = useState(false);

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

  const onSave = async () => {
    setIsLoadingTagsUpdate(true);

    const updatePromises = updatedTriples.map((updateTriple) =>
      API.triple.updateTags(
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

    if (successfulResponses.length === updateResponses.length) {
      // All triples updated successfully
      setUpdatedTriples([]);
      message.success("Changes saved successfully");
    } else if (successfulResponses.length === 0) {
      // All updates failed
      message.error(
        "Couldn't save you work right now. Please try again later or, if the problem persists, contact support"
      );
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
    }

    setIsLoadingTagsUpdate(false);
  };

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
        const { lexicalDomain, semanticRole, semanticCategory } =
          tagsResponse.value;

        setDomainTags(lexicalDomain);
        setTrTags(semanticRole);
        setScTags(semanticCategory);
      }

      setIsLoading(false);
    };

    fetchTriples();
  }, [project]);

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
            them as errors if they are incorrect (Incorrect triples are excluded
            from the final script execution)
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
          />
          {updatedTriples.length > 0 ? (
            <Affix offsetBottom={40} style={styles.affix}>
              <Row justify="end">
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
              </Row>
            </Affix>
          ) : null}
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
  } as CSSProperties,

  affix: {
    marginRight: "40px",
  } as CSSProperties,
};