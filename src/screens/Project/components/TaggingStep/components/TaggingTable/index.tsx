import type { ColumnsType } from "antd/lib/table";
import Table from "antd/lib/table";
import React, { CSSProperties } from "react";
import { ITriple } from "src/utils/api/resources/triple";
import { TagSelect } from "../TagSelect";

import "./overrideCellPadding.css";

/*
  Temporal tag data. Delete once backend support is added
*/
const trTags = [
  "ZBvsZ5PyRE",
  "dqUVPGMRW3",
  "7p3TDPdhH3",
  "CxwWJ1DgwX",
  "MIEcGfGOqE",
  "WlYcZ3PJu0",
  "9X5YRysPdZ",
  "rAsEw1sO2k",
  "GfcD14Ez9U",
  "S8zPZKSGwf",
  "BY7HnwgiLg",
  "5LSD4FjROv",
  "AhmJI3MBuf",
  "4GoDn8s0Rw",
  "JXSNy3xQXg",
  "DZ8C8e61I3",
  "5ndBZyvHEc",
  "nwxq7JoufD",
  "Az0cpj3qfk",
  "MFvy1WAxFB",
  "q0Q9NNkJRa",
  "ejt3G8dW5y",
  "ye6xFyuTSR",
  "f0594tQCca",
  "ll8xwfuyNX",
  "IW6jF5OaLw",
  "yBuCrO58Wg",
  "NB3UL4uY5Y",
  "rNIaTnnwkk",
  "glaZhaLmKm",
  "zYKl2N2F4X",
  "rrGE2uMWKR",
  "g1rWRfMMr2",
  "NGJDpM8Wuc",
  "7lHciWke5P",
  "jj1N1lW5d9",
  "YjZSW8YQNn",
  "jVCIXNaMSD",
  "y1pzyXoaHN",
  "Eyfb9ONFdP",
  "g9nq0EODqV",
  "euLNMGNeBp",
  "qJtd0dZaZy",
  "w5kU7BTvOV",
  "mMthUcOcT0",
  "JkVtb9eTnZ",
  "oQZK3uYEwH",
  "vjSt5OO3ZL",
  "iU23VhWPqI",
  "TUxW4iLP0s",
  "j5ActGudK2",
  "1n4cwFe0KW",
  "H0x7gX1iZA",
  "uhjcEGaZmf",
  "xQ0gXdfUgs",
  "JcYU3tGNXx",
  "tpHqCpnnny",
  "Uebw2mJluf",
  "1OnHiDX6k4",
  "1T3mvZPG8u",
  "6q4ZC1KNPU",
  "9mlRIXBVpB",
  "qHrAdGYmoD",
  "i8pHbMqshA",
  "5e4mWlF2T2",
  "Va8JJaj1FL",
  "EJE1rf5MYo",
  "qznZ2lY6Fc",
  "cxydBXdI5X",
  "ZteRBoAHOa",
  "VKZUYLvh6H",
  "zF2F69tg9e",
  "MTOFRv5BFL",
  "vdhmq6h1ns",
];
const scTags = ["SC-Tag-1", "SC-Tag-2", "SC-Tag-3", "SC-Tag-4", "SC-Tag-5"];
const domTags = [
  "DOM-Tag-1",
  "DOM-Tag-2",
  "DOM-Tag-3",
  "DOM-Tag-4",
  "DOM-Tag-5",
];

/* --------------------------------------------------- */

interface Props {
  data: ITriple[];
  updateTriple: (triple: ITriple) => void;
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

export const TaggingTable: React.FC<Props> = ({ data, updateTriple }) => {
  const columns: ColumnsType<ITriple> = [
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
          title: "SC",
          dataIndex: "noun1",
          key: "sc1",
          render: (_, record) => (
            <TagSelect
              options={scTags}
              value={record.noun1.sc}
              triple={record}
              type={{ entity: "noun1", property: "sc" }}
              updateTriple={updateTriple}
            />
          ),
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
          render: (_, record) => (
            <TagSelect
              options={trTags}
              value={record.noun2.tr}
              triple={record}
              type={{ entity: "noun2", property: "tr" }}
              updateTriple={updateTriple}
            />
          ),
        },
        {
          title: "SC",
          dataIndex: "noun2",
          key: "sc2",
          render: (_, record) => (
            <TagSelect
              options={scTags}
              value={record.noun2.sc}
              triple={record}
              type={{ entity: "noun2", property: "sc" }}
              updateTriple={updateTriple}
            />
          ),
        },
      ],
    },
    {
      title: "Problem",
      children: [
        {
          dataIndex: "problem",
          key: "problem",
          render: (_, record) => (
            <TagSelect
              options={["error"]}
              value={record.problem}
              triple={record}
              problem
              updateTriple={updateTriple}
            />
          ),
        },
      ],
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
