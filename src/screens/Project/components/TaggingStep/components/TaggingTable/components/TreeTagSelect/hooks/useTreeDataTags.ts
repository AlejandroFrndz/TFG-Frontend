import _ from "lodash";
import { ISemanticCategoryTag } from "src/utils/api/resources/tags/semanticCategory";

export type TreeDataNode = {
  value: string;
  title: string;
  children: TreeDataNode[];
};

const _mapTags = (
  tags: ISemanticCategoryTag[],
  ancestorValue?: string
): TreeDataNode[] => {
  const formattedTags: TreeDataNode[] = tags.map((tag) => {
    const node: TreeDataNode = {
      title: _.capitalize(tag.tag),
      value: tag.tag,
      children: [],
    };

    node.children = _mapTags(tag.subTags, node.value);

    return node;
  });

  return formattedTags;
};

export const useTreeDataTags = (
  rawTags: ISemanticCategoryTag[]
): TreeDataNode[] => {
  const treeData: TreeDataNode[] = _mapTags(rawTags);

  return treeData;
};
