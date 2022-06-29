import {
  AppstoreAddOutlined,
  DeleteOutlined,
  EditOutlined,
  FolderAddOutlined,
  QuestionCircleOutlined,
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
  Button,
  Space,
  Tooltip,
} from "antd";
import React, { useState } from "react";
import { CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { addFile, deleteFile, updateFile } from "src/redux/files/actions";
import { selectFiles } from "src/redux/files/selectors";
import {
  addFolder,
  deleteFolder,
  updateFolder,
} from "src/redux/folders/actions";
import { selectFolders } from "src/redux/folders/selectors";
import { Folder } from "src/screens/Home/components/ProjectsContent/components/Folder";
import API from "src/utils/api";
import { IFile } from "src/utils/api/resources/file";
import { IFolder } from "src/utils/api/resources/folder";
import { handleActionErrorMessage } from "src/utils/helpers";
import { CustomDragLayer } from "./components/CustomDragLayer";
import { File } from "./components/File";
import { ItemNameModal } from "./components/ItemNameModal";
import { ProjectsHeader } from "./components/ProjectsHeader";
import "./scrollbar.css";
import { MarcoTAO } from "src/utils/constants";

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
  const [showHelpModal, setShowHelpModal] = useState(false);

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
  const handleAddFolder = async ({ name }: { name: string }) => {
    const parent =
      activeFolders.length === 0
        ? null
        : activeFolders[activeFolders.length - 1].id;

    handleHideCreateFolderModal();

    const folderResponse = await API.folder.create(name, parent);

    if (folderResponse.isSuccess()) {
      dispatch(addFolder(folderResponse.value.folder));
    } else {
      handleActionErrorMessage(folderResponse.error);
    }
  };

  const handleShowCreateFolderModal = () => {
    setShowCreateFolderModal(true);
  };

  const handleHideCreateFolderModal = () => {
    setShowCreateFolderModal(false);
  };

  const handleAddProject = async ({ name }: { name: string }) => {
    const parent =
      activeFolders.length === 0
        ? null
        : activeFolders[activeFolders.length - 1].id;

    handleHideCreateProjectModal();

    const fileResponse = await API.file.create(name, parent);

    if (fileResponse.isSuccess()) {
      dispatch(addFile(fileResponse.value.file));
    } else {
      handleActionErrorMessage(fileResponse.error);
    }
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

  const handleRenameItem = async ({ name }: { name: string }) => {
    handleHideRenameItemModal();

    if (itemToRename) {
      if (itemToRename.type === "folder") {
        const folderResponse = await API.folder.rename(
          itemToRename.item.id,
          name
        );

        if (folderResponse.isSuccess()) {
          dispatch(updateFolder(folderResponse.value.folder));
        } else {
          handleActionErrorMessage(folderResponse.error);
        }
      } else {
        const fileResponse = await API.file.rename(itemToRename.item.id, name);

        if (fileResponse.isSuccess()) {
          dispatch(updateFile(fileResponse.value.file));
        } else {
          handleActionErrorMessage(fileResponse.error);
        }
      }
    }
  };

  const handleRenameFromButton = () => {
    if (!selectedItem) return;

    const selectedFolder = folders.find((folder) => folder.id === selectedItem);

    if (selectedFolder) {
      handleShowRenameItemModal({ type: "folder", item: selectedFolder });
      return;
    }

    const selectedFile = files.find((file) => file.id === selectedItem);

    if (selectedFile) {
      handleShowRenameItemModal({ type: "file", item: selectedFile });
    }
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

  const handleDeleteFromButton = () => {
    if (!selectedItem) return;

    const selectedFolder = folders.find((folder) => folder.id === selectedItem);

    if (selectedFolder) {
      handleShowDeleteFolderModal(selectedFolder);
      return;
    }

    const selectedFile = files.find((file) => file.id === selectedItem);

    if (selectedFile) {
      handleShowDeleteFileModal(selectedFile);
    }
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
      onOk: async () => {
        const response = await API.folder.delete(folder.id);

        if (response.isSuccess()) {
          dispatch(deleteFolder(folder.id));
        } else {
          handleActionErrorMessage(response.error);
        }
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
      onOk: async () => {
        const response = await API.file.delete(file.id);

        if (response.isSuccess()) {
          dispatch(deleteFile(file.id));
        } else {
          handleActionErrorMessage(response.error);
        }
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
      <Helmet>
        <title>{MarcoTAO} - Projects</title>
      </Helmet>
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
          <Row
            style={{
              marginBottom: "30px",
              marginTop: "10px",
              paddingLeft: "10px",
            }}
          >
            <Space size={"large"}>
              <Button
                icon={<FolderAddOutlined />}
                onClick={handleShowCreateFolderModal}
              >
                New Folder
              </Button>
              <Button
                icon={<AppstoreAddOutlined />}
                onClick={handleShowCreateProjectModal}
              >
                New Project
              </Button>
              <Button
                icon={<DeleteOutlined />}
                danger
                disabled={selectedItem === null}
                onClick={handleDeleteFromButton}
              >
                Delete
              </Button>
              <Button
                icon={<EditOutlined />}
                disabled={selectedItem === null}
                onClick={handleRenameFromButton}
              >
                Rename
              </Button>
              <Tooltip
                overlay="Click me to get some help!"
                placement="right"
                mouseEnterDelay={0.5}
              >
                <QuestionCircleOutlined
                  style={{ fontSize: "20px", cursor: "pointer" }}
                  onClick={() => setShowHelpModal(true)}
                />
              </Tooltip>
            </Space>
          </Row>
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
                    onDoubleClick={() => {
                      setActiveFolders([
                        ...activeFolders,
                        { id: folder.id, name: folder.name },
                      ]);
                      setSelectedItem(null);
                    }}
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
                    onDoubleClick={() => {
                      window.open(
                        `/project/${file.project}`,
                        "_blank",
                        "noopener,noreferrer"
                      );
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

      <Modal
        visible={showHelpModal}
        centered
        title="How this screen works"
        cancelButtonProps={{ style: { display: "none" } }}
        onCancel={() => setShowHelpModal(false)}
        onOk={() => setShowHelpModal(false)}
        bodyStyle={{ maxHeight: "500px", overflowY: "auto" }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3>Move Between Items</h3>
          <p>
            If you double click a folder, you'll open it to see it contents. In
            case you want to go back, click the folder names at the top of the
            page to navigate back to previous folders. It works pretty much the
            same as you would do while using the file explorer of your operating
            system. (ie Windows)
          </p>
          <p>
            If you double click a project, a new browser tab will open allowing
            you to work on said project.
          </p>
          <h3>Select Items</h3>
          <p>
            Items can be selected by clicking them once. You will notice the
            background of the currently selected item will turn darker. When an
            item is selected, you can delete or rename it by click the buttons
            that will now be enabled. You can deselect the currently selected
            item by clicking anywhere else in the screen.
          </p>
          <h3>Organise Items</h3>
          <p>
            You can move your projects and folders to create whatever hierarchy
            works best for you. You can drag both files and folders on top of
            other folders to move them inside the folder you're dropping them
            on. You can also drag items to the folder names at the top of the
            page in order to get items out of a folder.
          </p>
          <h3>Context Menu</h3>
          <p>
            Lastly, you can use all the previously mentioned interaction via
            contextual menus by right clicking in any free space to create new
            folders and projects or on top of an item to delete or rename it.
          </p>
        </div>
      </Modal>
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
