import _ from "lodash";
import { ISemanticCategoryTag } from "src/utils/api/resources/tags/semanticCategory";

export type TreeDataNode = {
  value: string;
  title: string;
  children: TreeDataNode[];
  key: string;
};

const _mapTags = (tags: ISemanticCategoryTag[]): TreeDataNode[] => {
  const formattedTags: TreeDataNode[] = tags.map((tag) => {
    const node: TreeDataNode = {
      title: _.capitalize(tag.tag),
      value: tag.tag,
      children: [],
      key: tag.tag,
    };

    node.children = _mapTags(tag.subTags);

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
