import { Card, Col, Row, Typography } from "antd";
import type { CSSProperties } from "react";
import { useSelector } from "react-redux";
import { selectProject } from "src/redux/projects/selectors";
import API from "src/utils/api";
import { GroupedTriplesFileFormat } from "src/utils/api/resources/groupedTriples";
import { IProject } from "src/utils/api/resources/project";

const { Title, Text } = Typography;

export const DownloadFiles: React.FC = () => {
  const project = useSelector(selectProject()) as IProject;

  const handleDownloadFile = async (fileFormat: GroupedTriplesFileFormat) => {
    const response = await API.groupedTriples.getFile(project.id, fileFormat);
  };

  return (
    <>
      <Row justify="center">
        <Title>Download</Title>
      </Row>
      <Row justify="space-evenly" align="middle">
        <Col span={3}>
          <Card
            hoverable
            style={styles.contentCard}
            onClick={() => handleDownloadFile("tsv")}
          >
            <Text>TSV</Text>
          </Card>
        </Col>
        <Col span={3}>
          <Card
            hoverable
            style={styles.contentCard}
            onClick={() => handleDownloadFile("csv")}
          >
            <Text>CSV</Text>
          </Card>
        </Col>
        <Col span={3}>
          <Card
            hoverable
            style={styles.contentCard}
            onClick={() => handleDownloadFile("txt")}
          >
            <Text>TXT</Text>
          </Card>
        </Col>
      </Row>
    </>
  );
};

const styles = {
  contentCard: {
    height: "100px",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    borderColor: "#b3b3b3",
    borderRadius: "20px",
  } as CSSProperties,
};
