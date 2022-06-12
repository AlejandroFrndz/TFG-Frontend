import { Divider, Tree } from "antd";
import type { CSSProperties } from "react";
import { useTreeDataTags } from "src/shared/hooks/useTreeDataTag";
import { ISemanticCategoryTag } from "src/utils/api/resources/tags/semanticCategory";

interface Props {
  data: ISemanticCategoryTag[];
}

export const TreeCheatSheet: React.FC<Props> = ({ data: rawData }) => {
  const formattedData = useTreeDataTags(rawData);

  return (
    <>
      <Divider />

      <div style={styles.tree}>
        <Tree
          treeData={formattedData}
          showLine={{ showLeafIcon: false }}
          selectedKeys={[]}
        />
      </div>
    </>
  );
};

const styles = {
  tree: {
    marginLeft: "100px",
    justifyContent: "space-evenly",
  } as CSSProperties,
};
