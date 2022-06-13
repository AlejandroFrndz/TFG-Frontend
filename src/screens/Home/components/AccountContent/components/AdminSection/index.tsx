import { useSelector } from "react-redux";
import { selectUserIsAdmin } from "src/redux/auth/selectors";
import { Col, Collapse, Divider, Row, Typography } from "antd";
import type { CSSProperties } from "react";

const { Title, Text } = Typography;
const { Panel } = Collapse;

export const AdminSection: React.FC = () => {
  const isAdmin = useSelector(selectUserIsAdmin);

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
            Here you can add or remove the tags users use during the tagging
            phase
          </Text>
        </Col>
      </Row>

      <Collapse style={styles.collapse} expandIconPosition="right">
        <Panel key="tr" header="Semantic Roles">
          Semantic Roles
        </Panel>
        <Panel key="sc" header="Semantic Categories">
          Semantic Categories
        </Panel>
        <Panel key="dom" header="Lexical Domain">
          Lexical Domain
        </Panel>
        <Panel key="err" header="Errors">
          Errors
        </Panel>
      </Collapse>
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
};
