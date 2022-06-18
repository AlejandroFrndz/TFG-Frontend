import { Table, Typography } from "antd";
import type { ColumnsType } from "antd/lib/table";
import _ from "lodash";
import type { CSSProperties } from "react";
import { IGroupedTriples } from "src/utils/api/resources/groupedTriples";

import "./styles.css";

interface Props {
  data: IGroupedTriples[];
}

const { Text } = Typography;

const COLUMNS: ColumnsType<IGroupedTriples> = [
  {
    title: "nº",
    dataIndex: "combinationNum",
    key: "combinationNum",
    width: "1%",
  },
  {
    title: "First Argument",
    className: "firstArgument",
    children: [
      {
        title: "Nouns",
        dataIndex: "args1",
        key: "args1",
        render: (_var, record) => ({
          props: {
            style: {
              backgroundColor: "#f7cbaf",
              borderColor: "#4b3e35",
            },
          },
          children: <Text strong>{record.args1.nouns}</Text>,
        }),
        className: "firstArgument borderColor",
      },
      {
        title: "Thematic Role",
        dataIndex: "args1 borderColor",
        key: "args1",
        render: (_var, record) => ({
          props: {
            style: {
              backgroundColor: "#f7cbaf",
              borderColor: "#4b3e35",
            },
          },
          children: (
            <Text strong>
              {record.args1.tr ? _.capitalize(record.args1.tr) : "-"}
            </Text>
          ),
        }),
        className: "firstArgument borderColor",
      },
      {
        title: "Semantic Category",
        dataIndex: "args1",
        key: "args1",
        render: (_var, record) => ({
          props: {
            style: {
              backgroundColor: "#f7cbaf",
              borderColor: "#4b3e35",
            },
          },
          children: (
            <Text strong>
              {record.args1.sc ? _.capitalize(record.args1.sc) : "-"}
            </Text>
          ),
        }),
        className: "firstArgument borderColor",
      },
    ],
  },
  {
    title: "Verb",
    className: "verb borderColor",
    children: [
      {
        title: "Verbs",
        dataIndex: "verbs",
        key: "verbs",
        render: (_var, record) => ({
          props: {
            style: {
              backgroundColor: "#fee59d",
              borderColor: "#4b3e35",
            },
          },
          children: <Text strong>{record.verbs.verbs}</Text>,
        }),
        className: "verb borderColor",
      },
      {
        title: "Lexical Domain",
        dataIndex: "verbs",
        key: "verbs",
        render: (_var, record) => ({
          props: {
            style: {
              backgroundColor: "#fee59d",
              borderColor: "#4b3e35",
            },
          },
          children: (
            <Text strong>
              {record.verbs.domain ? _.capitalize(record.verbs.domain) : "-"}
            </Text>
          ),
        }),
        className: "verb borderColor",
      },
    ],
  },
  {
    title: "Second Argument",
    className: "secondArgument borderColor",
    children: [
      {
        title: "Nouns",
        dataIndex: "args2",
        key: "args2",
        render: (_var, record) => ({
          props: {
            style: {
              backgroundColor: "#c7dfb6",
              borderColor: "#4b3e35",
            },
          },
          children: <Text strong>{record.args2.nouns}</Text>,
        }),
        className: "secondArgument borderColor",
      },
      {
        title: "Thematic Role",
        dataIndex: "args2",
        key: "args2",
        render: (_var, record) => ({
          props: {
            style: {
              backgroundColor: "#c7dfb6",
              borderColor: "#4b3e35",
            },
          },
          children: (
            <Text strong>
              {record.args2.tr ? _.capitalize(record.args2.tr) : "-"}
            </Text>
          ),
        }),
        className: "secondArgument borderColor",
      },
      {
        title: "Semantic Category",
        dataIndex: "args2",
        key: "args2",
        render: (_var, record) => ({
          props: {
            style: {
              backgroundColor: "#c7dfb6",
              borderColor: "#4b3e35",
            },
          },
          children: (
            <Text strong>
              {record.args2.sc ? _.capitalize(record.args2.sc) : "-"}
            </Text>
          ),
        }),
        className: "secondArgument borderColor",
      },
    ],
  },
];

export const GroupedTriplesTable: React.FC<Props> = ({ data }) => {
  return (
    <Table
      columns={COLUMNS}
      dataSource={data}
      pagination={{
        position: ["bottomCenter"],
        pageSize: 8,
        hideOnSinglePage: true,
      }}
      rowKey="combinationNum"
      style={styles.table}
    />
  );
};

const styles = {
  table: {
    padding: "10px",
    borderColor: "#4b3e35",
  } as CSSProperties,
};
