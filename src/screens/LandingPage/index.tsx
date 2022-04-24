import React, { CSSProperties, useState } from "react";
import { Row, Col, Typography, Layout, message, Card, Divider } from "antd";
import { Center } from "src/shared/Center/Center";
import { LogInForm } from "src/screens/LandingPage/components/LogInForm";
import API from "src/utils/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAuthError } from "src/redux/auth/actions";
import { SingUp } from "src/screens/LandingPage/components/SingUp";

const { Content } = Layout;
const { Title, Text } = Typography;

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [blur, setBlur] = useState(false);

  const handleLogin = async (values: { email: string; password: string }) => {
    const response = await API.auth.login(values);

    if (response.isSuccess()) {
      window.localStorage.setItem("token", response.value.token);
      API.setToken(response.value.token);
      dispatch(clearAuthError()); // Clear auth error in case there was one so we don't push people back from home screen
      navigate("/home");
      return false;
    } else {
      message.error({
        content: response.error.message,
        style: styles.errorMessage,
      });
      console.log(response.error);
      return true;
    }
  };

  const handleSingUp = async (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    const response = await API.auth.singup(values);

    if (response.isSuccess()) {
      window.localStorage.setItem("token", response.value.token);
      API.setToken(response.value.token);
      dispatch(clearAuthError());
      navigate("/home");
      return null;
    } else {
      console.log(response.error);
      return response.error.message;
    }
  };

  return (
    <Layout style={styles.layout(blur)}>
      <Content style={styles.content}>
        <Row align="middle" style={styles.mainRow}>
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
              <Card style={styles.card} bordered={false}>
                <LogInForm onFinish={handleLogin} />
                <Divider />
                <SingUp onFinish={handleSingUp} blurBackground={setBlur} />
              </Card>
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

  card: {
    borderRadius: "20px",
    width: "400px",
    transform: "scale(1.5,1.5)",
  } as CSSProperties,

  layout: (blur: boolean) => {
    return {
      minHeight: "100vh",
      filter: blur ? "blur(1px)" : undefined,
    } as CSSProperties;
  },

  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as CSSProperties,

  mainRow: {
    minWidth: "100vw",
  } as CSSProperties,
};
