import { Col, Input, Row } from "antd";
import { RcFile } from "antd/lib/upload";
import React, { ChangeEvent } from "react";
import { ParameterState } from "src/screens/Project/components/AnalysisStep/index";
import { ListFileUpload } from "../ListFileUpload";
import { ParameterTypeDropdown } from "../ParameterTypeDropdown";

type ParameterInputProps = {
  dropdownMenu: JSX.Element;
  state: ParameterState;
  setState: React.Dispatch<React.SetStateAction<ParameterState>>;
  isUsingSynt: boolean;
};

export const ParameterInput: React.FC<ParameterInputProps> = ({
  dropdownMenu,
  state,
  setState,
  isUsingSynt,
}) => {
  const usingSyntAndFile = state.type === "file" && isUsingSynt;

  const handleUploadFile = (file: RcFile) => {
    if (state.type === "file") {
      setState({ ...state, value: file });
    }
  };

  const handleRemoveFile = () => {
    if (state.type === "file") {
      setState({ ...state, value: null });
    }
  };

  const handleOnChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (state.type === "string") {
      setState({ ...state, value });
    }
  };

  const renderInput = () => {
    switch (state.type) {
      case "any":
      case "unset":
        return null;
      case "string":
        return <Input onChange={handleOnChangeInput} />;
      case "file":
        return (
          <ListFileUpload
            handleRemoveFile={handleRemoveFile}
            handleUploadFile={handleUploadFile}
            usingSyntAndFile={usingSyntAndFile}
          />
        );
    }
  };

  return (
    <Row style={{ marginTop: "20px" }}>
      <Col span={24} style={{ marginBottom: "20px" }}>
        <ParameterTypeDropdown
          overlay={dropdownMenu}
          selected={state.type}
          usingSyntAndFile={usingSyntAndFile}
        />
      </Col>
      <Col span={24}>{renderInput()}</Col>
    </Row>
  );
};
