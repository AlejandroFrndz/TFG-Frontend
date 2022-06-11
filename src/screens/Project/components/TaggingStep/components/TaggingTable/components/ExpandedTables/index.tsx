import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Row, Space, Tooltip } from "antd";
import type { ColumnsType } from "antd/lib/table";
import Table from "antd/lib/table";
import { CSSProperties, useState } from "react";
import { ITriple } from "src/utils/api/resources/triple";

interface ExpandedProps {
  record: ITriple;
}

const METADATA_COLUMNS: ColumnsType<ITriple> = [
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

export const ExpandedTables: React.FC<ExpandedProps> = ({ record }) => {
  const [showMetadata, setShowMetadata] = useState(false);

  const toggleMetadata = () => setShowMetadata((show) => !show);

  const header = (
    <Row justify="center" align="middle">
      <Space size={"large"}>
        <span>Corpus</span>
        {showMetadata ? (
          <EyeOutlined onClick={toggleMetadata} />
        ) : (
          <EyeInvisibleOutlined onClick={toggleMetadata} />
        )}
      </Space>
    </Row>
  );

  const CORPUS_COLUMNS: ColumnsType<ITriple> = [
    {
      title: header,
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
  return (
    <>
      <Table
        columns={CORPUS_COLUMNS}
        dataSource={[record]}
        pagination={{ position: [] }}
        size="small"
        style={styles.expandTable}
        rowKey="id"
      />
      {showMetadata && (
        <Table
          columns={METADATA_COLUMNS}
          dataSource={[record]}
          pagination={{ position: [] }}
          size="small"
          style={styles.expandTable}
          rowKey="id"
        />
      )}
    </>
  );
};

const styles = {
  expandTable: {
    maxWidth: "95vw",
  } as CSSProperties,
};
