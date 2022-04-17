import { FolderFilled } from "@ant-design/icons";
import { Card, Typography } from "antd";
import React, { CSSProperties, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DragTypes } from "src/utils/constants";
import { CustomDragLayer } from "src/screens/Home/components/ProjectsContent/components/CustomDragLayer";
import { getEmptyImage } from "react-dnd-html5-backend";

type FolderProps = {
  name: string;
  id: string;
};

const { Text } = Typography;

export const Folder: React.FC<FolderProps> = ({ name, id }) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    item: { name, id },
    type: DragTypes.FOLDER,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: [DragTypes.FOLDER, DragTypes.FILE],
    drop: () => console.log("drop"),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
    canDrop: (item, monitor) => (item as any).id !== id, // Avoid dropping the folder onto itself
  }));

  useEffect(() => {
    preview(getEmptyImage());
  });

  return (
    <>
      <CustomDragLayer />
      <div ref={drop}>
        <div ref={drag}>
          <Card style={styles.card(isDragging, isOver)}>
            <FolderFilled style={styles.icon} />
            <Text style={styles.text}>{name}</Text>
          </Card>
        </div>
      </div>
    </>
  );
};

export const styles = {
  card: (isDragging: boolean, isOver: boolean): CSSProperties => {
    const overStyles: CSSProperties =
      isOver && !isDragging
        ? {
            borderColor: "blue",
            borderWidth: "3px",
          }
        : {};

    return {
      borderRadius: "8px",
      opacity: isDragging ? 0.5 : 1,
      ...overStyles,
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
  } as CSSProperties,
};
