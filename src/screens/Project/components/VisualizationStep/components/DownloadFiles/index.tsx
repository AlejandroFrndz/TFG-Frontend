import { Card, Col, message, Row, Typography } from "antd";
import type { CSSProperties } from "react";
import { useSelector } from "react-redux";
import { selectProject } from "src/redux/projects/selectors";
import API from "src/utils/api";
import { GroupedTriplesFileFormat } from "src/utils/api/resources/groupedTriples";
import { IProject } from "src/utils/api/resources/project";
import { TriplesFileFormat } from "src/utils/api/resources/triple";

const { Title, Text } = Typography;

export const DownloadFiles: React.FC = () => {
  const project = useSelector(selectProject()) as IProject;

  const handleDownloadGroupedFile = async (
    fileFormat: GroupedTriplesFileFormat
  ) => {
    const response = await API.groupedTriples.getFile({
      projectId: project.id,
      fileFormat,
      domainName: project.domainName ?? "results",
    });

    if (response.isFailure()) {
      message.error(
        "Something went wrong processing your download. Please refresh the page and try again later"
      );
    }
  };

  const handleDownloadUngroupedFile = async (fileFormat: TriplesFileFormat) => {
    const response = await API.triple.getFile({
      projectId: project.id,
      fileFormat,
      domainName: project.domainName ?? "results",
    });

    if (response.isFailure()) {
      message.error(
        "Something went wrong processing your download. Please refresh the page and try again later"
      );
    }
  };

  return (
    <>
      <Row justify="center">
        <Title>Download Grouped Triples</Title>
      </Row>
      <Row justify="space-evenly" align="middle" style={styles.cardRowMargin}>
        <Col span={3}>
          <Card
            hoverable
            style={styles.contentCard}
            onClick={() => handleDownloadGroupedFile("tsv")}
          >
            <Text>TSV</Text>
          </Card>
        </Col>
        <Col span={3}>
          <Card
            hoverable
            style={styles.contentCard}
            onClick={() => handleDownloadGroupedFile("csv")}
          >
            <Text>CSV</Text>
          </Card>
        </Col>
        <Col span={3}>
          <Card
            hoverable
            style={styles.contentCard}
            onClick={() => handleDownloadGroupedFile("txt")}
          >
            <Text>TXT</Text>
          </Card>
        </Col>
      </Row>
      <Row justify="center" style={styles.titleRowMargin}>
        <Title>Download Ungrouped Triples</Title>
      </Row>
      <Row justify="space-around" align="middle" style={styles.cardRowMargin}>
        <Col span={3} />
        <Col span={3}>
          <Card
            hoverable
            style={styles.contentCard}
            onClick={() => handleDownloadUngroupedFile("tsv")}
          >
            <Text>TSV</Text>
          </Card>
        </Col>
        <Col span={3}>
          <Card
            hoverable
            style={styles.contentCard}
            onClick={() => handleDownloadUngroupedFile("csv")}
          >
            <Text>CSV</Text>
          </Card>
        </Col>
        <Col span={3} />
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

  titleRowMargin: {
    marginTop: "60px",
  } as CSSProperties,

  cardRowMargin: {
    marginTop: "30px",
  } as CSSProperties,
};
