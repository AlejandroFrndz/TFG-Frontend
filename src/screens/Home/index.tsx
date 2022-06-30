import React, { CSSProperties, useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import {
  ApartmentOutlined,
  ProjectOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, fetchMe } from "src/redux/auth/actions";
import { PulseLoader } from "react-spinners";
import { Center } from "src/shared/components/Center/Center";
import { selectAuthError } from "src/redux/auth/selectors";
import { useNavigate } from "react-router-dom";
import { AccountContent } from "src/screens/Home/components/AccountContent";
import { ProjectsContent } from "src/screens/Home/components/ProjectsContent";
import { ConceptComparisonContent } from "./components/ConceptComparisonContent";

enum CategoriesEnum {
  "My Projects" = "My Projects",
  "Shared With Me" = "Shared With Me",
  "Concept Comparison" = "Concept Comparison",
  Account = "Account",
}

type CategoriesType = "My Projects" | "Shared With Me" | "Account";

const COLLAPSED_WIDTH = "7vw";

const { Content, Sider } = Layout;

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
        <Content
          style={{ ...styles.whiteBackground, ...styles.content(loading) }}
        >
          <Center>
            <PulseLoader />
          </Center>
        </Content>
      );
    }
    switch (category) {
      case CategoriesEnum["My Projects"]:
        return <ProjectsContent />;
      case CategoriesEnum["Concept Comparison"]:
        return <ConceptComparisonContent />;
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
          style={{ height: "100vh" }}
        >
          <Menu.Item
            key={CategoriesEnum["My Projects"]}
            icon={<ProjectOutlined />}
            style={styles.menuItem}
          >
            {CategoriesEnum["My Projects"]}
          </Menu.Item>
          <Menu.Item
            key={CategoriesEnum["Concept Comparison"]}
            icon={<ApartmentOutlined />}
            style={styles.menuItem}
          >
            {CategoriesEnum["Concept Comparison"]}
          </Menu.Item>
          <Menu.Item
            key={CategoriesEnum.Account}
            icon={<UserOutlined />}
            style={styles.menuItem}
          >
            {CategoriesEnum.Account}
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={styles.secondaryLayout}>{handleContent()}</Layout>
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
    paddingTop: "2vh",
  } as CSSProperties,

  myProjectsMenuItem: {
    marginTop: "0px",
  } as CSSProperties,

  secondaryLayout: {
    marginLeft: "7vw",
    backgroundColor: "#FFF",
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
