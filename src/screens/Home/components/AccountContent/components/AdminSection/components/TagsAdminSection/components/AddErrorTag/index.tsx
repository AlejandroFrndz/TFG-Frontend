import { Button, Input, InputNumber, Space, Tooltip } from "antd";
import { useState } from "react";
import type { CSSProperties } from "react";

interface Props {
  handleAddTag(
    scriptCode: number,
    description: string,
    type: "errors"
  ): boolean;
}

export const AddErrorTag: React.FC<Props> = ({ handleAddTag }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const [scriptCode, setScriptCode] = useState<number | null>(null);
  const [description, setDescription] = useState("");

  const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const onScriptCodeChange = (value: number) => {
    setScriptCode(value);
  };

  const onAddTag = () => {
    const isDuplicatedTag = handleAddTag(
      scriptCode as number,
      description,
      "errors"
    );

    if (isDuplicatedTag) {
      setIsTooltipVisible(true);
    } else {
      setScriptCode(null);
      setDescription("");
      setIsTooltipVisible(false);
    }
  };

  return (
    <Space size="large" style={styles.mainWrapper}>
      <Button
        type="primary"
        disabled={!scriptCode || description === ""}
        onClick={onAddTag}
      >
        Add Tag
      </Button>
      <Space>
        <Tooltip
          overlay="This code is already taken"
          visible={isTooltipVisible}
          trigger={[]}
          color="red"
          placement="top"
        >
          <InputNumber
            onChange={onScriptCodeChange}
            value={scriptCode ?? undefined}
            placeholder="Script Code"
            style={styles.codeInput}
          />
        </Tooltip>
        <Input
          placeholder="Description"
          onChange={onDescriptionChange}
          value={description}
          style={styles.descriptionInput}
        />
      </Space>
    </Space>
  );
};

const styles = {
  mainWrapper: {
    marginBottom: "30px",
  } as CSSProperties,

  codeInput: {
    width: "100px",
  } as CSSProperties,

  descriptionInput: {
    width: "300px",
  } as CSSProperties,
};
