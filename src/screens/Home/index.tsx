import React, { CSSProperties, useEffect, useState } from "react";
import { Divider, Layout, Menu } from "antd";
import {
  PartitionOutlined,
  ProjectOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, fetchMe } from "src/redux/auth/actions";
import { PulseLoader } from "react-spinners";
import { Center } from "src/shared/Center";
import { selectAuthError } from "src/redux/auth/selectors";
import { useNavigate } from "react-router-dom";
import { AccountContent } from "src/screens/Home/components/AccountContent";
import { ProjectsContent } from "src/screens/Home/components/ProjectsContent";

enum CategoriesEnum {
  "My Projects" = "My Projects",
  "Shared With Me" = "Shared With Me",
  Account = "Account",
}

type CategoriesType = "My Projects" | "Shared With Me" | "Account";

const COLLAPSED_WIDTH = "7vw";

const { Header, Content, Sider } = Layout;

export const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, setCategory] = useState(CategoriesEnum["My Projects"]);
  const [loading, setLoading] = useState(true);
  const error = useSelector(selectAuthError);

  const handleSelect = ({ key }: { key: string }) => {
    setCategory(CategoriesEnum[key as CategoriesType]);
  };

  useEffect(() => {
    const runFetchMe = async () => {
      await dispatch(fetchMe());
      setLoading(false);
    };

    runFetchMe();
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(clearAuthError());
      navigate("/");
    }
  }, [error, navigate, dispatch]);

  const handleContent = () => {
    if (loading) {
      return (
        <Center>
          <PulseLoader />
        </Center>
      );
    }
    switch (category) {
      case CategoriesEnum["My Projects"]:
        return <ProjectsContent />;
      case CategoriesEnum["Shared With Me"]:
        return "Shared With Me";
      case CategoriesEnum.Account:
        return <AccountContent />;
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
        <Content
          style={{ ...styles.whiteBackground, ...styles.content(loading) }}
        >
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

  content: (loading: boolean): CSSProperties => {
    return loading
      ? {
          padding: "1vh",
          display: "flex",
          justifyContent: "center",
        }
      : {};
  },

  divider: {
    marginTop: "0px",
    marginBottom: "0px",
    backgroundColor: "lightgrey",
  } as CSSProperties,
};
