import { Button, Col, Divider, Input, Row, Space, Tooltip, Tree } from "antd";
import { useState } from "react";
import type { Key, CSSProperties } from "react";
import { useTreeDataTags } from "src/shared/hooks/useTreeDataTag";
import { ISemanticCategoryTag } from "src/utils/api/resources/tags/semanticCategory";

interface Props {
  data: ISemanticCategoryTag[];
  handleDeleteTag(tag: string, type: "semanticCategories"): void;
  handleAddTag(
    newTag: string,
    ancestor: string,
    type: "semanticCategories"
  ): boolean;
}

export const TreeTags: React.FC<Props> = ({
  data,
  handleDeleteTag,
  handleAddTag,
}) => {
  const formattedData = useTreeDataTags(data);

  const [selectedTagName, setSelectedTagName] = useState<string | null>(null);

  const [newTagName, setNewTagName] = useState("");

  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [tooltipText, setTooltipText] = useState("");

  const handleSelect = (keys: Key[]) => {
    const key = keys[0] as string | undefined;

    setSelectedTagName(key ? key : null);
  };

  const onDelete = () => {
    handleDeleteTag(selectedTagName as string, "semanticCategories");
    setSelectedTagName(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isTooltipVisible) {
      setIsTooltipVisible(false);
    }

    setNewTagName(e.target.value);
  };

  const onAddTag = () => {
    if (newTagName === "") {
      setTooltipText("The name of the category cannot be empty");
      setIsTooltipVisible(true);
      return;
    }

    const isTagDuplicated = handleAddTag(
      newTagName.toLowerCase(),
      selectedTagName ?? "",
      "semanticCategories"
    );

    if (isTagDuplicated) {
      setTooltipText("This tag already exists");
      setIsTooltipVisible(true);
    } else {
      setNewTagName("");
    }
  };

  return (
    <Row>
      <Col span={9}>
        <Tree
          treeData={formattedData}
          showLine={{ showLeafIcon: false }}
          onSelect={handleSelect}
        />
      </Col>
      <Col span={1}>
        <Divider type="vertical" style={styles.bigDivider} />
      </Col>
      <Col span={3}>
        <Col>
          <Space direction="vertical" size="large">
            <Button
              type="primary"
              style={
                selectedTagName === null
                  ? styles.active1stLevelButton
                  : styles.disabled1stLevelButton
              }
              disabled={selectedTagName !== null}
              onClick={onAddTag}
            >
              Add 1st Level Tag
            </Button>
            <Col>
              <Space direction="vertical">
                <Button
                  type="primary"
                  disabled={selectedTagName === null}
                  onClick={onAddTag}
                >
                  Add Child Tag
                </Button>
                <Button
                  type="primary"
                  danger
                  disabled={selectedTagName === null}
                  onClick={onDelete}
                >
                  Delete Tag
                </Button>
              </Space>
            </Col>
          </Space>
        </Col>
      </Col>
      <Col span={1}>
        <Divider type="vertical" style={styles.smallDivider} />
      </Col>
      <Col span={3}>
        <Row align="middle" style={styles.inputRow}>
          <Tooltip
            overlay={tooltipText}
            visible={isTooltipVisible}
            color="red"
            placement="right"
          >
            <Input
              placeholder="Semantic Category"
              value={newTagName}
              onChange={handleInputChange}
              style={isTooltipVisible ? { borderColor: "red" } : undefined}
            />
          </Tooltip>
        </Row>
      </Col>
    </Row>
  );
};

const styles = {
  inputRow: {
    height: "120px",
  } as CSSProperties,

  smallDivider: {
    height: "30%",
    marginTop: "70%",
  } as CSSProperties,

  bigDivider: {
    height: "100%",
  } as CSSProperties,

  active1stLevelButton: {
    backgroundColor: "#f7a000",
    borderColor: "#f7a000",
  } as CSSProperties,

  disabled1stLevelButton: {
    backgroundColor: "#F5F5F5",
    borderColor: "#D9D9D9",
  } as CSSProperties,
};
