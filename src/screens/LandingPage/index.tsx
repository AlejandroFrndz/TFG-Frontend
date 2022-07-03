import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { Row, Col, Layout, message, Card, Divider } from "antd";
import { LogInForm } from "src/screens/LandingPage/components/LogInForm";
import API from "src/utils/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAuthError } from "src/redux/auth/actions";
import { SingUp } from "src/screens/LandingPage/components/SingUp";
import { Helmet } from "react-helmet";
import { MarcoTAO } from "src/utils/constants";
import { ReactComponent as MarcoTAOSvg } from "src/assets/SVG/MarcoTAO.svg";

const { Content } = Layout;

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [blur, setBlur] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token !== null) {
      API.setToken(token);
      dispatch(clearAuthError());
      navigate("/home");
    }
  }, [navigate, dispatch]);

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
    <>
      <Helmet>
        <title>{MarcoTAO}</title>
      </Helmet>
      <Layout style={styles.layout(blur)}>
        <Content style={styles.content}>
          <Row align="middle" style={styles.mainRow}>
            <Col span={12}>
              <Row>
                <Col span={24} style={{ textAlign: "center" }}>
                  <MarcoTAOSvg width={600} />
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Card style={styles.card} bordered={false}>
                <LogInForm onFinish={handleLogin} />
                <Divider />
                <SingUp onFinish={handleSingUp} blurBackground={setBlur} />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

const styles = {
  errorMessage: {
    marginTop: "90vh",
    fontSize: "20px",
  } as CSSProperties,

  card: {
    borderRadius: "20px",
    width: "600px",
    height: "400px",
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
