import { Col, Divider, Row, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import { selectProject } from "src/redux/projects/selectors";
import API from "src/utils/api";
import { IGroupedTriples } from "src/utils/api/resources/groupedTriples";
import { IProject } from "src/utils/api/resources/project";
import { MarcoTAO } from "src/utils/constants";
import { DownloadFiles } from "./components/DownloadFiles";
import { GroupedTriplesTable } from "./components/GroupedTriplesTable";

const { Title, Text } = Typography;

export const VisualizationStep: React.FC = () => {
  const project = useSelector(selectProject()) as IProject;

  const [groupedTriples, setGroupedTriples] = useState<IGroupedTriples[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const response = await API.groupedTriples.getAllForProject(project.id);

      if (response.isSuccess()) {
        setGroupedTriples(response.value);
      } else {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [project.id, setGroupedTriples, setIsLoading, setIsError]);

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

      {isLoading ? (
        <Spin indicator={<HashLoader />} style={styles.loader} />
      ) : isError ? (
        <Text>Error</Text>
      ) : (
        <GroupedTriplesTable data={groupedTriples} />
      )}

      <Divider />

      <DownloadFiles />
    </>
  );
};

const styles = {
  loader: {
    width: "95vw",
    height: "50vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as CSSProperties,
};
