import { FolderFilled } from "@ant-design/icons";
import { Card, Typography } from "antd";
import { CSSProperties } from "react";
import { styles as originalStyles } from "src/screens/Home/components/ProjectsContent/components/Folder";

type FolderPreviewProps = {
  name: string;
};

const { Text } = Typography;

export const FolderPreview: React.FC<FolderPreviewProps> = ({ name }) => {
  return (
    <Card
      style={{
        ...originalStyles.card(false, false, false),
        ...previewStyle,
      }}
    >
      <FolderFilled style={originalStyles.icon} />
      <Text style={originalStyles.text}>{name}</Text>
    </Card>
  );
};

const previewStyle: CSSProperties = {
  backgroundColor: "#e8f0fe",
  width: "70%",
};
