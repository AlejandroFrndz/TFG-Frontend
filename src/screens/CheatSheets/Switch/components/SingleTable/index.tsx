import { Button, Col, Row, Table, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { Helmet } from "react-helmet";
import { FullScreenLoader } from "src/shared/components/FullScreenLoader";
import API from "src/utils/api";
import {
  ILexicalDomainTag,
  LexicalDomainTagsResponse,
} from "src/utils/api/resources/tags/lexicalDomain";
import {
  ISemanticRoleTag,
  SemanticRoleTagsResponse,
} from "src/utils/api/resources/tags/semanticRole";
import { MarcoTAO } from "src/utils/constants";
import { useColumns } from "./hooks/useColumns";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Center } from "src/shared/components/Center/Center";

interface Props {
  type: SingleTableCheatSheetType;
  title: string;
}

export type SingleTableCheatSheetType =
  | "thematicRoles"
  | "lexicalDomains"
  | "errors";

const { Title } = Typography;

export const SingleTableCheatSheet: React.FC<Props> = ({ type, title }) => {
  const [data, setData] = useState<ILexicalDomainTag[] | ISemanticRoleTag[]>(
    []
  );
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const columns = useColumns(type);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      let dataResponse:
        | SemanticRoleTagsResponse
        | LexicalDomainTagsResponse
        | null = null;

      switch (type) {
        case "thematicRoles":
          dataResponse = await API.tags.semanticRole.getAll();
          break;

        case "lexicalDomains":
          dataResponse = await API.tags.lexicalDomain.getAll();
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
  }, [setData, type]);

  if (isLoading)
    return (
      <>
        <Helmet>
          <title>
            {MarcoTAO} - {title} CheatSheet
          </title>
        </Helmet>
        <FullScreenLoader type="Propagate" />
      </>
    );

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
          <Title>{title}</Title>
        </Col>
      </Row>

      {isError ? (
        <Center style={styles.errorMessage}>
          Something went wrong while retreiving tag information. Please refresh
          the page and try again later
        </Center>
      ) : (
        <Table
          columns={columns as any}
          dataSource={data as any}
          style={styles.table}
          bordered
          pagination={{
            position: ["bottomCenter"],
            pageSize: 9,
            hideOnSinglePage: true,
          }}
        />
      )}
    </>
  );
};

const styles = {
  titleRow: {
    textAlign: "center",
    paddingTop: "30px",
  } as CSSProperties,

  table: {
    padding: "30px",
    paddingTop: 0,
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
