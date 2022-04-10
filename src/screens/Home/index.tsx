import React, { CSSProperties, useState } from "react";
import { Divider, Layout, Menu } from "antd";
import {
  PartitionOutlined,
  ProjectOutlined,
  UserOutlined,
} from "@ant-design/icons";

enum CategoriesEnum {
  "My Projects" = "My Projects",
  "Shared With Me" = "Shared With Me",
  Account = "Account",
}

type CategoriesType = "My Projects" | "Shared With Me" | "Account";

const COLLAPSED_WIDTH = "7vw";

const { Header, Content, Sider } = Layout;

export const Home: React.FC = () => {
  const [category, setCategory] = useState(CategoriesEnum["My Projects"]);

  const handleSelect = ({ key }: { key: string }) => {
    setCategory(CategoriesEnum[key as CategoriesType]);
  };

  const handleContent = () => {
    switch (category) {
      case CategoriesEnum["My Projects"]:
        return "My Projects";
      case CategoriesEnum["Shared With Me"]:
        return "Shared With Me";
      case CategoriesEnum.Account:
        return "Account";
    }
  };

  return (
    <Layout style={styles.mainLayout}>
      <Sider
        collapsible
        collapsed={true}
        collapsedWidth={COLLAPSED_WIDTH}
        trigger={null}
        style={styles.sider}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={[CategoriesEnum["My Projects"]]}
          mode="inline"
          onSelect={handleSelect}
        >
          <Menu.Item
            key={CategoriesEnum["My Projects"]}
            icon={<ProjectOutlined style={styles.menuIcon} />}
            style={{
              ...styles.menuItem,
              ...styles.myProjectsMenuItem,
            }}
          >
            {CategoriesEnum["My Projects"]}
          </Menu.Item>
          <Menu.Item
            key={CategoriesEnum["Shared With Me"]}
            icon={<PartitionOutlined style={styles.menuIcon} />}
            style={styles.menuItem}
          >
            {CategoriesEnum["Shared With Me"]}
          </Menu.Item>
          <Menu.Item
            key={CategoriesEnum.Account}
            icon={<UserOutlined style={styles.menuIcon} />}
            style={{
              ...styles.menuItem,
              ...styles.accountMenuItem,
            }}
          >
            {CategoriesEnum.Account}
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={styles.secondaryLayout}>
        <Header style={styles.whiteBackground}>{category}</Header>
        <Divider style={styles.divider} />
        <Content style={{ ...styles.whiteBackground, ...styles.content }}>
          {handleContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

const styles = {
  mainLayout: {
    width: "100vw",
    height: "100vh",
  } as CSSProperties,

  sider: {
    position: "fixed",
  } as CSSProperties,

  menuItem: {
    height: "10vh",
    paddingTop: "3vh",
  } as CSSProperties,

  myProjectsMenuItem: {
    marginTop: "0px",
  } as CSSProperties,

  accountMenuItem: {
    marginTop: "69vh",
  } as CSSProperties,

  menuIcon: {
    transform: "scale(1.5,1.5)",
  } as CSSProperties,

  secondaryLayout: {
    marginLeft: "7vw",
  } as CSSProperties,

  whiteBackground: {
    backgroundColor: "#FFF",
  } as CSSProperties,

  content: {
    padding: "1vh",
  } as CSSProperties,

  divider: {
    marginTop: "0px",
    marginBottom: "0px",
    backgroundColor: "lightgrey",
  } as CSSProperties,
};
