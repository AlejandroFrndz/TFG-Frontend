import { Button, Col, Divider, Row, Space, Tree } from "antd";
import { useState } from "react";
import type { Key } from "react";
import { useTreeDataTags } from "src/shared/hooks/useTreeDataTag";
import { ISemanticCategoryTag } from "src/utils/api/resources/tags/semanticCategory";

interface Props {
  data: ISemanticCategoryTag[];
  handleDeleteTag(tag: string, type: "semanticCategories"): void;
}

export const TreeTags: React.FC<Props> = ({ data, handleDeleteTag }) => {
  const formattedData = useTreeDataTags(data);

  const [selectedTagName, setSelectedTagName] = useState<string | null>(null);

  const handleSelect = (keys: Key[]) => {
    const key = keys[0] as string | undefined;

    setSelectedTagName(key ? key : null);
  };

  const onDelete = () => {
    handleDeleteTag(selectedTagName as string, "semanticCategories");
    setSelectedTagName(null);
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
        <Divider type="vertical" style={{ height: "100%" }} />
      </Col>
      <Col span={14}>
        <Col>
          <Space direction="vertical" size="large">
            <Button
              type="primary"
              style={{ backgroundColor: "#f7a000", borderColor: "#f7a000" }}
            >
              Add 1st Level Tag
            </Button>
            <Col>
              <Space direction="vertical">
                <Button type="primary" disabled={selectedTagName === null}>
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
    </Row>
  );
};
