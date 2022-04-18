import { EditOutlined, FolderAddOutlined } from "@ant-design/icons";
import {
  Col,
  Divider,
  Layout,
  Row,
  Breadcrumb,
  Menu,
  Dropdown,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFolder } from "src/redux/auth/actions";
import { selectFolders } from "src/redux/auth/selectors";
import { Folder } from "src/screens/Home/components/ProjectsContent/components/Folder";
import { IFolder } from "src/utils/api/resources/folder";
import { BreadcrumbLabel } from "./components/BreadcrumbLabel";
import { FolderNameModal } from "./components/FolderNameModal";
import "./scrollbar.css";

type ActiveFolderStruct = {
  id: string;
  name: string;
};

const { Content, Header } = Layout;
const { Text } = Typography;

export const ProjectsContent: React.FC = () => {
  const dispatch = useDispatch();
  const [activeFolders, setActiveFolders] = useState<ActiveFolderStruct[]>([]);
  const folders = useSelector(selectFolders);
  const [displayFolders, setDisplayFolders] = useState<IFolder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [showRenameFolderModal, setShowRenameFolderModal] = useState(false);
  const [renameFolder, setRenameFolder] = useState<IFolder | undefined>(
    undefined
  );

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
      <BreadcrumbLabel
        clampActiveFolders={clampActiveFolders}
        index={0}
        name="My Projects"
        id={null}
        key="null"
      />
    );

    const dynamicHeader = activeFolders.map((folderStruct, indx) => (
      <>
        <Breadcrumb.Separator key={`Separator ${folderStruct.id}`}>
          &gt;
        </Breadcrumb.Separator>
        <BreadcrumbLabel
          clampActiveFolders={clampActiveFolders}
          index={indx + 1}
          name={folderStruct.name}
          id={folderStruct.id}
          key={folderStruct.id}
        />
      </>
    ));

    return [fixedHeader, ...dynamicHeader];
  };

  const handleSelectFolderAfterDrag = (folderId: string) => {
    setSelectedFolder(folderId);
  };

  // These would better live as a separate component but for some reason Antd doesn't like it that way and styles get messed up
  const handleAddFolder = ({ name }: { name: string }) => {
    const parent =
      activeFolders.length === 0
        ? null
        : activeFolders[activeFolders.length - 1].id;

    dispatch(createFolder(name, parent));
    handleHideCreateFolderModal();
  };

  const handleShowCreateFolderModal = () => {
    setShowCreateFolderModal(true);
  };

  const handleHideCreateFolderModal = () => {
    setShowCreateFolderModal(false);
  };

  const generalContextualMenu = (
    <Menu style={styles.contextualMenu} onClick={handleShowCreateFolderModal}>
      <Menu.Item key="1">
        <FolderAddOutlined style={styles.contextualMenuIcon} />
        <Text style={styles.contextualMenuText}>New Folder</Text>
      </Menu.Item>
    </Menu>
  );

  const handleRenameFolder = ({ name }: { name: string }) => {
    console.log(`New name: ${name}`);
    handleHideRenameFolderModal();
  };

  const handleShowRenameFolderModal = (folder: IFolder) => {
    setShowRenameFolderModal(true);
    setRenameFolder(folder);
  };

  const handleHideRenameFolderModal = () => {
    setShowRenameFolderModal(false);
    setRenameFolder(undefined);
  };

  const folderContextualMenu = (folder: IFolder) => {
    return (
      <Menu style={styles.contextualMenu}>
        <Menu.Item
          key={folder.id}
          onClick={() => handleShowRenameFolderModal(folder)}
        >
          <EditOutlined style={styles.contextualMenuIcon} />
          <Text style={styles.contextualMenuText}>Rename</Text>
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <>
      <Header style={{ ...styles.whiteBackground, ...styles.header }}>
        {renderHeader()}
      </Header>
      <Divider style={styles.divider} />
      <Dropdown overlay={generalContextualMenu} trigger={["contextMenu"]}>
        <Content
          style={styles.whiteBackground}
          onClick={() => setSelectedFolder(null)}
        >
          <Row gutter={[16, 24]} style={styles.mainRow}>
            {displayFolders.map((folder) => {
              return (
                <Dropdown
                  overlay={folderContextualMenu(folder)}
                  trigger={["contextMenu"]}
                  key={folder.id}
                >
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
                      event.stopPropagation(); // Stop event propagation to avoid triggering parent's <Content /> event
                    }}
                  >
                    <Folder
                      name={folder.name}
                      id={folder.id}
                      selected={selectedFolder === folder.id}
                      setSelectedFolder={handleSelectFolderAfterDrag}
                    />
                  </Col>
                </Dropdown>
              );
            })}
          </Row>
        </Content>
      </Dropdown>

      <FolderNameModal
        title="New Folder"
        visible={showCreateFolderModal}
        handleHide={handleHideCreateFolderModal}
        handleSubmit={handleAddFolder}
        defaultText="New Folder"
      />

      <FolderNameModal
        title="Rename"
        visible={showRenameFolderModal}
        handleHide={handleHideRenameFolderModal}
        handleSubmit={handleRenameFolder}
        defaultText={renameFolder ? renameFolder.name : undefined}
      />
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
    overflowX: "auto",
    overflowY: "hidden",
  } as CSSProperties,

  divider: {
    marginTop: "0px",
    marginBottom: "0px",
    backgroundColor: "lightgrey",
  } as CSSProperties,

  contextualMenu: {
    paddingTop: "5px",
    paddingBottom: "5px",
    borderRadius: "7px",
    minWidth: "200px",
  } as CSSProperties,

  contextualMenuIcon: {
    fontSize: "25px",
    verticalAlign: "middle",
    marginRight: "10px",
    marginLeft: "5px",
  } as CSSProperties,

  contextualMenuText: {
    verticalAlign: "middle",
  } as CSSProperties,
};
