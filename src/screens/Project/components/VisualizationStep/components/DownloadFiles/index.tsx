import { Card, Col, message, Row, Typography } from "antd";
import type { CSSProperties } from "react";
import { useSelector } from "react-redux";
import { selectProject } from "src/redux/projects/selectors";
import API from "src/utils/api";
import { GroupedTriplesFileFormat } from "src/utils/api/resources/groupedTriples";
import { IProject } from "src/utils/api/resources/project";
import { TriplesFileFormat } from "src/utils/api/resources/triple";
import { ReactComponent as TSVIcon } from "src/assets/SVG/TSV.svg";
import { ReactComponent as CSVIcon } from "src/assets/SVG/CSV.svg";
import { ReactComponent as TXTIcon } from "src/assets/SVG/TXT.svg";

import "./styles.css";

const { Title } = Typography;

interface DownloadFilesProps {
  modalView?: boolean;
}

export const DownloadFiles: React.FC<DownloadFilesProps> = ({ modalView }) => {
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
      {!modalView ? (
        <>
          <Row justify="center">
            <Title>Download Grouped Triples</Title>
          </Row>
          <Row
            justify="space-evenly"
            align="middle"
            style={styles.cardRowMargin}
          >
            <Col span={3}>
              <Card
                hoverable
                style={styles.contentCard}
                onClick={() => handleDownloadGroupedFile("tsv")}
                className="colorOnHover"
              >
                <TSVIcon width={"50px"} height={"50px"} />
              </Card>
            </Col>
            <Col span={3}>
              <Card
                hoverable
                style={styles.contentCard}
                onClick={() => handleDownloadGroupedFile("csv")}
                className="colorOnHover"
              >
                <CSVIcon width={"50px"} height={"50px"} />
              </Card>
            </Col>
            <Col span={3}>
              <Card
                hoverable
                style={styles.contentCard}
                onClick={() => handleDownloadGroupedFile("txt")}
                className="colorOnHoverBlue"
              >
                <TXTIcon width={"50px"} height={"50px"} />
              </Card>
            </Col>
          </Row>
        </>
      ) : null}

      <Row justify="center">
        <Title>{`Download ${!modalView ? "Ungrouped" : ""} Triples`}</Title>
      </Row>
      <Row justify="space-around" align="middle" style={styles.cardRowMargin}>
        <Col span={3} />
        <Col span={3}>
          <Card
            hoverable
            style={styles.contentCard}
            onClick={() => handleDownloadUngroupedFile("tsv")}
            className="colorOnHover"
          >
            <TSVIcon width={"50px"} height={"50px"} />
          </Card>
        </Col>
        <Col span={3}>
          <Card
            hoverable
            style={styles.contentCard}
            onClick={() => handleDownloadUngroupedFile("csv")}
            className="colorOnHover"
          >
            <CSVIcon width={"50px"} height={"50px"} />
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

  cardRowMargin: {
    marginTop: "30px",
    paddingBottom: "60px",
  } as CSSProperties,
};
