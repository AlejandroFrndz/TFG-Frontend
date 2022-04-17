import { Col, Row } from "antd";
import React from "react";
import { Folder } from "src/screens/Home/components/ProjectsContent/components/Folder";

export const ProjectsContent: React.FC = () => {
  return (
    <Row
      gutter={[16, 24]}
      style={{ width: "100%", paddingTop: "4vh", paddingLeft: "1vw" }}
    >
      <Col span={6}>
        <Folder name="folder" id="a" />
      </Col>
      <Col span={6}>
        <Folder name="folder" id="b" />
      </Col>
      <Col span={6}>
        <Folder name="folder" id="c" />
      </Col>
      <Col span={6}>
        <Folder name="folder" id="d" />
      </Col>
      <Col span={6}>
        <Folder name="folder" id="e" />
      </Col>
      <Col span={6}>
        <Folder name="folder" id="f" />
      </Col>
      <Col span={6}>
        <Folder name="folder" id="g" />
      </Col>
      <Col span={6}>
        <Folder name="folder" id="h" />
      </Col>
    </Row>
  );
};
