import { AppstoreOutlined, FolderFilled } from "@ant-design/icons";
import { Card, Typography } from "antd";
import { CSSProperties } from "react";

const { Text } = Typography;

type ProjectItemProps = {
  type: "file" | "folder";
  isDragging?: boolean;
  isOver?: boolean;
  isSelected?: boolean;
  name: string;
  isPreview?: boolean;
};

export const ProjectItem: React.FC<ProjectItemProps> = ({
  isDragging,
  isOver,
  isSelected,
  name,
  type,
  isPreview,
}) => {
  const renderTypeIcon = () => {
    switch (type) {
      case "file":
        return <AppstoreOutlined style={styles.icon} />;
      case "folder":
        return <FolderFilled style={styles.icon} />;
    }
  };

  return (
    <Card
      style={styles.card(!!isDragging, !!isOver, !!isSelected, !!isPreview)}
    >
      {renderTypeIcon()}
      <Text ellipsis style={styles.text}>
        {name}
      </Text>
    </Card>
  );
};

export const styles = {
  card: (
    isDragging: boolean,
    isOver: boolean,
    selected: boolean,
    isPreview: boolean
  ): CSSProperties => {
    if (isPreview) {
      return {
        backgroundColor: "#e8f0fe",
        width: "70%",
        borderRadius: "8px",
      };
    }
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
