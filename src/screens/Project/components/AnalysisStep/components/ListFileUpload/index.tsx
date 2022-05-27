import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import { RcFile } from "antd/lib/upload";

type ListFileUploadProps = {
  handleUploadFile: (file: RcFile) => void;
  handleRemoveFile: () => void;
  usingSyntAndFile: boolean;
};

export const ListFileUpload: React.FC<ListFileUploadProps> = ({
  handleUploadFile,
  handleRemoveFile,
  usingSyntAndFile,
}) => {
  const beforeUpload = (file: RcFile): boolean => {
    handleUploadFile(file);
    return false;
  };

  const onRemove = (): boolean => {
    handleRemoveFile();
    return true;
  };

  return (
    <Upload
      beforeUpload={beforeUpload}
      onRemove={onRemove}
      maxCount={1}
      disabled={usingSyntAndFile}
    >
      <Button icon={<UploadOutlined />} disabled={usingSyntAndFile}>
        Select File
      </Button>
    </Upload>
  );
};
