import { WarningOutlined } from "@ant-design/icons";
import { Button, Col, Divider, message, Modal, Row, Typography } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { CSSProperties } from "react";
import { logOut } from "src/redux/auth/actions";
import API from "src/utils/api";

const { Text, Title } = Typography;
const { confirm } = Modal;

export const DeleteAccountSection: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    const response = await API.user.deleteMe();

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
      icon: <WarningOutlined style={styles.modalIcon} />,
      centered: true,
      okButtonProps: {
        style: styles.modalButton,
      },
      okText: "Delete Account",
      cancelButtonProps: { type: "primary" },
      onOk: handleDeleteAccount,
    });
  };

  return (
    <>
      <Divider />
      <Row align="middle" style={styles.wrapperRow}>
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
    </>
  );
};

const styles = {
  feedbackMessage: {
    marginTop: "90vh",
  } as CSSProperties,

  deleteAccountTitle: {
    fontSize: "20px",
    marginBottom: "2px",
  } as CSSProperties,

  deleteAccountText: {
    color: "#8d8d8d",
  } as CSSProperties,

  wrapperRow: {
    paddingBottom: "30px",
  } as CSSProperties,

  modalButton: {
    backgroundColor: "red",
    borderColor: "red",
  } as CSSProperties,

  modalIcon: {
    color: "red",
  } as CSSProperties,
};
