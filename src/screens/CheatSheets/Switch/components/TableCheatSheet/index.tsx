import { Table } from "antd";
import type { CSSProperties } from "react";
import { ILexicalDomainTag } from "src/utils/api/resources/tags/lexicalDomain";
import { ISemanticRoleTag } from "src/utils/api/resources/tags/semanticRole";
import { useColumns } from "./hooks/useColumns";

interface Props {
  type: TableCheatSheetType;
  data: ILexicalDomainTag[] | ISemanticRoleTag[];
}

export type TableCheatSheetType = "thematicRoles" | "lexicalDomains" | "errors";

export const TableCheatSheet: React.FC<Props> = ({ type, data }) => {
  const columns = useColumns(type);

  return (
    <Table
      columns={columns as any}
      dataSource={data as any}
      style={styles.table}
      bordered
      pagination={{
        position: ["bottomCenter"],
        pageSize: 9,
        hideOnSinglePage: true,
      }}
    />
  );
};

const styles = {
  table: {
    padding: "30px",
    paddingTop: 0,
  } as CSSProperties,
};
