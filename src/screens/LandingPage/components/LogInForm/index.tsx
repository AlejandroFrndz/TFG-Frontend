import React, { CSSProperties, useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { Center } from "../../../../shared/Center/Center";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

type LogInFormProps = {
  onFinish: (values: { email: string; password: string }) => Promise<boolean>;
};

export const LogInForm: React.FC<LogInFormProps> = ({ onFinish }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    const error = await onFinish(values);
    if (error) setLoading(false);
  };

  return (
    <>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="email"
          rules={[
            {
              message: "Please input a valid email",
              type: "email",
            },
            {
              required: true,
              message: "Please input your email",
            },
          ]}
          style={styles.marginBottom20}
        >
          <Input
            prefix={<MailOutlined style={styles.inputIcon} />}
            style={styles.formInput}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password" }]}
          style={styles.marginBottom20}
        >
          <Input.Password
            prefix={<LockOutlined style={styles.inputIcon} />}
            style={styles.formInput}
            placeholder="Password"
          />
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

  inputIcon: {
    color: "#bebebe",
  },
};
