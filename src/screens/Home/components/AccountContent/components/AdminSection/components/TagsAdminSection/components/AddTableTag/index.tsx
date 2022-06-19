import { Button, Input, Space, Tooltip } from "antd";
import React, { useState } from "react";
import type { CSSProperties } from "react";

interface Props {
  type: "thematicRoles" | "lexicalDomains";
  handleAddTag: (
    mainField: string,
    secondaryField: string,
    type: "thematicRoles" | "lexicalDomains"
  ) => boolean;
}

export const AddTableTag: React.FC<Props> = ({ type, handleAddTag }) => {
  const [mainField, setMainField] = useState("");
  const [secondaryField, setSecondaryField] = useState("");

  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const onMainFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isTooltipVisible) {
      setIsTooltipVisible(false);
    }
    setMainField(e.target.value);
  };

  const onSecondaryFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecondaryField(e.target.value);
  };

  const onAddTag = () => {
    const isDuplicatedTag = handleAddTag(
      mainField.toLowerCase(),
      secondaryField,
      type
    );

    if (isDuplicatedTag) {
      setIsTooltipVisible(true);
    } else {
      setMainField("");
      setSecondaryField("");
      setIsTooltipVisible(false);
    }
  };

  return (
    <Space size="large" style={styles.mainWrapper}>
      <Button type="primary" disabled={mainField === ""} onClick={onAddTag}>
        Add Tag
      </Button>
      <Space>
        <Tooltip
          overlay="This tag already exists"
          visible={isTooltipVisible}
          trigger={[]}
          color="red"
          placement="top"
        >
          <Input
            placeholder={
              type === "thematicRoles" ? "Semantic Role" : "Lexical Domain"
            }
            onChange={onMainFieldChange}
            style={isTooltipVisible ? { borderColor: "red" } : undefined}
            value={mainField}
          />
        </Tooltip>
        <Input
          placeholder={`${
            type === "thematicRoles" ? "Definition" : "Prototypical Verb"
          } (optional)`}
          style={styles.optionalInput(type)}
          onChange={onSecondaryFieldChange}
          value={secondaryField}
        />
      </Space>
    </Space>
  );
};

const styles = {
  mainWrapper: {
    marginBottom: "30px",
  } as CSSProperties,

  optionalInput: (type: "thematicRoles" | "lexicalDomains"): CSSProperties => ({
    width: type === "lexicalDomains" ? "300px" : "1000px",
  }),
};
