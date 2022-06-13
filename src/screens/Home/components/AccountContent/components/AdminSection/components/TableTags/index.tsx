import { Table } from "antd";
import { TableTagsType } from "src/shared/hooks/useColumns";
import { ILexicalDomainTag } from "src/utils/api/resources/tags/lexicalDomain";
import { ISemanticRoleTag } from "src/utils/api/resources/tags/semanticRole";
import { useColumnsWithDeleteAction } from "./hooks/useColumnsWithDeleteAction";

interface Props {
  type: TableTagsType;
  data: ISemanticRoleTag[] | ILexicalDomainTag[];
  handleDeleteTag(tag: string, type: "thematicRoles" | "lexicalDomains"): void;
}

export const TableTags: React.FC<Props> = ({ type, data, handleDeleteTag }) => {
  const columns = useColumnsWithDeleteAction(
    type,
    (record: ISemanticRoleTag | ILexicalDomainTag) =>
      handleDeleteTag(record.tag, type as "thematicRoles" | "lexicalDomains")
  );

  return (
    <Table
      columns={columns as any}
      dataSource={data as any}
      bordered
      pagination={{
        position: ["bottomCenter"],
        pageSize: 9,
        hideOnSinglePage: true,
      }}
    />
  );
};
