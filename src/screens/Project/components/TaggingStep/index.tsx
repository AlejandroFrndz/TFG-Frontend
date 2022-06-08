import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { selectProject } from "src/redux/projects/selectors";
import { IProject } from "src/utils/api/resources/project";
import { MarcoTAO } from "src/utils/constants";
import { Col, Divider, Row, Typography } from "antd";
import { CSSProperties, useEffect, useState } from "react";
import { ITriple } from "src/utils/api/resources/triple";
import API from "src/utils/api";
import { FullScreenLoader } from "src/shared/FullScreenLoader";
import { TaggingTable } from "./components/TaggingTable";

const { Title, Text } = Typography;

export const TaggingStep: React.FC = () => {
  const project = useSelector(selectProject()) as IProject;

  const [triples, setTriples] = useState<ITriple[]>([]);
  const [isFetchingTriples, setIsFetchingTriples] = useState(false);

  const [updatedTriples, setUpdatedTriples] = useState<ITriple[]>([]);

  const addTriple = (updatedTriple: ITriple) => {
    // Update triples in table data
    const newTriples = triples.map((triple) => {
      if (triple.id === updatedTriple.id) {
        return updatedTriple;
      } else {
        return triple;
      }
    });

    // Copy state data as it should be immutable (mutated only through setter function)
    const newUpdatedTriples = [...updatedTriples];

    const updatedTripleIndex = newUpdatedTriples.findIndex(
      (triple) => triple.id === updatedTriple.id
    );

    if (updatedTripleIndex >= 0) {
      newUpdatedTriples[updatedTripleIndex] = updatedTriple;
    } else {
      newUpdatedTriples.push(updatedTriple);
    }

    setTriples(newTriples);
    setUpdatedTriples(newUpdatedTriples);
  };

  useEffect(() => {
    const fetchTriples = async () => {
      setIsFetchingTriples(true);

      const triplesResponse = await API.triple.getAllForProject(project.id);

      if (triplesResponse.isSuccess()) {
        setTriples(triplesResponse.value);
      }
      setIsFetchingTriples(false);
    };

    fetchTriples();
  }, [project]);

  return (
    <>
      <Helmet>
        <title>
          {MarcoTAO} - {project.domainName}
        </title>
      </Helmet>

      <Row style={styles.titleRow}>
        <Col span={24}>
          <Title>Search Results</Title>
        </Col>
        <Col span={24}>
          <Text>
            These are the results found in the searches previously configured
          </Text>
        </Col>
        <Col span={24}>
          <Text>
            Tag each element with one of the tags from the selection, or mark
            them as errors if they are incorrect (Incorrect triples are excluded
            from the final script execution)
          </Text>
        </Col>
        <Col span={24}>
          <Text>
            When you're done, click the button at the bottom of the page to
            conclude your analisys and get the results
          </Text>
        </Col>
      </Row>

      <Divider />

      {isFetchingTriples ? (
        <FullScreenLoader
          wrapperWidth="100vw"
          wrapperHeight="40vh"
          type="Hash"
        />
      ) : (
        <TaggingTable data={triples} updateTriple={addTriple} />
      )}
    </>
  );
};

const styles = {
  titleRow: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  } as CSSProperties,
};
