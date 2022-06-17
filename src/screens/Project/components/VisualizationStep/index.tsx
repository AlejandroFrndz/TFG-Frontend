import { Col, Divider, Row, Typography } from "antd";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { selectProject } from "src/redux/projects/selectors";
import { IProject } from "src/utils/api/resources/project";
import { MarcoTAO } from "src/utils/constants";
import { DownloadFiles } from "./components/DownloadFiles";

const { Title, Text } = Typography;

export const VisualizationStep: React.FC = () => {
  const project = useSelector(selectProject()) as IProject;

  return (
    <>
      <Helmet>
        <title>
          {MarcoTAO} - {project.domainName}
        </title>
      </Helmet>

      <Row justify="center" align="middle" style={{ textAlign: "center" }}>
        <Col span={24}>
          <Title>Grouped Triples</Title>
        </Col>
        <Col span={24}>
          <Text>
            Here are the results of having grouped the triples extracted based
            on the tags assigned in the previous phase
          </Text>
        </Col>
        <Col span={24}>
          <Text>
            You can see them here online, or download the results file in
            different formats
          </Text>
        </Col>
      </Row>

      <Divider />

      <DownloadFiles />
    </>
  );
};
