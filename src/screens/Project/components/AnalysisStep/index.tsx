import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Button, Col, Divider, Menu, Row, Switch, Typography } from "antd";
import { selectProject } from "src/redux/projects/selectors";
import { Center } from "src/shared/Center/Center";
import { IProject } from "src/utils/api/resources/project";
import { MarcoTAO } from "src/utils/constants";
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  FileTextOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import { RcFile } from "antd/lib/upload";
import React, { useState } from "react";
import { ParameterInput } from "./components/ParameterInput";

const { Title, Text } = Typography;

const parameterTypeMenu = (
  setState: React.Dispatch<React.SetStateAction<ParameterState>>
) => (
  <Menu
    items={[
      {
        label: "Manual",
        key: "string",
        icon: <EditOutlined />,
        onClick: () => {
          setState({ type: "string", value: "" });
        },
      },
      {
        label: "File",
        key: "file",
        icon: <FileTextOutlined />,
        onClick: () => {
          setState({ type: "file", value: null });
        },
      },
      {
        label: "Free",
        key: "any",
        icon: <QuestionOutlined />,
        onClick: () => {
          setState({ type: "any", value: "ANY" });
        },
      },
    ]}
  />
);

export type ParameterState =
  | {
      type: "string";
      value: string;
    }
  | {
      type: "file";
      value: RcFile | null;
    }
  | {
      type: "any";
      value: "ANY";
    }
  | {
      type: "unset";
      value: null;
    };

const validateInput = ({ type, value }: ParameterState): boolean => {
  switch (type) {
    case "any":
    case "string":
      if (value === "") {
        return false;
      }
      break;
    case "file":
      if (value === null) {
        return false;
      }
      break;
    case "unset":
      return false;
  }

  return true;
};

const initialParameterState: ParameterState = { type: "unset", value: null };

export const AnalysisStep: React.FC = () => {
  const project = useSelector(selectProject()) as IProject;

  const [noun1State, setNoun1State] = useState<ParameterState>(
    initialParameterState
  );
  const [verbState, setVerbState] = useState<ParameterState>(
    initialParameterState
  );
  const [noun2State, setNoun2State] = useState<ParameterState>(
    initialParameterState
  );
  const [isUsingSynt, setIsUsingSynt] = useState(false);

  const handleSaveSearch = () => {
    console.log({ noun1State, verbState, noun2State, isUsingSynt });
  };

  const canSaveSearch = () => {
    if (
      noun1State.type === "unset" ||
      verbState.type === "unset" ||
      noun2State.type === "unset"
    ) {
      return false;
    }

    if (
      !validateInput(noun1State) ||
      !validateInput(verbState) ||
      !validateInput(noun2State)
    ) {
      return false;
    }

    if (
      (noun1State.type === "file" ||
        verbState.type === "file" ||
        noun2State.type === "file") &&
      isUsingSynt
    ) {
      return false;
    }

    return true;
  };

  return (
    <>
      <Helmet>
        <title>
          {MarcoTAO} - {project.domainName}
        </title>
      </Helmet>

      <>
        <Center style={{ marginBottom: "20px" }}>
          <Title>Configure Search</Title>
        </Center>
        <Row style={{ textAlign: "center" }} justify="center">
          <Col span={5}>
            <Text>First Noun</Text>
          </Col>
          <Divider type="vertical" style={{ visibility: "hidden" }} />
          <Col span={5}>
            <Text>Verb</Text>
          </Col>
          <Divider type="vertical" style={{ visibility: "hidden" }} />
          <Col span={5}>
            <Text>Second Noun</Text>
          </Col>
          <Divider type="vertical" style={{ visibility: "hidden" }} />
          <Col span={4}>
            <Text>Use Syntax</Text>
          </Col>
          <Divider type="vertical" style={{ visibility: "hidden" }} />
          <Col span={3} />
        </Row>
        <Row style={{ textAlign: "center" }} justify="center" align="middle">
          <Col span={5}>
            <ParameterInput
              dropdownMenu={parameterTypeMenu(setNoun1State)}
              state={noun1State}
              setState={setNoun1State}
              isUsingSynt={isUsingSynt}
            />
          </Col>
          <Divider
            type="vertical"
            style={{ height: "180px", marginTop: "-45px" }}
          />
          <Col span={5}>
            <ParameterInput
              dropdownMenu={parameterTypeMenu(setVerbState)}
              state={verbState}
              setState={setVerbState}
              isUsingSynt={isUsingSynt}
            />
          </Col>
          <Divider
            type="vertical"
            style={{ height: "190px", marginTop: "-45px" }}
          />
          <Col span={5}>
            <ParameterInput
              dropdownMenu={parameterTypeMenu(setNoun2State)}
              state={noun2State}
              setState={setNoun2State}
              isUsingSynt={isUsingSynt}
            />
          </Col>
          <Divider
            type="vertical"
            style={{ height: "190px", marginTop: "-45px" }}
          />
          <Col span={4}>
            <Switch
              checked={isUsingSynt}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              onChange={(checked) => setIsUsingSynt(checked)}
            />
          </Col>
          <Divider
            type="vertical"
            style={{ height: "190px", marginTop: "-45px" }}
          />
          <Col span={3}>
            <Button
              type="primary"
              onClick={handleSaveSearch}
              disabled={!canSaveSearch()}
            >
              Save
            </Button>
          </Col>
        </Row>
      </>

      <Divider style={{ marginTop: "18px" }} />

      <>
        <Center>
          <Title>Saved Searches</Title>
        </Center>
      </>
    </>
  );
};
