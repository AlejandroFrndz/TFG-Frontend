import { FolderFilled } from "@ant-design/icons";
import { Card, Typography } from "antd";
import React, { CSSProperties, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DragTypes } from "src/utils/constants";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useDispatch } from "react-redux";
import { updateFolderParent } from "src/redux/folders/actions";
import { ProjectItem } from "src/shared/ProjectItem";

type FolderProps = {
  name: string;
  id: string;
  selected: boolean;
  setSelectedFolder: (folderId: string) => void;
};

const { Text } = Typography;

export const Folder: React.FC<FolderProps> = ({
  name,
  id,
  selected,
  setSelectedFolder,
}) => {
  const dispatch = useDispatch();

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    item: { name, id },
    type: DragTypes.FOLDER,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        setSelectedFolder(item.id);
      }
    },
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: [DragTypes.FOLDER, DragTypes.FILE],
    drop: (item: any, monitor) => {
      dispatch(updateFolderParent(item.id, id));
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
    canDrop: (item: any, _monitor) => item.id !== id, // Avoid dropping the folder onto itself
  }));

  useEffect(() => {
    preview(getEmptyImage());
  });

  return (
    <>
      <div ref={drop}>
        <div ref={drag}>
          <ProjectItem
            type="folder"
            isDragging={isDragging}
            isOver={isOver}
            isSelected={selected}
            name={name}
          />
        </div>
      </div>
    </>
  );
};
