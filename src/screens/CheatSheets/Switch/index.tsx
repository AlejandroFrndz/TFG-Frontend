import { Button, Col, Row, Spin, Tooltip } from "antd";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { Helmet } from "react-helmet";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { MarcoTAO } from "src/utils/constants";
import { SingleTableCheatSheet } from "./components/SingleTable";
import { TreeCheatSheet } from "./components/Tree";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import {
  ISemanticRoleTag,
  SemanticRoleTagsResponse,
} from "src/utils/api/resources/tags/semanticRole";
import {
  ILexicalDomainTag,
  LexicalDomainTagsResponse,
} from "src/utils/api/resources/tags/lexicalDomain";
import API from "src/utils/api";
import {
  ISemanticCategoryTag,
  SemanticCategoryTagsResponse,
} from "src/utils/api/resources/tags/semanticCategory";
import { Center } from "src/shared/components/Center/Center";

type CheetSheetType =
  | "thematicRoles"
  | "semanticCategories"
  | "lexicalDomains"
  | "errors";

const typeToTilteMap = (type?: CheetSheetType) => {
  let prefix = "";

  switch (type) {
    case "thematicRoles":
      prefix = "Thematic Roles";
      break;
    case "semanticCategories":
      prefix = "Semantic Categories";
      break;
    case "lexicalDomains":
      prefix = "Lexical Domains";
      break;
    case "errors":
      prefix = "Errors";
      break;
    default:
      prefix = "";
      break;
  }

  return prefix !== "" ? `${prefix} Cheat Sheet` : "";
};

export const CheatSheetsSwitch: React.FC = () => {
  const { type } = useParams<{
    type: CheetSheetType;
  }>();

  const [data, setData] = useState<
    ILexicalDomainTag[] | ISemanticRoleTag[] | ISemanticCategoryTag[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      let dataResponse:
        | SemanticRoleTagsResponse
        | LexicalDomainTagsResponse
        | SemanticCategoryTagsResponse
        | null = null;

      switch (type) {
        case "thematicRoles":
          dataResponse = await API.tags.semanticRole.getAll();
          break;

        case "lexicalDomains":
          dataResponse = await API.tags.lexicalDomain.getAll();
          break;

        case "semanticCategories":
          dataResponse = await API.tags.semanticCategory.getAll();
          break;
      }

      if (!dataResponse || dataResponse.isFailure()) {
        setIsError(true);
      } else {
        setData(dataResponse.value);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [type]);

  const renderContent = () => {
    switch (type) {
      case "thematicRoles":
        return (
          <SingleTableCheatSheet
            type={type}
            data={data as ISemanticRoleTag[]}
          />
        );
      case "semanticCategories":
        return <TreeCheatSheet data={data as ISemanticCategoryTag[]} />;
      case "lexicalDomains":
        return (
          <SingleTableCheatSheet
            type={type}
            data={data as ILexicalDomainTag[]}
          />
        );
      case "errors":
        return <>Errors</>;
      default:
        return <Navigate to={"/tags"} />;
    }
  };

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>
            {MarcoTAO} - {typeToTilteMap(type)}
          </title>
        </Helmet>
        <div style={styles.loader}>
          <Spin indicator={<PropagateLoader />} />
        </div>
      </>
    );
  }

  return (
    <>
      <Row justify="center" align="middle" style={styles.titleRow}>
        <Col span={1}>
          <Tooltip
            overlay="See all cheat sheets"
            arrowPointAtCenter
            placement="right"
            mouseEnterDelay={0.8}
          >
            <Button style={styles.button} onClick={() => navigate("/tags")}>
              <ArrowLeftOutlined />
            </Button>
          </Tooltip>
        </Col>
        <Col span={23}>
          <Title>{typeToTilteMap(type)}</Title>
        </Col>
      </Row>

      {isError ? (
        <Center style={styles.errorMessage}>
          Something went wrong while retreiving tag information. Please refresh
          the page and try again later
        </Center>
      ) : (
        renderContent()
      )}
    </>
  );
};

const styles = {
  loader: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as CSSProperties,

  titleRow: {
    textAlign: "center",
    paddingTop: "30px",
  } as CSSProperties,

  button: {
    display: "flex",
    justifySelf: "flex-start",
    alignSelf: "center",
    marginBottom: "12px",
    marginLeft: "20px",
    alignItems: "center",
    borderWidth: 0,
    boxShadow: "0px 0px 15px 1px rgb(0 0 0 / 20%)",
  } as CSSProperties,

  errorMessage: {
    height: "90vh",
  } as CSSProperties,
};
