import { Card, Col, Divider, Row, Typography } from "antd";
import type { CSSProperties } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { MarcoTAO } from "src/utils/constants";

const { Text, Title } = Typography;

export const CheatSheetsHub: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>{MarcoTAO} - Tags</title>
      </Helmet>

      <>
        <Row justify="center" align="middle" style={styles.titleRow}>
          <Col span={24}>
            <Title>Tags Cheat Sheets</Title>
          </Col>
          <Col span={24}>
            <Text>
              Here you can find quick reference tables for you to know what each
              tag available during the tagging phase of a project means
            </Text>
          </Col>
        </Row>

        <Divider />

        <Row justify="space-around" align="middle" style={styles.contentRow}>
          <Col span={5}>
            <Link to="thematicRoles">
              <Card hoverable style={styles.contentCard}>
                <Title>Thematic Roles</Title>
              </Card>
            </Link>
          </Col>
          <Col span={5}>
            <Link to="semanticCategories">
              <Card hoverable style={styles.contentCard}>
                <Title>Semantic Categories</Title>
              </Card>
            </Link>
          </Col>
          <Col span={5}>
            <Link to="lexicalDomains">
              <Card hoverable style={styles.contentCard}>
                <Title>Lexical Domains</Title>
              </Card>
            </Link>
          </Col>
          <Col span={5}>
            <Link to="errors">
              <Card hoverable style={styles.contentCard}>
                <Title>Errors</Title>
              </Card>
            </Link>
          </Col>
        </Row>
      </>
    </>
  );
};

const styles = {
  titleRow: {
    textAlign: "center",
    paddingTop: "30px",
  } as CSSProperties,

  contentRow: {
    height: "55vh",
  } as CSSProperties,

  contentCard: {
    height: "300px",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    borderColor: "#b3b3b3",
    borderRadius: "20px",
  } as CSSProperties,
};
