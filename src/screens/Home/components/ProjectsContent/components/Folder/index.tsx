import { FolderFilled } from "@ant-design/icons";
import { Card, Typography } from "antd";
import React, { CSSProperties } from "react";

type FolderProps = {
  name: string;
};

const { Text } = Typography;

export const Folder: React.FC<FolderProps> = ({ name }) => {
  return (
    <Card hoverable style={styles.card}>
      <FolderFilled style={styles.icon} />
      <Text style={styles.text}>{name}</Text>
    </Card>
  );
};

const styles = {
  card: {
    borderRadius: "8px",
  } as CSSProperties,

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
