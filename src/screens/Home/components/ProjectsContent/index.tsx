import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { CSSProperties } from "react";
import { useSelector } from "react-redux";
import { selectFolders } from "src/redux/auth/selectors";
import { Folder } from "src/screens/Home/components/ProjectsContent/components/Folder";
import { IFolder } from "src/utils/api/resources/folder";

export const ProjectsContent: React.FC = () => {
  const [activeFolder, setActiveFolder] = useState<null | string>(null);
  const [folders] = useState<IFolder[]>(useSelector(selectFolders));
  const [activeFolders, setActiveFolders] = useState<IFolder[]>([]);

  useEffect(() => {
    setActiveFolders(
      folders.filter((folder) => folder.parent === activeFolder)
    );
  }, [activeFolder, folders]);

  return (
    <Row gutter={[16, 24]} style={styles.mainRow}>
      {activeFolders.map((folder) => {
        return (
          <Col span={6} onDoubleClick={() => setActiveFolder(folder.id)}>
            <Folder name={folder.name} id={folder.id} />
          </Col>
        );
      })}
    </Row>
  );
};

const styles = {
  mainRow: {
    width: "100%",
    paddingTop: "4vh",
    paddingLeft: "1vw",
  } as CSSProperties,
};
