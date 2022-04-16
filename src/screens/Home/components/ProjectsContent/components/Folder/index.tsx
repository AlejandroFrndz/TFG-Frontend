import { FolderFilled } from "@ant-design/icons";
import { Card, Typography } from "antd";
import React, { CSSProperties, useEffect } from "react";
import { useDrag } from "react-dnd";
import { DragTypes } from "../../../../../../utils/constants";
import { CustomDragLayer } from "../CustomDragLayer";
import { getEmptyImage } from "react-dnd-html5-backend";

type FolderProps = {
  name: string;
};

const { Text } = Typography;

export const Folder: React.FC<FolderProps> = ({ name }) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    item: { name },
    type: DragTypes.FOLDER,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    preview(getEmptyImage());
  });

  return (
    <>
      <CustomDragLayer />
      <div ref={drag}>
        <Card style={styles.card(isDragging)}>
          <FolderFilled style={styles.icon} />
          <Text style={styles.text}>{name}</Text>
        </Card>
      </div>
    </>
  );
};

export const styles = {
  card: (isDragging: boolean): CSSProperties => {
    return {
      borderRadius: "8px",
      opacity: isDragging ? 0.5 : 1,
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
