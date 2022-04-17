import { Col, Divider, Layout, Row, Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import { CSSProperties } from "react";
import { useSelector } from "react-redux";
import { selectFolders } from "src/redux/auth/selectors";
import { Folder } from "src/screens/Home/components/ProjectsContent/components/Folder";
import { IFolder } from "src/utils/api/resources/folder";

type ActiveFolderStruct = {
  id: string;
  name: string;
};

const { Content, Header } = Layout;

export const ProjectsContent: React.FC = () => {
  const [activeFolders, setActiveFolders] = useState<ActiveFolderStruct[]>([]);
  const [folders] = useState<IFolder[]>(useSelector(selectFolders));
  const [displayFolders, setDisplayFolders] = useState<IFolder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  useEffect(() => {
    setDisplayFolders(
      folders.filter((folder) => {
        if (activeFolders.length === 0) {
          return folder.parent === null;
        } else {
          return folder.parent === activeFolders[activeFolders.length - 1].id;
        }
      })
    );
  }, [activeFolders, folders]);

  const clampActiveFolders = (lenght: number) => {
    if (lenght === activeFolders.length) {
      return;
    }

    const clampedActiveFolders = activeFolders.filter(
      (_, indx) => indx <= lenght - 1
    );

    setActiveFolders(clampedActiveFolders);
  };

  const renderHeader = () => {
    const fixedHeader = (
      <Breadcrumb.Item onClick={() => clampActiveFolders(0)} key="null">
        My Projects
      </Breadcrumb.Item>
    );
    const dynamicHeader = activeFolders.map((folderStruct, indx) => (
      <Breadcrumb.Item
        onClick={() => clampActiveFolders(indx + 1)}
        key={folderStruct.id}
      >
        {folderStruct.name}
      </Breadcrumb.Item>
    ));

    return (
      <Breadcrumb separator=">" style={styles.breadcrumbItem}>
        {[fixedHeader, ...dynamicHeader]}
      </Breadcrumb>
    );
  };

  const handleSelectFolderAfterDrag = (folderId: string) => {
    setSelectedFolder(folderId);
  };

  return (
    <>
      <Header style={{ ...styles.whiteBackground, ...styles.header }}>
        {renderHeader()}
      </Header>
      <Divider style={styles.divider} />
      <Content
        style={styles.whiteBackground}
        onClick={() => setSelectedFolder(null)}
      >
        <Row gutter={[16, 24]} style={styles.mainRow}>
          {displayFolders.map((folder) => {
            return (
              <Col
                span={6}
                onDoubleClick={() =>
                  setActiveFolders([
                    ...activeFolders,
                    { id: folder.id, name: folder.name },
                  ])
                }
                onClick={(event) => {
                  setSelectedFolder(folder.id);
                  event.stopPropagation(); // Stop event propagation to avoid triggering parent's <Content />
                }}
                key={folder.id}
              >
                <Folder
                  name={folder.name}
                  id={folder.id}
                  selected={selectedFolder === folder.id}
                  setSelectedFolder={handleSelectFolderAfterDrag}
                />
              </Col>
            );
          })}
        </Row>
      </Content>
    </>
  );
};

const styles = {
  mainRow: {
    width: "100%",
    paddingTop: "4vh",
    paddingLeft: "1vw",
  } as CSSProperties,

  whiteBackground: {
    backgroundColor: "#FFF",
  } as CSSProperties,

  header: {
    display: "flex",
    alignItems: "center",
  } as CSSProperties,

  divider: {
    marginTop: "0px",
    marginBottom: "0px",
    backgroundColor: "lightgrey",
  } as CSSProperties,

  breadcrumbItem: {
    cursor: "pointer",
  } as CSSProperties,
};
