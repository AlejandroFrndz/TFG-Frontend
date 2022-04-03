import React from "react";
import { Row, Col, Typography, Layout } from "antd";
import { Center } from "../../sharedComponents/Center";
import { LogInForm } from "./components/LogInForm";

const { Content } = Layout;
const { Title, Text } = Typography;

export const LandingPage = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Row align="middle" style={{ minWidth: "100vw" }}>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Center>
                  <Title>Log in to your account</Title>
                </Center>
              </Col>
              <Col span={24}>
                <Center>
                  <Text>To access all your projects and previous work</Text>
                </Center>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Center>
              <LogInForm />
            </Center>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
