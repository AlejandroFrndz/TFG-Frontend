import { DeleteOutlined } from "@ant-design/icons";
import { Row } from "antd";
import type { ColumnsType } from "antd/lib/table";
import type { CSSProperties } from "react";
import Table from "antd/lib/table";
import { IErrorTag } from "src/utils/api/resources/tags/error";

interface Props {
  data: IErrorTag[];
  handleDeleteTag(tag: string, type: "errors"): void;
}

export const ErrorTagsAdminTable: React.FC<Props> = ({
  data,
  handleDeleteTag,
}) => {
  const columns: ColumnsType<IErrorTag> = [
    {
      title: "Delete",
      key: "delete",
      render: (_, record) => (
        <Row justify="center">
          <DeleteOutlined
            onClick={() =>
              handleDeleteTag(record.errorCode.toString(), "errors")
            }
            style={styles.actionIcon}
          />
        </Row>
      ),
      width: "5%",
    },
    {
      title: "Script Code",
      dataIndex: "errorCode",
      key: "errorCode",
      width: "10%",
    },
    {
      title: "Description",
      dataIndex: "humanReadable",
      key: "humanReadable",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
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
  actionIcon: {
    cursor: "pointer",
  } as CSSProperties,
};
