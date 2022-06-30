import {
  Typography,
  Layout,
  Divider,
  Modal,
  Tooltip,
  Space,
  Row,
  Col,
  Spin,
  Switch,
} from "antd";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { Helmet } from "react-helmet";
import { MarcoTAO } from "src/utils/constants";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { IProject } from "src/utils/api/resources/project";
import API from "src/utils/api";
import { HashLoader } from "react-spinners";
import { ProjectSelector } from "./components/ProjectSelector";
import { ProjectDisplay } from "./components/ProjectDisplay";

const { Header } = Layout;
const { Title, Text } = Typography;

export type Options = {
  showNoun1: boolean;
  showVerb: boolean;
  showNoun2: boolean;
  showTags: boolean;
};

export const ConceptComparisonContent: React.FC = () => {
  const [showHelpModal, setShowHelpModal] = useState(false);

  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [isErrorLoadingProjects, setIsErrorLoadingProjects] = useState(false);
  const [elegibleProjects, setElegibleProjects] = useState<IProject[]>([]);

  const [selectedProjectLeft, setSelectedProjectLeft] =
    useState<IProject | null>(null);
  const [selectedProjectRight, setSelectedProjectRight] =
    useState<IProject | null>(null);

  const [options, setOptions] = useState<Options>({
    showNoun1: true,
    showVerb: true,
    showNoun2: true,
    showTags: true,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoadingProjects(true);
      const response = await API.project.getFinishedForUser();

      if (response.isSuccess()) {
        setElegibleProjects(response.value);
      } else {
        setIsErrorLoadingProjects(true);
      }

      setIsLoadingProjects(false);
    };

    fetchProjects();
  }, []);

  return (
    <>
      <Helmet>
        <title>{MarcoTAO} - Concept Comparison</title>
      </Helmet>

      <Header style={styles.header}>
        <Space size="large">
          <Title>Concept Comparison</Title>
          <Tooltip
            overlay="Click me to get some help!"
            placement="right"
            mouseEnterDelay={0.5}
          >
            <QuestionCircleOutlined
              style={styles.helpIcon}
              onClick={() => setShowHelpModal(true)}
            />
          </Tooltip>
        </Space>
      </Header>

      <Divider style={styles.divider} />

      {isLoadingProjects ? (
        <Row justify="center" style={styles.apiStatusWrapper}>
          <Spin indicator={<HashLoader />} />
        </Row>
      ) : isErrorLoadingProjects ? (
        <Row justify="center" style={styles.apiStatusWrapper}>
          <Text>
            Couldn't get projects information at the moment. Please, refresh the
            page and try again later
          </Text>
        </Row>
      ) : (
        <Row>
          <Col span={24}>
            <Row justify="center" style={{ marginBottom: "50px" }}>
              <Space size="large">
                <Switch
                  checkedChildren="First Argument Visible"
                  unCheckedChildren="First Argument Hidden"
                  style={styles.optionSwitch}
                  checked={options.showNoun1}
                  onChange={(value) =>
                    setOptions({ ...options, showNoun1: value })
                  }
                />
                <Switch
                  checkedChildren="Verb Visible"
                  unCheckedChildren="Verb Hidden"
                  style={styles.optionSwitch}
                  checked={options.showVerb}
                  onChange={(value) =>
                    setOptions({ ...options, showVerb: value })
                  }
                />
                <Switch
                  checkedChildren="Second Argument Visible"
                  unCheckedChildren="Second Argument Hidden"
                  style={styles.optionSwitch}
                  checked={options.showNoun2}
                  onChange={(value) =>
                    setOptions({ ...options, showNoun2: value })
                  }
                />
                <Switch
                  checkedChildren="Tags Visible"
                  unCheckedChildren="Tags Hidden"
                  style={styles.optionSwitch}
                  checked={options.showTags}
                  onChange={(value) =>
                    setOptions({ ...options, showTags: value })
                  }
                />
              </Space>
            </Row>
          </Col>
          <Col span={12}>
            <ProjectSelector
              allProjects={elegibleProjects}
              selectedProject={selectedProjectLeft}
              setSelectedProject={setSelectedProjectLeft}
            />
            <ProjectDisplay
              selectedProject={selectedProjectLeft}
              options={options}
            />
          </Col>
          <Col span={12}>
            <ProjectSelector
              allProjects={elegibleProjects}
              selectedProject={selectedProjectRight}
              setSelectedProject={setSelectedProjectRight}
            />
            <ProjectDisplay
              selectedProject={selectedProjectRight}
              options={options}
            />
          </Col>
        </Row>
      )}

      <Modal
        visible={showHelpModal}
        centered
        title="What is this screen"
        cancelButtonProps={{ style: { display: "none" } }}
        onCancel={() => setShowHelpModal(false)}
        onOk={() => setShowHelpModal(false)}
        bodyStyle={styles.modalBodyStyle}
      >
        <div style={styles.modalContentWrapper}>
          <h3>Purpose</h3>
          <p>
            This screen is designed to let you compare how each of the concepts
            you have studied in one language compare to the same (or others)
            concept in differente languages
          </p>
          <h3>How it Works</h3>
          <p>
            In each side of the screen, you must select one of the projects you
            have created and finished (beware that only projects that have been
            fully analised, that is, that have completed the tagging phase are
            elegible for this screen)
          </p>
          <p>
            Once you have selected a project, a table containing the results of
            each project will appear. You can selected whatever project you
            desire in each half of the screen, so you can make comparisons as
            you see fit
          </p>
          <h3>Toggling Elements</h3>
          <p>
            If you want to compare a specific element (ie. the verbs, first
            arguments or second arguments), you can use the buttons to show/hide
            each column so you can focus on comparing what you're interested in{" "}
          </p>
        </div>
      </Modal>
    </>
  );
};

const styles = {
  header: {
    backgroundColor: "#FFF",
    paddingTop: "20px",
  } as CSSProperties,

  divider: {
    backgroundColor: "lightgrey",
    marginBottom: "20px",
  } as CSSProperties,

  modalBodyStyle: {
    maxHeight: "500px",
    overflowY: "auto",
  } as CSSProperties,

  modalContentWrapper: {
    display: "flex",
    flexDirection: "column",
  } as CSSProperties,

  verticalDivider: {
    height: "100%",
    backgroundColor: "lightgrey",
  } as CSSProperties,

  apiStatusWrapper: {
    margin: "auto",
  } as CSSProperties,

  helpIcon: {
    fontSize: "30px",
    cursor: "pointer",
  } as CSSProperties,

  optionSwitch: {
    paddingLeft: "10px",
    paddingRight: "10px",
  } as CSSProperties,
};
