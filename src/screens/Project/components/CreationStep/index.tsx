import React, { CSSProperties, useState } from "react";
import { FileTextOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Input,
  Row,
  Segmented,
  Switch,
  Tooltip,
  Typography,
  Upload,
} from "antd";
import ReactCountryFlag from "react-country-flag";
import { ProjectLanguage } from "src/utils/api/resources/project";
import { RcFile } from "antd/lib/upload";

const { Title, Text } = Typography;
const { Dragger } = Upload;

const languageOptions = [
  {
    label: (
      <div>
        <ReactCountryFlag
          countryCode="GB"
          svg
          style={{ width: "20vw", height: "20vh", paddingTop: "10px" }}
        />
        <Text style={{ display: "block" }}>{ProjectLanguage.English}</Text>
      </div>
    ),
    value: ProjectLanguage.English,
  },
  {
    label: (
      <div>
        <ReactCountryFlag
          countryCode="ES"
          svg
          style={{ width: "20vw", height: "20vh", paddingTop: "10px" }}
        />
        <Text style={{ display: "block" }}>{ProjectLanguage.Spanish}</Text>
      </div>
    ),
    value: ProjectLanguage.Spanish,
  },
  {
    label: (
      <div>
        <ReactCountryFlag
          countryCode="FR"
          svg
          style={{ width: "20vw", height: "20vh", paddingTop: "10px" }}
        />
        <Text style={{ display: "block" }}>{ProjectLanguage.French}</Text>
      </div>
    ),
    value: ProjectLanguage.French,
  },
];

type CreateProjectState = {
  name: string;
  isUsingSubdomains: boolean;
  language: ProjectLanguage;
  corpusFile: RcFile | null;
};

const INITIAL_STATE: CreateProjectState = {
  name: "",
  isUsingSubdomains: false,
  language: ProjectLanguage.English,
  corpusFile: null,
};

export const CreationStep: React.FC = () => {
  const [projectState, setProjectState] =
    useState<CreateProjectState>(INITIAL_STATE);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectState({ ...projectState, name: e.target.value });
  };

  const handleSubdomainsChange = (value: boolean) => {
    setProjectState({ ...projectState, isUsingSubdomains: value });
  };

  const handleLanguageChange = (value: string | number) => {
    setProjectState({ ...projectState, language: value as ProjectLanguage });
  };

  const handleDisableSubmit = (): boolean => {
    return projectState.name === "" || projectState.corpusFile === null;
  };

  console.log(projectState);

  return (
    <>
      <Row align="middle" justify="center" style={{ marginBottom: "5vh" }}>
        <Col span={24} style={styles.sectionTitle}>
          <Title>Domain Settings</Title>
        </Col>
        <Col span={6} style={styles.domainInputCol}>
          <Input
            placeholder="Name"
            style={styles.domainInput}
            onChange={handleNameChange}
            value={projectState.name}
          />
        </Col>
        <Col span={5}>
          <Text style={styles.subdomainText}>Use Subdomains</Text>
          <Tooltip title="Use fine grain subdomain tags for the lexical domains of verbs">
            <QuestionCircleOutlined style={styles.subdomainIcon} />
          </Tooltip>
          <Switch
            onChange={handleSubdomainsChange}
            checked={projectState.isUsingSubdomains}
          />
        </Col>
      </Row>

      <Row align="middle" justify="center">
        <Col span={24} style={styles.sectionTitle}>
          <Title>Language</Title>
        </Col>
        <Col span={24} style={styles.sectionTitle}>
          <Segmented
            options={languageOptions}
            size="large"
            onChange={handleLanguageChange}
            value={projectState.language}
          />
        </Col>
      </Row>

      <Row align="middle" justify="center">
        <Col span={24} style={styles.sectionTitle}>
          <Title>Corpus</Title>
        </Col>
        <Col span={6} style={{ marginBottom: "3vh" }}>
          <Dragger
            name="corpus"
            maxCount={1}
            accept=".txt,text/plain"
            beforeUpload={(file) => {
              setProjectState({ ...projectState, corpusFile: file });
              return false;
            }}
          >
            <Text style={{ display: "block" }}>
              Upload the corpus file you're going to be working with
            </Text>
            <FileTextOutlined
              style={{
                fontSize: "40px",
                color: "#2d76d6",
                paddingTop: "3vh",
                paddingBottom: "3vh",
              }}
            />
            <Text style={{ display: "block" }}>
              Drag the file here o click to open the file explorer
            </Text>
            <Text>Currenlty, only plain text files (.txt) are supported</Text>
          </Dragger>
        </Col>
      </Row>

      <Row align="middle" justify="center">
        <Col span={6} style={styles.sectionTitle}>
          <Button
            type="primary"
            size="large"
            shape="round"
            style={{ width: "200px", height: "50px" }}
            disabled={handleDisableSubmit()}
          >
            Confirm
          </Button>
        </Col>
      </Row>
    </>
  );
};

const styles = {
  sectionTitle: {
    textAlign: "center",
    paddingBottom: "2vh",
  } as CSSProperties,

  domainInputCol: {
    marginRight: "20px",
  } as CSSProperties,

  domainInput: {
    borderRadius: "10px",
    height: "40px",
  } as CSSProperties,

  subdomainText: {
    marginRight: "5px",
  } as CSSProperties,

  subdomainIcon: {
    marginRight: "10px",
    color: "#c0bdbd",
  } as CSSProperties,
};
