import type { ColumnsType } from "antd/lib/table";
import Table from "antd/lib/table";
import React from "react";
import { ITriple } from "src/utils/api/resources/triple";
import { TagSelect } from "../TagSelect";

import "./overrideCellPadding.css";

interface Props {
  data: ITriple[];
}

interface ExpandedProps {
  record: ITriple;
}

const COLUMNS: ColumnsType<ITriple> = [
  {
    title: "Id",
    dataIndex: "fileId",
    key: "id",
    width: "1%",
  },
  {
    title: "First Noun",
    children: [
      {
        title: "Noun",
        dataIndex: "noun1",
        key: "noun1",
        render: (_, record) => record.noun1.noun,
      },
      {
        title: "TR",
        dataIndex: "noun1",
        key: "tr1",
        render: (_, record) => <TagSelect />,
        className: "overridePadding",
      },
      {
        title: "SC",
        dataIndex: "noun1",
        key: "sc1",
        render: (_, record) => <TagSelect />,
      },
    ],
  },
  {
    title: "Verb",
    children: [
      {
        title: "Verb",
        dataIndex: "verb",
        key: "verb",
        render: (_, record) => record.verb.verb,
      },
      {
        title: "Domain",
        dataIndex: "verb",
        key: "domain",
        render: (_, record) => <TagSelect />,
      },
    ],
  },
  {
    title: "Second Noun",
    children: [
      {
        title: "Noun",
        dataIndex: "noun2",
        key: "noun2",
        render: (_, record) => record.noun2.noun,
      },
      {
        title: "TR",
        dataIndex: "noun2",
        key: "tr2",
        render: (_, record) => <TagSelect />,
      },
      {
        title: "SC",
        dataIndex: "noun2",
        key: "sc2",
        render: (_, record) => <TagSelect />,
      },
    ],
  },
  {
    title: "Problem",
    children: [
      {
        dataIndex: "problem",
        key: "problem",
        render: (_, record) => <TagSelect />,
      },
    ],
  },
];

const EXPANDED_METADATA_COLUMNS: ColumnsType<ITriple> = [
  {
    title: "Metadata",
    children: [
      {
        title: "PMI",
        dataIndex: "pmiCorpus",
        key: "pmi",
      },
      {
        title: "Dice",
        dataIndex: "diceCorpus",
        key: "dice",
      },
      {
        title: "T",
        dataIndex: "tCorpus",
        key: "t",
      },
    ],
  },
];

const EXPANDED_CORPUS_COLUMNS: ColumnsType<ITriple> = [
  {
    title: "Corpus",
    children: [
      {
        title: "Examples",
        dataIndex: "examples",
        key: "examples",
      },
      {
        title: "Occurs",
        dataIndex: "occurs",
        key: "occurs",
      },
      {
        title: "Sources",
        dataIndex: "sources",
        key: "sources",
      },
    ],
  },
];

const ExpandedTaggingTable: React.FC<ExpandedProps> = ({ record }) => (
  <>
    <Table
      columns={EXPANDED_CORPUS_COLUMNS}
      dataSource={[record]}
      pagination={{ position: [] }}
      size="small"
      style={{ maxWidth: "95vw" }}
    />
    <Table
      columns={EXPANDED_METADATA_COLUMNS}
      dataSource={[record]}
      pagination={{ position: [] }}
      size="small"
      style={{ maxWidth: "95vw" }}
    />
  </>
);

export const TaggingTable: React.FC<Props> = ({ data }) => {
  return (
    <Table
      bordered
      columns={COLUMNS}
      dataSource={data}
      scroll={{ x: "max-content" }}
      style={{ padding: "10px" }}
      pagination={{ position: ["bottomCenter"], pageSize: 8 }}
      expandable={{
        expandedRowRender: (record) => <ExpandedTaggingTable record={record} />,
      }}
      rowKey="id"
    />
  );
};
