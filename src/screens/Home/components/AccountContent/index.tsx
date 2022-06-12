import { Divider, Typography } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import type { CSSProperties } from "react";
import { Helmet } from "react-helmet";
import { MarcoTAO } from "src/utils/constants";
import { AccountForm } from "./components/AccountForm";
import { LogoutButton } from "./components/LogoutButton";
import { DeleteAccountSection } from "./components/DeleteAccountSection";

const { Title } = Typography;

export const AccountContent: React.FC = () => {
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
        <AccountForm />
        <LogoutButton />
        <Divider />
        <DeleteAccountSection />
      </Content>
    </>
  );
};

const styles = {
  divider: {
    marginTop: "0px",
    marginBottom: "0px",
    backgroundColor: "#fbfbfb",
  } as CSSProperties,

  header: {
    backgroundColor: "#FFF",
    paddingTop: "1vh",
  } as CSSProperties,

  content: {
    backgroundColor: "#FFF",
    paddingTop: "2vh",
  } as CSSProperties,
};
