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
import React, { useEffect, useState } from "react";
import { ParameterInput } from "./components/ParameterInput";
import {
  CreateSearchRequest,
  ISearch,
  SearchParameterType,
} from "src/utils/api/resources/search";
import API from "src/utils/api";
import { SavedSearch } from "./components/SavedSearch";
import { FullScreenLoader } from "src/shared/FullScreenLoader";

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

  const [isLoadingSavedSearches, setIsLoadingSavedSearches] = useState(false);
  const [savedSearches, setSavedSearches] = useState<ISearch[]>([]);

  useEffect(() => {
    const fetchSearches = async () => {
      setIsLoadingSavedSearches(true);
      const response = await API.search.getAllForProject(project.id);

      if (response.isSuccess()) {
        setSavedSearches((savedSearches) => [
          ...savedSearches,
          ...response.value,
        ]);
      }

      setIsLoadingSavedSearches(false);
    };

    fetchSearches();
  }, [project]);

  const resetSearchState = () => {
    setNoun1State(initialParameterState);
    setVerbState(initialParameterState);
    setNoun2State(initialParameterState);
    setIsUsingSynt(false);
  };

  const handleDeleteSearch = async (searchId: string) => {
    const deleteResponse = await API.search.delete(searchId);

    if (deleteResponse.isSuccess()) {
      setSavedSearches(
        savedSearches.filter((search) => search.id !== searchId)
      );
    }
  };

  const handleSaveSearch = async () => {
    const createSearchRequest: CreateSearchRequest = {
      noun1: {
        type: noun1State.type as SearchParameterType,
        value: noun1State.type === "file" ? null : noun1State.value,
      },
      verb: {
        type: verbState.type as SearchParameterType,
        value: verbState.type === "file" ? null : verbState.value,
      },
      noun2: {
        type: noun2State.type as SearchParameterType,
        value: noun2State.type === "file" ? null : noun2State.value,
      },
      isUsingSynt,
      project: project.id,
    };

    const data = new FormData();

    data.append("document", JSON.stringify(createSearchRequest));

    if (noun1State.type === "file") {
      data.append("noun1File", noun1State.value as RcFile);
    }

    if (verbState.type === "file") {
      data.append("verbFile", verbState.value as RcFile);
    }

    if (noun2State.type === "file") {
      data.append("noun2File", noun2State.value as RcFile);
    }

    const searchResponse = await API.search.create(data);

    if (searchResponse.isSuccess()) {
      setSavedSearches([...savedSearches, searchResponse.value]);
    }

    resetSearchState();
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
        {isLoadingSavedSearches ? (
          <FullScreenLoader type="Bar" />
        ) : (
          <Row>
            {savedSearches.map((search) => (
              <SavedSearch
                search={search}
                key={search.id}
                deleteSearch={handleDeleteSearch}
              />
            ))}
          </Row>
        )}
      </>
    </>
  );
};
