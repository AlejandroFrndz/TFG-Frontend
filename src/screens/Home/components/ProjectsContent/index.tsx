import { Col, Row } from "antd";
import React from "react";
import { Folder } from "./components/Folder";

export const ProjectsContent: React.FC = () => {
  return (
    <Row
      gutter={[16, 24]}
      style={{ width: "100%", paddingTop: "4vh", paddingLeft: "1vw" }}
    >
      <Col span={6}>
        <Folder name="folder" />
      </Col>
      <Col span={6}>
        <Folder name="folder" />
      </Col>
      <Col span={6}>
        <Folder name="folder" />
      </Col>
      <Col span={6}>
        <Folder name="folder" />
      </Col>
      <Col span={6}>
        <Folder name="folder" />
      </Col>
      <Col span={6}>
        <Folder name="folder" />
      </Col>
      <Col span={6}>
        <Folder name="folder" />
      </Col>
      <Col span={6}>
        <Folder name="folder" />
      </Col>
    </Row>
  );
};
