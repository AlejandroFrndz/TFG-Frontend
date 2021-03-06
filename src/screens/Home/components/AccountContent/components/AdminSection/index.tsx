import { useSelector } from "react-redux";
import { selectUser } from "src/redux/auth/selectors";
import { Col, Divider, Row, Typography } from "antd";
import type { CSSProperties } from "react";
import { TagsAdminSection } from "./components/TagsAdminSection";
import { UsersAdminSection } from "./components/UsersAdminSection";
import { IUser } from "src/utils/api/resources/user";

const { Title } = Typography;

export const AdminSection: React.FC = () => {
  const { isAdmin } = useSelector(selectUser) as IUser;

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <Divider />
      <Row justify="center" style={styles.titleRow}>
        <Col span={24}>
          <Title style={styles.titleRow}>Admin Settings</Title>
        </Col>
      </Row>
      <Col span={12} offset={6}>
        <Divider />
      </Col>
      <TagsAdminSection />
      <Col span={12} offset={6}>
        <Divider />
      </Col>
      <UsersAdminSection />
    </>
  );
};

const styles = {
  titleRow: {
    textAlign: "center",
  } as CSSProperties,
};
