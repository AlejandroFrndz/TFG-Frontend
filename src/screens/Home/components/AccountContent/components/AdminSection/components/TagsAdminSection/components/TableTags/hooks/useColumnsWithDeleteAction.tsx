import { DeleteOutlined } from "@ant-design/icons";
import { Row } from "antd";
import type { ColumnsType, ColumnType } from "antd/lib/table";
import type { CSSProperties } from "react";
import { TableTagsType, useColumns } from "src/shared/hooks/useColumns";
import { ILexicalDomainTag } from "src/utils/api/resources/tags/lexicalDomain";
import { ISemanticRoleTag } from "src/utils/api/resources/tags/semanticRole";

export const useColumnsWithDeleteAction: (
  type: TableTagsType,
  callback: (record: ILexicalDomainTag | ISemanticRoleTag) => void
) => ColumnsType<ILexicalDomainTag> | ColumnsType<ISemanticRoleTag> = (
  type,
  callback
) => {
  const baseColumns = useColumns(type);

  const actionColumn:
    | ColumnType<ILexicalDomainTag>
    | ColumnType<ISemanticRoleTag> = {
    title: "Delete",
    key: "delete",
    render: (_: any, record: ILexicalDomainTag | ISemanticRoleTag) => (
      <Row justify="center">
        <DeleteOutlined
          onClick={() => callback(record)}
          style={styles.actionIcon}
        />
      </Row>
    ),
    width: "5%",
  };

  return [actionColumn, ...baseColumns] as
    | ColumnsType<ILexicalDomainTag>
    | ColumnsType<ISemanticRoleTag>;
};

const styles = {
  actionIcon: {
    cursor: "pointer",
  } as CSSProperties,
};
