import {
  LockOutlined,
  MailOutlined,
  UnlockOutlined,
  UserOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  message,
  ColProps,
  Typography,
  Modal,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { Content, Header } from "antd/lib/layout/layout";
import React, { CSSProperties, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { logOut, updateUser } from "src/redux/auth/actions";
import { selectUser } from "src/redux/auth/selectors";
import { IUser } from "src/utils/api/resources/user";
import API from "src/utils/api";
import { Helmet } from "react-helmet";
import { MarcoTAO } from "src/utils/constants";

const { Text, Title } = Typography;
const { confirm } = Modal;

export const AccountContent: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form] = useForm();

  const [passwordDisabled, setPasswordDisabled] = useState(true);
  const [loadingProfileUpdate, setLoadingProfileUpdate] = useState(false);

  const user = useSelector(selectUser) as IUser;

  const handleLogOut = () => {
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
          style: styles.feedbackMessage,
        });
      } else {
        message.error({
          content: `Couldn't update profile info: ${userResponse.error.message}`,
          style: styles.feedbackMessage,
        });
      }
    }
  };

  const handleDeleteAccount = async () => {
    const response = await API.user.delete();

    if (response.isSuccess()) {
      handleLogOut();
    } else {
      message.error({
        content: `There was an error deleting your account: ${response.error.message}. Please refresh the page and try again later`,
        style: styles.feedbackMessage,
      });
    }
  };

  const handleShowDeleteAccountModal = () => {
    confirm({
      title: "Are you sure?",
      content: "This action is irreversible",
      icon: <WarningOutlined style={{ color: "red" }} />,
      centered: true,
      okButtonProps: { style: { backgroundColor: "red", borderColor: "red" } },
      okText: "Delete Account",
      cancelButtonProps: { type: "primary" },
      onOk: handleDeleteAccount,
    });
  };

  return (
    <>
      <Helmet>
        <title>{MarcoTAO} - Settings</title>
      </Helmet>
      <Header style={styles.header}>
        <Title>Account</Title>
      </Header>
      <Divider style={styles.divider} />
      <Content style={styles.content}>
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
          style={styles.form}
        >
          <Form.Item
            label="Username"
            labelCol={styles.labelCol}
            name="username"
            rules={[{ required: true, message: "Username cannot be empty" }]}
            wrapperCol={styles.wrapperCol}
          >
            <Input prefix={<UserOutlined />} style={styles.input} />
          </Form.Item>
          <Form.Item
            label="Email"
            labelCol={styles.labelCol}
            name="email"
            rules={[
              { required: true, message: "Email cannot be empty" },
              { type: "email", message: "Invalid email" },
            ]}
            wrapperCol={styles.wrapperCol}
          >
            <Input prefix={<MailOutlined />} style={styles.input} />
          </Form.Item>
          <Form.Item
            label="Password"
            labelCol={styles.labelCol}
            name="password"
            wrapperCol={styles.wrapperCol}
            rules={[{ required: true, message: "Password cannot be empty" }]}
            tooltip={{ title: "Click the lock to change your password" }}
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
              placeholder="New password"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            wrapperCol={{ ...styles.wrapperCol, offset: 3 }}
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
            <Input.Password
              placeholder="Confirm new password"
              style={styles.input}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 6, offset: 3 }}>
            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              loading={loadingProfileUpdate}
              block
            >
              Save Changes
            </Button>
          </Form.Item>
        </Form>
        <Divider />
        <Row align="middle">
          <Col span={6} offset={5}>
            <Title style={styles.deleteAccountTitle}>Delete Account</Title>
            <Text style={styles.deleteAccountText}>
              All your information, including projects, will be erased
            </Text>
          </Col>
          <Col span={3} offset={2}>
            <Button
              shape="round"
              type="primary"
              danger
              block
              onClick={handleShowDeleteAccountModal}
            >
              Delete Account
            </Button>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={4} offset={9} style={styles.buttonRow}>
            <Button onClick={handleLogOut} shape={"round"} block type="dashed">
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
    borderRadius: "10px",
  } as CSSProperties,

  divider: {
    marginTop: "0px",
    marginBottom: "0px",
    backgroundColor: "#fbfbfb",
  } as CSSProperties,

  wrapperCol: {
    span: 6,
    offset: 1,
  } as ColProps,

  labelCol: {
    span: 2,
  } as ColProps,

  feedbackMessage: {
    marginTop: "90vh",
  } as CSSProperties,

  header: {
    backgroundColor: "#FFF",
    paddingTop: "1vh",
  } as CSSProperties,

  content: {
    backgroundColor: "#FFF",
    paddingTop: "2vh",
  } as CSSProperties,

  form: {
    paddingLeft: "25vw",
  } as CSSProperties,

  deleteAccountTitle: {
    fontSize: "20px",
    marginBottom: "2px",
  } as CSSProperties,

  deleteAccountText: {
    color: "#8d8d8d",
  } as CSSProperties,

  input: {
    borderRadius: "10px",
  } as CSSProperties,
};
