import { useSelector } from "react-redux";
import { selectUserIsAdmin } from "src/redux/auth/selectors";
import {
  Button,
  Col,
  Collapse,
  Divider,
  message,
  Row,
  Spin,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { ISemanticRoleTag } from "src/utils/api/resources/tags/semanticRole";
import { ISemanticCategoryTag } from "src/utils/api/resources/tags/semanticCategory";
import { ILexicalDomainTag } from "src/utils/api/resources/tags/lexicalDomain";
import API from "src/utils/api";
import { HashLoader } from "react-spinners";
import { TableTags } from "./components/TableTags";
import { TreeTags } from "./components/TreeTags";
import { IErrorTag } from "src/utils/api/resources/tags/error";
import { ErrorTagsAdminTable } from "./components/ErrorTagsAdminTable";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const _deleteTreeTag = (allTags: ISemanticCategoryTag[], tagName: string) => {
  const newTags = allTags.filter((tag) => tag.tag !== tagName);

  if (newTags.length < allTags.length) {
    return newTags;
  }

  return allTags.map((tag) => {
    tag.subTags = _deleteTreeTag(tag.subTags, tagName);
    return tag;
  });
};

export const AdminSection: React.FC = () => {
  const isAdmin = useSelector(selectUserIsAdmin);

  const [trTags, setTrTags] = useState<ISemanticRoleTag[]>([]);
  const [deletedTrTags, setDeletedTrTags] = useState<string[]>([]);
  const [newTrTags, setNewTrTags] = useState<ISemanticRoleTag[]>([]);

  const [scTags, setScTags] = useState<ISemanticCategoryTag[]>([]);
  const [deletedScTags, setDeletedScTags] = useState<string[]>([]);
  const [newScTags, setNewScTags] = useState<ISemanticCategoryTag[]>([]);

  const [domainTags, setDomainTags] = useState<ILexicalDomainTag[]>([]);
  const [deletedDomainTags, setDeletedDomainTags] = useState<string[]>([]);
  const [newDomainTags, setNewDomainTags] = useState<ILexicalDomainTag[]>([]);

  const [errorTags, setErrorTags] = useState<IErrorTag[]>([]);
  const [deletedErrorTags, setDeletedErrorTags] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const handleDeleteTag = (
    tagName: string,
    type: "thematicRoles" | "lexicalDomains" | "semanticCategories" | "errors"
  ) => {
    switch (type) {
      case "thematicRoles":
        setDeletedTrTags([...deletedTrTags, tagName]);
        setTrTags(trTags.filter((tag) => tag.tag !== tagName));
        break;
      case "lexicalDomains":
        setDeletedDomainTags([...deletedDomainTags, tagName]);
        setDomainTags(domainTags.filter((tag) => tag.tag !== tagName));
        break;
      case "semanticCategories":
        setDeletedScTags([...deletedScTags, tagName]);
        setScTags(_deleteTreeTag(scTags, tagName));
        break;
      case "errors":
        setDeletedErrorTags([...deletedErrorTags, tagName]);
        setErrorTags(
          errorTags.filter((tag) => tag.errorCode.toString() !== tagName)
        );
        break;
    }
  };

  const handleSaveTagsUpdate = async () => {
    setIsLoadingUpdate(true);

    const deleteTrPromises = deletedTrTags.map((tagName) =>
      API.tags.semanticRole.delete(tagName)
    );
    const deleteDomPromises = deletedDomainTags.map((tagName) =>
      API.tags.lexicalDomain.delete(tagName)
    );
    const deleteScPromises = deletedScTags.map((tagName) =>
      API.tags.semanticCategory.delete(tagName)
    );
    const deleteErrorPromises = deletedErrorTags.map((code) =>
      API.tags.error.delete(code)
    );

    const deleteResponses = await Promise.all([
      ...deleteTrPromises,
      ...deleteDomPromises,
      ...deleteScPromises,
      ...deleteErrorPromises,
    ]);

    if (deleteResponses.some((response) => response.isFailure())) {
      message.error(
        "Some or all updates failed to process. Please, refresh the page and try again later"
      );
    }

    setDeletedDomainTags([]);
    setDeletedTrTags([]);
    setDeletedScTags([]);
    setDeletedErrorTags([]);

    setIsLoadingUpdate(false);
  };

  useEffect(() => {
    const fetchTags = async () => {
      setIsLoading(true);

      const tagsResponse = await API.tags.getAll();

      if (tagsResponse.isSuccess()) {
        setTrTags(tagsResponse.value.semanticRole);
        setScTags(tagsResponse.value.semanticCategory);
        setDomainTags(tagsResponse.value.lexicalDomain);
        setErrorTags(tagsResponse.value.errors);
      } else {
        setIsError(true);
      }

      setIsLoading(false);
    };

    if (isAdmin) fetchTags();
  }, [isAdmin]);

  const shouldSaveTagsBeDisabled = (): boolean => {
    if (
      deletedDomainTags.length > 0 ||
      deletedTrTags.length > 0 ||
      deletedScTags.length > 0 ||
      deletedErrorTags.length > 0
    ) {
      return false;
    }

    if (
      newTrTags.length > 0 ||
      newDomainTags.length > 0 ||
      newScTags.length > 0
    ) {
      return false;
    }

    return true;
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <Divider />
      <Row justify="center" style={styles.titleRow}>
        <Col span={24}>
          <Title style={styles.titleRow}>Admin Settings</Title>
        </Col>
        <Col span={24}>
          <Text>
            Here you can edit the tags users use during the tagging phase
          </Text>
        </Col>
      </Row>

      {isLoading ? (
        <Row justify="center" style={styles.apiStatusWrapper}>
          <Spin indicator={<HashLoader />} />
        </Row>
      ) : isError ? (
        <Row justify="center" style={styles.apiStatusWrapper}>
          <Text>
            Couldn't get tag information at the moment. Please, refresh the page
            and try again later
          </Text>
        </Row>
      ) : (
        <>
          <Collapse style={styles.collapse} expandIconPosition="right">
            <Panel key="tr" header="Semantic Roles">
              <TableTags
                type="thematicRoles"
                data={trTags}
                handleDeleteTag={handleDeleteTag}
              />
            </Panel>
            <Panel key="sc" header="Semantic Categories">
              <TreeTags data={scTags} handleDeleteTag={handleDeleteTag} />
            </Panel>
            <Panel key="dom" header="Lexical Domain">
              <TableTags
                type="lexicalDomains"
                data={domainTags}
                handleDeleteTag={handleDeleteTag}
              />
            </Panel>
            <Panel key="err" header="Errors">
              <ErrorTagsAdminTable
                data={errorTags}
                handleDeleteTag={handleDeleteTag}
              />
            </Panel>
          </Collapse>
          <Row justify="center">
            <Button
              type="primary"
              style={styles.tagsButton}
              disabled={shouldSaveTagsBeDisabled()}
              onClick={handleSaveTagsUpdate}
              loading={isLoadingUpdate}
            >
              Save Tag Updates
            </Button>
          </Row>
        </>
      )}
    </>
  );
};

const styles = {
  titleRow: {
    textAlign: "center",
  } as CSSProperties,

  title: {
    fontSize: "30px",
  } as CSSProperties,

  collapse: {
    marginTop: "20px",
    width: "90vw",
    marginLeft: "1vw",
  } as CSSProperties,

  apiStatusWrapper: {
    marginTop: "80px",
    marginBottom: "60px",
  } as CSSProperties,

  tagsButton: {
    marginTop: "20px",
  } as CSSProperties,
};
