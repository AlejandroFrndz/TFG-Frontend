import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row, Spin, Tooltip, Tree } from "antd";
import Title from "antd/lib/typography/Title";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { useTreeDataTags } from "src/shared/hooks/useTreeDataTag";
import API from "src/utils/api";
import { ISemanticCategoryTag } from "src/utils/api/resources/tags/semanticCategory";
import { MarcoTAO } from "src/utils/constants";

export const TreeCheatSheet: React.FC = () => {
  const [rawData, setRawData] = useState<ISemanticCategoryTag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const formattedData = useTreeDataTags(rawData);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await API.tags.semanticCategory.getAll();

      if (response.isFailure()) {
        setIsError(true);
      } else {
        setRawData(response.value);
      }

      setIsLoading(false);
    };

    fetchData();
  });

  if (isLoading)
    return (
      <>
        <Helmet>
          <title>{MarcoTAO} - Semantic Categories CheatSheet</title>
        </Helmet>
        <div style={styles.loader}>
          <Spin indicator={<PropagateLoader />} />
        </div>
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
          <Title>Semantic Categories</Title>
        </Col>
      </Row>

      <Divider />

      <div style={styles.tree}>
        <Tree
          treeData={formattedData}
          showLine={{ showLeafIcon: false }}
          selectedKeys={[]}
        />
      </div>
    </>
  );
};

const styles = {
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

  loader: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as CSSProperties,

  tree: {
    marginLeft: "100px",
    justifyContent: "space-evenly",
  } as CSSProperties,
};
