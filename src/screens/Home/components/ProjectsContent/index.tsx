import {
  AppstoreAddOutlined,
  DeleteOutlined,
  EditOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import {
  Col,
  Divider,
  Layout,
  Row,
  Menu,
  Dropdown,
  Typography,
  Modal,
} from "antd";
import React, { useState } from "react";
import { CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFile, removeFile, renameFile } from "src/redux/files/actions";
import { selectFiles } from "src/redux/files/selectors";
import {
  createFolder,
  removeFolder,
  renameFolder,
} from "src/redux/folders/actions";
import { selectFolders } from "src/redux/folders/selectors";
import { Folder } from "src/screens/Home/components/ProjectsContent/components/Folder";
import { IFile } from "src/utils/api/resources/file";
import { IFolder } from "src/utils/api/resources/folder";
import { CustomDragLayer } from "./components/CustomDragLayer";
import { File } from "./components/File";
import { ItemNameModal } from "./components/ItemNameModal";
import { ProjectsHeader } from "./components/ProjectsHeader";
import "./scrollbar.css";

export type ActiveFolderStruct = {
  id: string;
  name: string;
};

type ItemContextualMenuParams =
  | {
      type: "folder";
      item: IFolder;
    }
  | {
      type: "file";
      item: IFile;
    };

type RenameItemStruct =
  | {
      type: "folder";
      item: IFolder;
    }
  | {
      type: "file";
      item: IFile;
    };

const { Content } = Layout;
const { Text } = Typography;
const { confirm } = Modal;

export const ProjectsContent: React.FC = () => {
  const dispatch = useDispatch();
  const [activeFolders, setActiveFolders] = useState<ActiveFolderStruct[]>([]);
  const folders = useSelector(
    selectFolders(
      activeFolders.length === 0
        ? null
        : activeFolders[activeFolders.length - 1].id
    )
  );
  const files = useSelector(
    selectFiles(
      activeFolders.length === 0
        ? null
        : activeFolders[activeFolders.length - 1].id
    )
  );
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [showRenameItemModal, setShowRenameItemModal] = useState(false);
  const [itemToRename, setItemToRename] = useState<
    RenameItemStruct | undefined
  >(undefined);
  const [disableGeneralContext, setDisableGeneralContext] = useState(false);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);

  const clampActiveFolders = (lenght: number) => {
    if (lenght === activeFolders.length) {
      return;
    }

    const clampedActiveFolders = activeFolders.filter(
      (_, indx) => indx <= lenght - 1
    );

    setActiveFolders(clampedActiveFolders);
  };

  const handleSelectFolderAfterDrag = (folderId: string) => {
    setSelectedItem(folderId);
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

  const handleAddProject = ({ name }: { name: string }) => {
    const parent =
      activeFolders.length === 0
        ? null
        : activeFolders[activeFolders.length - 1].id;
    dispatch(createFile(name, parent));
    handleHideCreateProjectModal();
  };

  const handleShowCreateProjectModal = () => {
    setShowCreateProjectModal(true);
  };

  const handleHideCreateProjectModal = () => {
    setShowCreateProjectModal(false);
  };

  const generalContextualMenu = (
    <Menu style={styles.contextualMenu}>
      <Menu.Item key="New Folder" onClick={handleShowCreateFolderModal}>
        <FolderAddOutlined style={styles.contextualMenuIcon} />
        <Text style={styles.contextualMenuText}>New Folder</Text>
      </Menu.Item>
      <Menu.Item key="New Project" onClick={handleShowCreateProjectModal}>
        <AppstoreAddOutlined style={styles.contextualMenuIcon} />
        <Text style={styles.contextualMenuText}>New Project</Text>
      </Menu.Item>
    </Menu>
  );

  const handleRenameItem = ({ name }: { name: string }) => {
    if (itemToRename) {
      if (itemToRename.type === "folder") {
        dispatch(renameFolder(itemToRename.item.id, name));
      } else {
        dispatch(renameFile(itemToRename.item.id, name));
      }
    }
    handleHideRenameItemModal();
  };

  const handleShowRenameItemModal = (params: RenameItemStruct) => {
    setShowRenameItemModal(true);
    setItemToRename(params);
  };

  const handleHideRenameItemModal = () => {
    setShowRenameItemModal(false);
    setItemToRename(undefined);
    setDisableGeneralContext(false);
  };

  const handleShowDeleteFolderModal = (folder: IFolder) => {
    confirm({
      title: "Are you sure you want to delete this folder?",
      content: (
        <>
          <p>Everything contained in it will be lost</p>
          <p>Including your projects!!</p>
        </>
      ),
      okText: "Delete",
      okType: "danger",
      centered: true,
      onOk: () => {
        dispatch(removeFolder(folder.id));
        handleDisableGeneralContext(false);
      },
      onCancel: () => {
        handleDisableGeneralContext(false);
      },
    });
  };

  const handleShowDeleteFileModal = (file: IFile) => {
    confirm({
      title: "Are you sure you want to delete this project?",
      content: (
        <>
          <p>All data related to the project will be lost</p>
          <p>People you've shared the project with will also lose access</p>
        </>
      ),
      okText: "Delete",
      okType: "danger",
      centered: true,
      onOk: () => {
        dispatch(removeFile(file.id));
        handleDisableGeneralContext(false);
      },
      onCancel: () => {
        handleDisableGeneralContext(false);
      },
    });
  };

  const itemContextualMenu = (params: ItemContextualMenuParams) => {
    const { type, item } = params;
    return (
      <Menu style={styles.contextualMenu}>
        <Menu.Item
          key="Rename"
          onClick={() => handleShowRenameItemModal(params)}
        >
          <EditOutlined style={styles.contextualMenuIcon} />
          <Text style={styles.contextualMenuText}>Rename</Text>
        </Menu.Item>
        <Menu.Item
          key="Delete"
          onClick={() =>
            type === "folder"
              ? handleShowDeleteFolderModal(item)
              : handleShowDeleteFileModal(item)
          }
        >
          <DeleteOutlined style={styles.contextualMenuIcon} />
          <Text style={styles.contextualMenuText}>Delete</Text>
        </Menu.Item>
      </Menu>
    );
  };

  const handleDisableGeneralContext = (itemContextVisible: boolean) => {
    itemContextVisible
      ? setDisableGeneralContext(true)
      : setTimeout(() => setDisableGeneralContext(false));
  };

  return (
    <>
      <CustomDragLayer />
      <ProjectsHeader
        clampActiveFolders={clampActiveFolders}
        activeFolders={activeFolders}
      />
      <Divider style={styles.divider} />
      <Dropdown
        overlay={generalContextualMenu}
        trigger={["contextMenu"]}
        overlayClassName={disableGeneralContext ? "invisible" : ""}
      >
        <Content
          style={styles.whiteBackground}
          onClick={() => setSelectedItem(null)}
        >
          <Row gutter={[16, 24]} style={styles.mainRow}>
            {folders.map((folder) => {
              return (
                <Dropdown
                  overlay={itemContextualMenu({ type: "folder", item: folder })}
                  trigger={["contextMenu"]}
                  key={folder.id}
                  onVisibleChange={handleDisableGeneralContext}
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
                      setSelectedItem(folder.id);
                      event.stopPropagation(); // Stop event propagation to avoid triggering parent's <Content /> event
                    }}
                  >
                    <Folder
                      name={folder.name}
                      id={folder.id}
                      selected={selectedItem === folder.id}
                      setSelectedFolder={handleSelectFolderAfterDrag}
                    />
                  </Col>
                </Dropdown>
              );
            })}
          </Row>
          <Divider />
          <Row gutter={[16, 24]} style={styles.mainRow}>
            {files.map((file) => {
              return (
                <Dropdown
                  overlay={itemContextualMenu({ type: "file", item: file })}
                  trigger={["contextMenu"]}
                  key={file.id}
                  onVisibleChange={handleDisableGeneralContext}
                >
                  <Col
                    span={6}
                    onClick={(event) => {
                      setSelectedItem(file.id);
                      event.stopPropagation(); // Stop event propagation to avoid triggering parent's <Content /> event
                    }}
                  >
                    <File
                      name={file.name}
                      id={file.id}
                      selected={selectedItem === file.id}
                      setSelectedFile={setSelectedItem}
                    />
                  </Col>
                </Dropdown>
              );
            })}
          </Row>
        </Content>
      </Dropdown>

      <ItemNameModal
        title="New Folder"
        visible={showCreateFolderModal}
        handleHide={handleHideCreateFolderModal}
        handleSubmit={handleAddFolder}
        defaultText="New Folder"
      />

      <ItemNameModal
        title="New Project"
        visible={showCreateProjectModal}
        handleHide={handleHideCreateProjectModal}
        handleSubmit={handleAddProject}
      />

      <ItemNameModal
        title="Rename"
        visible={showRenameItemModal}
        handleHide={handleHideRenameItemModal}
        handleSubmit={handleRenameItem}
        defaultText={itemToRename ? itemToRename.item.name : undefined}
      />
    </>
  );
};

const styles = {
  mainRow: {
    width: "100%",
    paddingTop: "4vh",
    paddingBottom: "4vh",
    paddingLeft: "1vw",
  } as CSSProperties,

  whiteBackground: {
    backgroundColor: "#FFF",
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
