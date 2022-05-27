import {
  DownOutlined,
  EditOutlined,
  FileTextOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Space, Tooltip } from "antd";

type ParameterTypeDropdownProps = {
  overlay: JSX.Element;
  selected: "string" | "file" | "any" | "unset";
  usingSyntAndFile: boolean;
};

export const ParameterTypeDropdown: React.FC<ParameterTypeDropdownProps> = ({
  overlay,
  selected,
  usingSyntAndFile,
}) => {
  let buttonText: string;
  let buttonIcon: JSX.Element;

  switch (selected) {
    case "unset":
      buttonText = "Type";
      buttonIcon = <DownOutlined />;
      break;
    case "any":
      buttonText = "Free";
      buttonIcon = <QuestionOutlined />;
      break;
    case "file":
      buttonText = "File";
      buttonIcon = <FileTextOutlined />;
      break;
    case "string":
      buttonText = "Manual";
      buttonIcon = <EditOutlined />;
      break;
  }

  return (
    <Dropdown overlay={overlay} trigger={["click"]}>
      {usingSyntAndFile ? (
        <Tooltip overlay={<p>Can't use files while using syntax</p>}>
          <Button
            style={{
              borderColor: "darkred",
              backgroundColor: "#df0606e1",
              color: "white",
            }}
          >
            <Space>
              {buttonText} {buttonIcon}
            </Space>
          </Button>
        </Tooltip>
      ) : (
        <Button>
          <Space>
            {buttonText} {buttonIcon}
          </Space>
        </Button>
      )}
    </Dropdown>
  );
};
