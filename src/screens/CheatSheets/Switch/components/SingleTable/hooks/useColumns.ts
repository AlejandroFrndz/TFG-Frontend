import type { ColumnsType } from "antd/lib/table";
import { ILexicalDomainTag } from "src/utils/api/resources/tags/lexicalDomain";
import { ISemanticRoleTag } from "src/utils/api/resources/tags/semanticRole";
import { SingleTableCheatSheetType } from "..";

const LEXICAL_DOMAIN_COLUMNS: ColumnsType<ILexicalDomainTag> = [
  {
    title: "Lexical Domain",
    dataIndex: "tag",
    key: "dom",
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
  },
  {
    title: "Definition",
    dataIndex: "definition",
    key: "def",
  },
];

export const useColumns: (
  type: SingleTableCheatSheetType
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
