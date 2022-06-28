import React, { CSSProperties, useState } from "react";
import { FileTextOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Segmented, Typography, Upload } from "antd";
import ReactCountryFlag from "react-country-flag";
import { IProject, ProjectLanguage } from "src/utils/api/resources/project";
import type { RcFile } from "antd/lib/upload";
import API from "src/utils/api";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { selectProject } from "src/redux/projects/selectors";
import { isNotEmpty } from "src/utils/helpers";
import { setProject } from "src/redux/projects/actions";
import { UploadFile } from "antd/lib/upload/interface";

const { Title, Text } = Typography;
const { Dragger } = Upload;

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

  draggerIcon: {
    fontSize: "40px",
    color: "#2d76d6",
    paddingTop: "3vh",
    paddingBottom: "3vh",
  } as CSSProperties,

  displayBlock: {
    display: "block",
  } as CSSProperties,

  confirmButton: {
    width: "200px",
    height: "50px",
  } as CSSProperties,

  draggerWrapper: {
    marginBottom: "3vh",
  } as CSSProperties,

  domainSettingsRow: {
    marginBottom: "5vh",
  } as CSSProperties,

  countryFlag: {
    width: "20vw",
    height: "20vh",
    paddingTop: "10px",
  } as CSSProperties,
};

const languageOptions = [
  {
    label: (
      <div>
        <ReactCountryFlag countryCode="GB" svg style={styles.countryFlag} />
        <Text style={styles.displayBlock}>{ProjectLanguage.English}</Text>
      </div>
    ),
    value: ProjectLanguage.English,
  },
  {
    label: (
      <div>
        <ReactCountryFlag countryCode="ES" svg style={styles.countryFlag} />
        <Text style={styles.displayBlock}>{ProjectLanguage.Spanish}</Text>
      </div>
    ),
    value: ProjectLanguage.Spanish,
  },
  {
    label: (
      <div>
        <ReactCountryFlag countryCode="FR" svg style={styles.countryFlag} />
        <Text style={styles.displayBlock}>{ProjectLanguage.French}</Text>
      </div>
    ),
    value: ProjectLanguage.French,
  },
];

type CreateProjectState = {
  domainName: string;
  isUsingSubdomains: boolean;
  language: ProjectLanguage;
  corpusFiles: RcFile[];
};

const INITIAL_STATE: CreateProjectState = {
  domainName: "",
  isUsingSubdomains: false,
  language: ProjectLanguage.English,
  corpusFiles: [],
};

export const CreationStep: React.FC = () => {
  const [projectState, setProjectState] =
    useState<CreateProjectState>(INITIAL_STATE);
  const [isParsingCorpus, setIsParsingCorpus] = useState(false);

  const project = useSelector(selectProject());
  const dispatch = useDispatch();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectState({ ...projectState, domainName: e.target.value });
  };

  const handleLanguageChange = (value: string | number) => {
    setProjectState({ ...projectState, language: value as ProjectLanguage });
  };

  const handleDisableSubmit = (): boolean => {
    return (
      projectState.domainName === "" || projectState.corpusFiles.length === 0
    );
  };

  const beforeUpload = (_file: RcFile, fileList: RcFile[]): boolean => {
    setProjectState({
      ...projectState,
      corpusFiles: fileList,
    });
    return false;
  };

  const handleRemove = (removedFile: UploadFile<any>): boolean => {
    setProjectState({
      ...projectState,
      corpusFiles: projectState.corpusFiles.filter(
        (file) => file.uid !== removedFile.uid
      ),
    });
    return true;
  };

  const handleSubmit = async () => {
    if (isNotEmpty<IProject>(project)) {
      setIsParsingCorpus(true);

      const projectWithDetailsResponse = await API.project.updateDetails(
        project.id,
        _.omit(projectState, "corpusFile")
      );

      if (projectWithDetailsResponse.isSuccess()) {
        if (projectState.corpusFiles) {
          const corpusData = new FormData();

          projectState.corpusFiles.forEach((file) => {
            corpusData.append("corpusFile", file);
          });

          const response = await API.project.uploadCorpus(
            project.id,
            corpusData
          );

          if (response.isSuccess()) {
            dispatch(setProject(response.value));
          }
        }
      }

      setIsParsingCorpus(false);
    }
  };

  return (
    <>
      <Row align="middle" justify="center" style={styles.domainSettingsRow}>
        <Col span={24} style={styles.sectionTitle}>
          <Title>Domain Name</Title>
        </Col>
        <Col span={6} style={styles.domainInputCol}>
          <Input
            placeholder="Name"
            style={styles.domainInput}
            onChange={handleNameChange}
            value={projectState.domainName}
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
        <Col span={6} style={styles.draggerWrapper}>
          <Dragger
            name="corpus"
            multiple
            accept=".txt,text/plain"
            beforeUpload={beforeUpload}
            onRemove={handleRemove}
          >
            <Text style={styles.displayBlock}>
              Upload the corpus file you're going to be working with
            </Text>
            <FileTextOutlined style={styles.draggerIcon} />
            <Text style={styles.displayBlock}>
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
            style={styles.confirmButton}
            disabled={handleDisableSubmit()}
            onClick={handleSubmit}
            loading={isParsingCorpus}
          >
            Confirm
          </Button>
        </Col>
      </Row>
    </>
  );
};
