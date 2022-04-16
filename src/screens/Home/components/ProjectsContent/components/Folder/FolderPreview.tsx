import { FolderFilled } from "@ant-design/icons";
import { Card, Typography } from "antd";
import { styles as originalStyles } from ".";

type FolderPreviewProps = {
  name: string;
};

const { Text } = Typography;

export const FolderPreview: React.FC<FolderPreviewProps> = ({ name }) => {
  return (
    <Card style={{ ...originalStyles.card(false), backgroundColor: "#e8f0fe" }}>
      <FolderFilled style={originalStyles.icon} />
      <Text style={originalStyles.text}>{name}</Text>
    </Card>
  );
};
