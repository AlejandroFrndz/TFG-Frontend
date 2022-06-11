import type { ColumnsType } from "antd/lib/table";
import Table from "antd/lib/table";
import React, { CSSProperties } from "react";
import { ILexicalDomainTag } from "src/utils/api/resources/tags/lexicalDomain";
import { ISemanticCategoryTag } from "src/utils/api/resources/tags/semanticCategory";
import { ISemanticRoleTag } from "src/utils/api/resources/tags/semanticRole";
import { ITriple } from "src/utils/api/resources/triple";
import { TagSelect } from "./components/TagSelect";
import { TreeTagSelect } from "./components/TreeTagSelect";

import "./overrideCellPadding.css";

interface Props {
  data: ITriple[];
  updateTriple: (triple: ITriple) => void;
  trTags: ISemanticRoleTag[];
  domTags: ILexicalDomainTag[];
  scTags: ISemanticCategoryTag[];
}

interface ExpandedProps {
  record: ITriple;
}

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
      style={styles.expandTable}
      rowKey="id"
    />
    <Table
      columns={EXPANDED_METADATA_COLUMNS}
      dataSource={[record]}
      pagination={{ position: [] }}
      size="small"
      style={styles.expandTable}
      rowKey="id"
    />
  </>
);

export const TaggingTable: React.FC<Props> = ({
  data,
  updateTriple,
  trTags,
  domTags,
  scTags,
}) => {
  const columns: ColumnsType<ITriple> = [
    {
      title: "Id",
      dataIndex: "fileId",
      key: "id",
      width: "1%",
    },
    {
      title: "First Argument",
      children: [
        {
          title: "Noun",
          dataIndex: "noun1",
          key: "noun1",
          render: (_, record) => record.noun1.noun,
        },
        {
          title: "Thematic Role",
          dataIndex: "noun1",
          key: "tr1",
          render: (_, record) => (
            <TagSelect
              options={trTags}
              value={record.noun1.tr}
              triple={record}
              type={{ entity: "noun1", property: "tr" }}
              updateTriple={updateTriple}
            />
          ),
          className: "overridePadding",
        },
        {
          title: "Semantic Category",
          dataIndex: "noun1",
          key: "sc1",
          render: (_, record) => (
            <TreeTagSelect
              rawOptions={scTags}
              triple={record}
              entity="noun1"
              updateTriple={updateTriple}
            />
          ),
          className: "overridePadding",
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
          render: (_, record) => (
            <TagSelect
              options={domTags}
              value={record.verb.domain}
              triple={record}
              type={{ entity: "verb", property: "domain" }}
              updateTriple={updateTriple}
            />
          ),
          className: "overridePadding",
        },
      ],
    },
    {
      title: "Second Argument",
      children: [
        {
          title: "Noun",
          dataIndex: "noun2",
          key: "noun2",
          render: (_, record) => record.noun2.noun,
        },
        {
          title: "Thematic Role",
          dataIndex: "noun2",
          key: "tr2",
          render: (_, record) => (
            <TagSelect
              options={trTags}
              value={record.noun2.tr}
              triple={record}
              type={{ entity: "noun2", property: "tr" }}
              updateTriple={updateTriple}
            />
          ),
          className: "overridePadding",
        },
        {
          title: "Semantic Category",
          dataIndex: "noun2",
          key: "sc2",
          render: (_, record) => (
            <TreeTagSelect
              rawOptions={scTags}
              triple={record}
              entity="noun2"
              updateTriple={updateTriple}
            />
          ),
          className: "overridePadding",
        },
      ],
    },
    {
      title: "Problem",
      dataIndex: "problem",
      key: "problem",
      filters: [
        {
          text: "Hide errors",
          value: true,
        },
      ],
      // render: (_, record) => (
      //   <TagSelect
      //     options={["error"]}
      //     value={record.problem}
      //     triple={record}
      //     problem
      //     updateTriple={updateTriple}
      //   />
      // ),
      onFilter: (value, record) => (value ? record.problem === null : true),
      className: "overridePadding",
    },
  ];

  return (
    <Table
      bordered
      columns={columns}
      dataSource={data}
      style={styles.taggingTable}
      pagination={{ position: ["bottomCenter"], pageSize: 8 }}
      expandable={{
        expandedRowRender: (record) => <ExpandedTaggingTable record={record} />,
      }}
      rowKey="id"
    />
  );
};

const styles: Record<string, CSSProperties> = {
  taggingTable: {
    padding: "10px",
  },
  expandTable: {
    maxWidth: "95vw",
  },
};
