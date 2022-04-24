import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { CSSProperties, useState } from "react";
import { Center } from "../../../../shared/Center/Center";

const { Text } = Typography;

type SingUpProps = {
  onFinish: (values: {
    username: string;
    email: string;
    password: string;
  }) => Promise<null | string>;

  blurBackground: (value: boolean) => void;
};

export const SingUp: React.FC<SingUpProps> = ({ onFinish, blurBackground }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [form] = useForm();

  const handleShowModal = () => {
    setShowModal(true);
    blurBackground(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
    blurBackground(false);
    form.resetFields();
    setErrorMessage(null);
  };

  const handleSubmit = async (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    const error = await onFinish(values);
    if (error) {
      setLoading(false);
      setErrorMessage(error);
    }
  };

  const handleSingUp = () => form.submit();

  return (
    <>
      <Row style={showModal ? { filter: "blur(1px)" } : undefined}>
        <Col span={24} style={styles.marginBottom20}>
          <Center>
            <Text>Don't have an account?</Text>
          </Center>
        </Col>
        <Col span={24}>
          <Center>
            <Button
              type="primary"
              style={styles.newAccountButton}
              onClick={handleShowModal}
            >
              Create a new one
            </Button>
          </Center>
        </Col>
      </Row>
      <Modal
        title="Create Account"
        visible={showModal}
        onCancel={handleHideModal}
        centered={true}
        closable={true}
        maskClosable={false}
        footer={
          <Center>
            <Button
              key="submit"
              type="primary"
              onClick={handleSingUp}
              loading={loading}
            >
              Sing Up
            </Button>
          </Center>
        }
      >
        <Form size="large" onFinish={handleSubmit} form={form}>
          <Form.Item
            name={"username"}
            rules={[
              {
                required: true,
                message: "Tell us your name!",
                type: "string",
              },
            ]}
            style={styles.marginBottom20}
          >
            <Input
              prefix={<UserOutlined style={styles.inputIcon} />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name={"email"}
            rules={[
              {
                required: true,
                message: "Please input your email",
              },
              {
                type: "email",
                message: "Please input a valid email",
              },
            ]}
            style={styles.marginBottom20}
          >
            <Input
              prefix={<MailOutlined style={styles.inputIcon} />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name={"email2"}
            rules={[
              {
                required: true,
                message: "Please confirm your email",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("email") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error("Both emails must match"));
                },
              }),
            ]}
            style={styles.marginBottom20}
          >
            <Input
              prefix={<MailOutlined style={styles.inputIcon} />}
              placeholder="Confirm Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password" }]}
            style={styles.marginBottom20}
          >
            <Input.Password
              prefix={<LockOutlined style={styles.inputIcon} />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="password2"
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error("Both passwords must match"));
                },
              }),
            ]}
            style={styles.marginBottom20}
          >
            <Input.Password
              prefix={<LockOutlined style={styles.inputIcon} />}
              placeholder="Confirm Password"
            />
          </Form.Item>
        </Form>
        {errorMessage ? (
          <Center>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          </Center>
        ) : null}
      </Modal>
    </>
  );
};

const styles = {
  marginBottom20: {
    marginBottom: "20px",
  } as CSSProperties,

  newAccountButton: {
    borderRadius: "5px",
    width: "80%",
  } as CSSProperties,

  inputIcon: {
    color: "#bebebe",
  } as CSSProperties,

  errorMessage: {
    color: "#ff4d4f",
    fontSize: "18px",
  } as CSSProperties,
};
