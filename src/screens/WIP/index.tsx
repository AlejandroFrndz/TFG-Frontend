import { Col, Row } from "antd";
import React, { CSSProperties } from "react";
import { Center } from "src/shared/Center/Center";

export const WIP: React.FC = () => {
  return (
    <Center style={styles.centerInPage}>
      <Row justify="center">
        <Col span={24}>
          <img src={require("../../assets/under-construction.jpg")} alt="WIP" />
        </Col>
        <Col span={24}>
          <h1>We're working on it 🛠</h1>
        </Col>
      </Row>
    </Center>
  );
};

const styles = {
  centerInPage: {
    width: "100vw",
    height: "100vh",
  } as CSSProperties,
};
