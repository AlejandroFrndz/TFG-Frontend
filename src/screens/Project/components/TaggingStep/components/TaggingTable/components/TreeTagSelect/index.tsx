import { TreeSelect } from "antd";
import { CSSProperties } from "react";
import { ISemanticCategoryTag } from "src/utils/api/resources/tags/semanticCategory";
import { ITriple } from "src/utils/api/resources/triple";
import { TreeDataNode, useTreeDataTags } from "./hooks/useTreeDataTags";

interface Props {
  rawOptions: ISemanticCategoryTag[];
  triple: ITriple;
  entity: "noun1" | "noun2";
  updateTriple: (triple: ITriple) => void;
}

export const TreeTagSelect: React.FC<Props> = ({
  rawOptions,
  triple,
  entity,
  updateTriple,
}) => {
  const treeData: TreeDataNode[] = useTreeDataTags(rawOptions);

  const onSelect = (value: string) => {
    const updatedTriple: ITriple =
      entity === "noun1"
        ? { ...triple, noun1: { ...triple.noun1, sc: value } }
        : { ...triple, noun2: { ...triple.noun2, sc: value } };

    updateTriple(updatedTriple);
  };

  return (
    <TreeSelect
      treeData={treeData}
      style={styles.select}
      bordered={false}
      placeholder={"Select a tag"}
      value={triple[entity].sc ?? undefined}
      onChange={onSelect}
    />
  );
};

const styles = {
  select: {
    width: "100%",
  } as CSSProperties,
};
