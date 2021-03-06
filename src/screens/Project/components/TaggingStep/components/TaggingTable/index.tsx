import type { ColumnsType } from "antd/lib/table";
import Table from "antd/lib/table";
import React, { CSSProperties } from "react";
import { IErrorTag } from "src/utils/api/resources/tags/error";
import { ILexicalDomainTag } from "src/utils/api/resources/tags/lexicalDomain";
import { ISemanticCategoryTag } from "src/utils/api/resources/tags/semanticCategory";
import { ISemanticRoleTag } from "src/utils/api/resources/tags/semanticRole";
import { ITriple } from "src/utils/api/resources/triple";
import { ErrorSelect } from "./components/ErrorSelect";
import { ExpandedTables } from "./components/ExpandedTables";
import { InfoHeader } from "./components/InfoHeader";
import { NounInput } from "./components/NounInput";
import { TagSelect } from "./components/TagSelect";
import { TreeTagSelect } from "./components/TreeTagSelect";

import "./overrideCellPadding.css";

interface Props {
  data: ITriple[];
  updateTriple: (triple: ITriple) => void;
  trTags: ISemanticRoleTag[];
  domTags: ILexicalDomainTag[];
  scTags: ISemanticCategoryTag[];
  errorTags: IErrorTag[];
}

export const TaggingTable: React.FC<Props> = ({
  data,
  updateTriple,
  trTags,
  domTags,
  scTags,
  errorTags,
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
          render: (_, record) => (
            <NounInput
              triple={record}
              entity="noun1"
              updateTriple={updateTriple}
            />
          ),
          className: "overridePadding maxWidth",
        },
        {
          title: <InfoHeader type="tr" />,
          dataIndex: "noun1",
          key: "tr1",
          render: (_, record) => (
            <TagSelect
              entity="noun1"
              options={trTags}
              triple={record}
              updateTriple={updateTriple}
            />
          ),
          className: "overridePadding",
        },
        {
          title: <InfoHeader type="sc" />,
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
          render: (_, record) => (
            <NounInput
              triple={record}
              entity="verb"
              updateTriple={updateTriple}
            />
          ),
          className: "overridePadding maxWidth",
        },
        {
          title: <InfoHeader type="dom" />,
          dataIndex: "verb",
          key: "domain",
          render: (_, record) => (
            <TagSelect
              entity="verb"
              options={domTags}
              triple={record}
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
          render: (_, record) => (
            <NounInput
              triple={record}
              entity="noun2"
              updateTriple={updateTriple}
            />
          ),
          className: "overridePadding maxWidth",
        },
        {
          title: <InfoHeader type="tr" />,
          dataIndex: "noun2",
          key: "tr2",
          render: (_, record) => (
            <TagSelect
              entity="noun2"
              options={trTags}
              triple={record}
              updateTriple={updateTriple}
            />
          ),
          className: "overridePadding",
        },
        {
          title: <InfoHeader type="sc" />,
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
      title: <InfoHeader type="err" />,
      dataIndex: "problem",
      key: "problem",
      filters: [
        {
          text: "Hide errors",
          value: true,
        },
      ],
      render: (_, record) => (
        <ErrorSelect
          options={errorTags}
          triple={record}
          updateTriple={updateTriple}
        />
      ),
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
      pagination={{
        position: ["bottomCenter"],
      }}
      expandable={{
        expandedRowRender: (record) => <ExpandedTables record={record} />,
      }}
      rowKey="id"
    />
  );
};

const styles: Record<string, CSSProperties> = {
  taggingTable: {
    padding: "10px",
  },
};
