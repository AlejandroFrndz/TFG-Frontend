import {
  DeleteOutlined,
  EditOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import {
  Col,
  Divider,
  Layout,
  Row,
  Breadcrumb,
  Menu,
  Dropdown,
  Typography,
  Modal,
} from "antd";
import React, { useState } from "react";
import { CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFiles } from "src/redux/files/selectors";
import {
  createFolder,
  removeFolder,
  renameFolder,
} from "src/redux/folders/actions";
import { selectFolders } from "src/redux/folders/selectors";
import { Folder } from "src/screens/Home/components/ProjectsContent/components/Folder";
import { IFolder } from "src/utils/api/resources/folder";
import { BreadcrumbLabel } from "./components/BreadcrumbLabel";
import { CustomDragLayer } from "./components/CustomDragLayer";
import { FolderNameModal } from "./components/FolderNameModal";
import { ProjectsHeader } from "./components/ProjectsHeader";
import "./scrollbar.css";

export type ActiveFolderStruct = {
  id: string;
  name: string;
};

const { Content, Header } = Layout;
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
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [showRenameFolderModal, setShowRenameFolderModal] = useState(false);
  const [folderToRename, setFolderToRename] = useState<IFolder | undefined>(
    undefined
  );
  const [disableGeneralContext, setDisableGeneralContext] = useState(false);

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
      <Menu.Item key="New Folder">
        <FolderAddOutlined style={styles.contextualMenuIcon} />
        <Text style={styles.contextualMenuText}>New Folder</Text>
      </Menu.Item>
    </Menu>
  );

  const handleRenameFolder = ({ name }: { name: string }) => {
    if (folderToRename) dispatch(renameFolder(folderToRename.id, name));
    handleHideRenameFolderModal();
  };

  const handleShowRenameFolderModal = (folder: IFolder) => {
    setShowRenameFolderModal(true);
    setFolderToRename(folder);
  };

  const handleHideRenameFolderModal = () => {
    setShowRenameFolderModal(false);
    setFolderToRename(undefined);
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
      },
    });
  };

  const folderContextualMenu = (folder: IFolder) => {
    return (
      <Menu style={styles.contextualMenu}>
        <Menu.Item
          key="Rename"
          onClick={() => handleShowRenameFolderModal(folder)}
        >
          <EditOutlined style={styles.contextualMenuIcon} />
          <Text style={styles.contextualMenuText}>Rename</Text>
        </Menu.Item>
        <Menu.Item
          key="Delete"
          onClick={() => handleShowDeleteFolderModal(folder)}
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
          onClick={() => setSelectedFolder(null)}
        >
          <Text>Folders</Text>
          <Row gutter={[16, 24]} style={styles.mainRow}>
            {folders.map((folder) => {
              return (
                <Dropdown
                  overlay={folderContextualMenu(folder)}
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
          <Text>Files</Text>
          <Row gutter={[16, 24]} style={styles.mainRow}>
            {files.map((file) => {
              return <div>A file</div>;
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
        defaultText={folderToRename ? folderToRename.name : undefined}
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
