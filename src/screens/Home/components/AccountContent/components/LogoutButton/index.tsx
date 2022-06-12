import { Button, Col, Row } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "src/redux/auth/actions";
import type { CSSProperties } from "react";

export const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };
  return (
    <Row>
      <Col span={3} offset={9} style={styles.buttonRow}>
        <Button onClick={handleLogOut} shape={"round"} block type="dashed">
          Log Out
        </Button>
      </Col>
    </Row>
  );
};

const styles = {
  buttonRow: {
    justifyContent: "center",
  } as CSSProperties,
};
