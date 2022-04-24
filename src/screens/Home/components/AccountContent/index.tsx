import {
  LockOutlined,
  MailOutlined,
  UnlockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Col, Divider, Form, Input, Row, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import { Content, Header } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import React, { CSSProperties, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { logOut, updateUser } from "src/redux/auth/actions";
import { selectUser } from "src/redux/auth/selectors";
import { IUser } from "src/utils/api/resources/user";
import API from "src/utils/api";

export const AccountContent: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form] = useForm();

  const [passwordDisabled, setPasswordDisabled] = useState(true);
  const [loadingProfileUpdate, setLoadingProfileUpdate] = useState(false);

  const user = useSelector(selectUser) as IUser;

  const handleLogOut = (): void => {
    dispatch(logOut());
    navigate("/");
  };

  const handleEnablePassword = () => {
    setPasswordDisabled(false);
    form.setFieldsValue({
      password: "",
      confirmPassword: "",
    });
  };

  const handleDisablePassword = () => {
    setPasswordDisabled(true);
    form.setFieldsValue({ password: "*************" });
  };

  const handleSubmit = async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    const params: Record<string, string> = {};

    if (password !== "*************") params.password = password;
    if (user.email !== email) params.email = email;
    if (user.username !== username) params.username = username;

    if (!_.isEmpty(params)) {
      setLoadingProfileUpdate(true);
      const userResponse = await API.user.update(params);
      setLoadingProfileUpdate(false);

      if (userResponse.isSuccess()) {
        dispatch(updateUser(userResponse.value.user));
        message.success({
          content: "Profile info updated!",
          style: {
            marginTop: "90vh",
          },
        });
      } else {
        message.error({
          content: `Couldn't update profile info: ${userResponse.error.message}`,
          style: {
            marginTop: "90vh",
          },
        });
      }
    }
  };

  return (
    <>
      <Header
        style={{
          backgroundColor: "#FFF",
          paddingTop: "1vh",
        }}
      >
        <Title>Account</Title>
      </Header>
      <Content style={{ backgroundColor: "#FFF", paddingTop: "2vh" }}>
        <Form
          form={form}
          size="large"
          autoComplete="off"
          requiredMark={false}
          colon={false}
          initialValues={{
            username: user.username,
            email: user.email,
            password: "*************",
          }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Username"
            labelCol={{ span: 2 }}
            name="username"
            rules={[{ required: true, message: "Username cannot be empty" }]}
            wrapperCol={{ span: 12, offset: 1 }}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            label="Email"
            labelCol={{ span: 2 }}
            name="email"
            rules={[
              { required: true, message: "Email cannot be empty" },
              { type: "email", message: "Invalid email" },
            ]}
            wrapperCol={{ span: 12, offset: 1 }}
          >
            <Input prefix={<MailOutlined />} />
          </Form.Item>
          <Form.Item
            label="Password"
            labelCol={{ span: 2 }}
            name="password"
            wrapperCol={{ span: 12, offset: 1 }}
            rules={[{ required: true, message: "Password cannot be empty" }]}
          >
            <Input.Password
              visibilityToggle={!passwordDisabled}
              prefix={
                passwordDisabled ? (
                  <LockOutlined onClick={handleEnablePassword} />
                ) : (
                  <UnlockOutlined onClick={handleDisablePassword} />
                )
              }
              disabled={passwordDisabled}
              style={styles.passwordInput}
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            wrapperCol={{ span: 12, offset: 3 }}
            hidden={passwordDisabled}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (passwordDisabled || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error("Both passwords must match"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm new password" />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 6, offset: 7 }}>
            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              loading={loadingProfileUpdate}
            >
              Save Changes
            </Button>
          </Form.Item>
        </Form>
        <Divider />
        <Row>
          <Col span={2} offset={11} style={styles.buttonRow}>
            <Button onClick={handleLogOut} shape={"round"}>
              Log Out
            </Button>
          </Col>
        </Row>
      </Content>
    </>
  );
};

const styles = {
  buttonRow: {
    justifyContent: "center",
  } as CSSProperties,

  passwordInput: {
    color: "black",
    cursor: "default",
  } as CSSProperties,
};
