import { FolderFilled } from "@ant-design/icons";
import { Card, Typography } from "antd";
import React, { CSSProperties, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DragTypes } from "src/utils/constants";
import { CustomDragLayer } from "src/screens/Home/components/ProjectsContent/components/CustomDragLayer";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useDispatch } from "react-redux";
import { updateFolderParent } from "src/redux/folders/actions";

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
    canDrop: (item: any, monitor) => item.id !== id, // Avoid dropping the folder onto itself
  }));

  useEffect(() => {
    preview(getEmptyImage());
  });

  return (
    <>
      <CustomDragLayer />
      <div ref={drop}>
        <div ref={drag}>
          <Card style={styles.card(isDragging, isOver, selected)}>
            <FolderFilled style={styles.icon} />
            <Text ellipsis style={styles.text}>
              {name}
            </Text>
          </Card>
        </div>
      </div>
    </>
  );
};

export const styles = {
  card: (
    isDragging: boolean,
    isOver: boolean,
    selected: boolean
  ): CSSProperties => {
    const overStyles: CSSProperties =
      isOver && !isDragging
        ? {
            borderColor: "blue",
            borderWidth: "3px",
          }
        : {};

    const selectedStyles: CSSProperties =
      selected && !isDragging ? { backgroundColor: "#e8f0fe" } : {};

    return {
      borderRadius: "8px",
      opacity: isDragging ? 0.5 : 1,
      ...overStyles,
      ...selectedStyles,
    };
  },

  icon: {
    marginRight: "30px",
    fontSize: "25px",
    verticalAlign: "middle",
    color: "#6c6c6c",
  } as CSSProperties,

  text: {
    verticalAlign: "middle",
    maxWidth: "73%",
  } as CSSProperties,
};
