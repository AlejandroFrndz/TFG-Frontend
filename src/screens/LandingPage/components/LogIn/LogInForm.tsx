import React, { CSSProperties } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { Center } from "../../../../shared/Center";

type LogInFormProps = {
  onFinish: (values: any) => void;
  loading: boolean;
};

export const LogInForm: React.FC<LogInFormProps> = ({ onFinish, loading }) => {
  return (
    <>
      <Form onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input a valid email",
              type: "email",
            },
          ]}
          style={styles.marginBottom20}
        >
          <Input style={styles.formInput} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password" }]}
          style={styles.marginBottom20}
        >
          <Input.Password style={styles.formInput} placeholder="Password" />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Center>
            <Button
              type="primary"
              htmlType="submit"
              style={styles.loginButton}
              loading={loading}
            >
              Log in
            </Button>
          </Center>
        </Form.Item>
      </Form>

      <Row>
        <Col span={24}>
          <Center>
            <Link to="/forgot-password" style={styles.forgotPassword}>
              Forgot password?
            </Link>
          </Center>
        </Col>
      </Row>
    </>
  );
};

const styles = {
  marginBottom20: {
    marginBottom: "20px",
  } as CSSProperties,

  loginButton: {
    borderRadius: "5px",
    width: "100%",
  } as CSSProperties,

  formInput: {
    borderRadius: "8px",
    height: "40px",
  } as CSSProperties,

  forgotPassword: {
    fontSize: "12px",
  } as CSSProperties,
};
