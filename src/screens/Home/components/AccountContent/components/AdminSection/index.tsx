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
import { AddTableTag } from "./components/AddTableTag";
import { AddErrorTag } from "./components/AddErrorTag";

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
  const [newErrorTags, setNewErrorTags] = useState<IErrorTag[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const handleDeleteTag = (
    tagName: string,
    type: "thematicRoles" | "lexicalDomains" | "semanticCategories" | "errors"
  ) => {
    switch (type) {
      case "thematicRoles":
        const filteredNewTrTags = newTrTags.filter(
          (newTag) => newTag.tag !== tagName
        );

        if (filteredNewTrTags.length !== newTrTags.length) {
          setNewTrTags(filteredNewTrTags);
        } else {
          setDeletedTrTags([...deletedTrTags, tagName]);
        }
        setTrTags(trTags.filter((tag) => tag.tag !== tagName));
        break;
      case "lexicalDomains":
        const filteredNewDomainTags = newDomainTags.filter(
          (newTag) => newTag.tag !== tagName
        );

        if (filteredNewDomainTags.length !== newDomainTags.length) {
          setNewDomainTags(filteredNewDomainTags);
        } else {
          setDeletedDomainTags([...deletedDomainTags, tagName]);
        }
        setDomainTags(domainTags.filter((tag) => tag.tag !== tagName));
        break;
      case "semanticCategories":
        setDeletedScTags([...deletedScTags, tagName]);
        setScTags(_deleteTreeTag(scTags, tagName));
        break;
      case "errors":
        const filteredNewErrorTags = newErrorTags.filter(
          (newTag) => newTag.errorCode.toString() !== tagName
        );

        if (filteredNewErrorTags.length !== newErrorTags.length) {
          setNewErrorTags(filteredNewErrorTags);
        } else {
          setDeletedErrorTags([...deletedErrorTags, tagName]);
        }
        setErrorTags(
          errorTags.filter((tag) => tag.errorCode.toString() !== tagName)
        );
        break;
    }
  };

  const handleAddTag = (
    mainField: string | number,
    secondaryField: string,
    type: "thematicRoles" | "lexicalDomains" | "semanticCategories" | "errors"
  ): boolean => {
    switch (type) {
      case "thematicRoles":
        const foundTrTag = trTags.find((tag) => tag.tag === mainField);

        if (foundTrTag) {
          return true;
        }

        const newTrTag: ISemanticRoleTag = {
          tag: mainField as string,
          definition: secondaryField === "" ? null : secondaryField,
        };

        setNewTrTags([...newTrTags, newTrTag]);
        setTrTags([newTrTag, ...trTags]);
        break;

      case "lexicalDomains":
        const foundDomainTag = domainTags.find((tag) => tag.tag === mainField);

        if (foundDomainTag) {
          return true;
        }

        const newDomainTag: ILexicalDomainTag = {
          tag: mainField as string,
          protoVerbs: secondaryField === "" ? null : secondaryField,
        };

        setNewDomainTags([...newDomainTags, newDomainTag]);
        setDomainTags([newDomainTag, ...domainTags]);
        break;

      case "errors":
        const foundErrorTag = errorTags.find(
          (tag) => tag.errorCode === mainField
        );

        if (foundErrorTag) {
          return true;
        }

        const newErrorTag: IErrorTag = {
          errorCode: mainField as number,
          humanReadable: secondaryField,
        };

        setNewErrorTags([...newErrorTags, newErrorTag]);
        setErrorTags(
          [...errorTags, newErrorTag].sort((a, b) => a.errorCode - b.errorCode)
        );
        break;
    }

    return false;
  };

  const handleSaveTagsUpdate = async () => {
    setIsLoadingUpdate(true);

    /* IMPORTANT
      Delete before creating new tags in case some tag was recreated with new parameters
    */
    const deleteTrPromises = deletedTrTags.map((tagName) =>
      API.tags.semanticRole.delete(tagName)
    );
    const deleteDomPromises = deletedDomainTags.map((tagName) =>
      API.tags.lexicalDomain.delete(tagName)
    );
    // Probably will have to not make this in parallel because of race conditions with cascade deletes of child tags
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
      setIsLoadingUpdate(false);
      return message.error(
        "Some or all updates failed to process. Please, refresh the page and try again later"
      );
    }

    const createTrPromises = newTrTags.map((newTag) =>
      API.tags.semanticRole.create(newTag)
    );
    const createDomPromises = newDomainTags.map((newTag) =>
      API.tags.lexicalDomain.create(newTag)
    );
    const createErrorPromises = newErrorTags.map((newTag) =>
      API.tags.error.create(newTag)
    );

    setDeletedDomainTags([]);
    setDeletedTrTags([]);
    setDeletedScTags([]);
    setDeletedErrorTags([]);

    const createResponses = await Promise.all([
      ...createTrPromises,
      ...createDomPromises,
      ...createErrorPromises,
    ]);

    if (createResponses.some((response) => response.isFailure())) {
      setIsLoadingUpdate(false);
      return message.error(
        "Some or all updates failed to process. Please, refresh the page and try again later"
      );
    }

    setNewTrTags([]);
    setNewDomainTags([]);
    setNewErrorTags([]);

    message.success("Updates saved successfully");

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
      newScTags.length > 0 ||
      newErrorTags.length > 0
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
              <AddTableTag type="thematicRoles" handleAddTag={handleAddTag} />
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
              <AddTableTag type="lexicalDomains" handleAddTag={handleAddTag} />
              <TableTags
                type="lexicalDomains"
                data={domainTags}
                handleDeleteTag={handleDeleteTag}
              />
            </Panel>
            <Panel key="err" header="Errors">
              <AddErrorTag handleAddTag={handleAddTag} />
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
