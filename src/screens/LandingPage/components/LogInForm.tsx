import React, { CSSProperties } from "react";
import { Form, Input, Button, Card, Divider, Row, Col, Typography } from "antd";
import { Center } from "../../../sharedComponents/Center";

const { Text } = Typography;

export const LogInForm: React.FC = () => {
  return (
    <Card style={styles.card} bordered={false}>
      <Form>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email" }]}
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
            <Button type="primary" htmlType="submit" style={styles.loginButton}>
              Log in
            </Button>
          </Center>
        </Form.Item>
      </Form>

      <Row>
        <Col span={24}>
          <Center>
            <Text>Forgot password?</Text>
          </Center>
        </Col>
      </Row>

      <Divider />

      <Row>
        <Col span={24} style={styles.marginBottom20}>
          <Center>
            <Text>Don't have an account?</Text>
          </Center>
        </Col>
        <Col span={24}>
          <Center>
            <Button type="primary" style={styles.newAccountButton}>
              Create a new one
            </Button>
          </Center>
        </Col>
      </Row>
    </Card>
  );
};

const styles = {
  marginBottom20: {
    marginBottom: "20px",
  } as CSSProperties,

  newAccountButton: {
    borderRadius: "10px",
    width: "80%",
  } as CSSProperties,

  loginButton: {
    borderRadius: "20px",
    width: "100%",
  } as CSSProperties,

  formInput: {
    borderRadius: "20px",
    height: "40px",
  } as CSSProperties,

  card: {
    borderRadius: "20px",
    width: "400px",
    transform: "scale(1.5,1.5)",
  } as CSSProperties,
};
