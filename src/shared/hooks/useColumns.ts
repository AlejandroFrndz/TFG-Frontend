import type { ColumnsType } from "antd/lib/table";
import _ from "lodash";
import { ILexicalDomainTag } from "src/utils/api/resources/tags/lexicalDomain";
import { ISemanticRoleTag } from "src/utils/api/resources/tags/semanticRole";

export type TableTagsType = "thematicRoles" | "lexicalDomains" | "errors";

const LEXICAL_DOMAIN_COLUMNS: ColumnsType<ILexicalDomainTag> = [
  {
    title: "Lexical Domain",
    dataIndex: "tag",
    key: "dom",
    render: (_unsued, record) => _.capitalize(record.tag),
  },
  {
    title: "Prototypical verb",
    dataIndex: "protoVerbs",
    key: "proto",
  },
];

const SEMANTIC_ROLES_COLUMNS: ColumnsType<ISemanticRoleTag> = [
  {
    title: "Semantic Role",
    dataIndex: "tag",
    key: "role",
    width: "10%",
    render: (_unsued, record) => _.capitalize(record.tag),
  },
  {
    title: "Definition",
    dataIndex: "definition",
    key: "def",
  },
];

export const useColumns: (
  type: TableTagsType
) => ColumnsType<ILexicalDomainTag> | ColumnsType<ISemanticRoleTag> = (
  type
) => {
  switch (type) {
    case "thematicRoles":
      return SEMANTIC_ROLES_COLUMNS;
    case "lexicalDomains":
      return LEXICAL_DOMAIN_COLUMNS;
    default:
      return [];
  }
};
