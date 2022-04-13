import React, { CSSProperties, useState } from "react";
import { Row, Col, Typography, Layout, message } from "antd";
import { Center } from "../../shared/Center";
import { LogInForm } from "./components/LogInForm";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAuthError } from "../../redux/auth/actions";

const { Content } = Layout;
const { Title, Text } = Typography;

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: any) => {
    setLoading(true);
    const response = await API.auth.login(values);

    if (response.isSuccess()) {
      window.localStorage.setItem("token", response.value.token);
      API.setToken(response.value.token);
      dispatch(clearAuthError()); // Clear auth error in case there was one so we don't push people back from home screen
      navigate("/home");
    } else {
      message.error({
        content: response.error.message,
        style: styles.errorMessage,
      });
      console.log(response.error);
    }
    setLoading(false);
  };

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
              <LogInForm onFinish={onSubmit} loading={loading} />
            </Center>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

const styles = {
  errorMessage: {
    marginTop: "90vh",
    fontSize: "20px",
  } as CSSProperties,
};
