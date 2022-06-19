import {
  LockOutlined,
  MailOutlined,
  UnlockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { ColProps } from "antd";
import useForm from "antd/lib/form/hooks/useForm";
import _ from "lodash";
import { useState } from "react";
import type { CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "src/redux/auth/actions";
import { selectUser } from "src/redux/auth/selectors";
import API from "src/utils/api";
import { IUser } from "src/utils/api/resources/user";

export const AccountForm: React.FC = () => {
  const dispatch = useDispatch();

  const [form] = useForm();

  const [passwordDisabled, setPasswordDisabled] = useState(true);
  const [loadingProfileUpdate, setLoadingProfileUpdate] = useState(false);

  const user = useSelector(selectUser) as IUser;

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
      const userResponse = await API.user.updateMe(params);
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

  return (
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
  );
};

const styles = {
  feedbackMessage: {
    marginTop: "90vh",
  } as CSSProperties,

  form: {
    paddingLeft: "25vw",
  } as CSSProperties,

  wrapperCol: {
    span: 6,
    offset: 1,
  } as ColProps,

  labelCol: {
    span: 2,
  } as ColProps,

  input: {
    borderRadius: "10px",
  } as CSSProperties,

  passwordInput: {
    color: "black",
    cursor: "default",
    borderRadius: "10px",
  } as CSSProperties,
};
