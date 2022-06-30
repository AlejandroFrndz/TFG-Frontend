import { Table, Typography } from "antd";
import type { ColumnGroupType, ColumnsType, ColumnType } from "antd/lib/table";
import _ from "lodash";
import { useEffect, useState } from "react";
import API from "src/utils/api";
import { IGroupedTriples } from "src/utils/api/resources/groupedTriples";
import { IProject } from "src/utils/api/resources/project";
import { Options } from "src/screens/Home/components/ConceptComparisonContent/index";

interface ProjectDisplayProps {
  selectedProject: IProject | null;
  options: Options;
}

const { Text } = Typography;

const COLUMNS: ColumnsType<IGroupedTriples> = [
  {
    title: "First Argument",
    children: [
      {
        title: "Nouns",
        dataIndex: "args1",
        key: "args1",
        render: (_var, record) => ({
          children: <Text strong>{record.args1.nouns}</Text>,
        }),
      },
      {
        title: "Thematic Role",
        dataIndex: "args1 borderColor",
        key: "args1",
        render: (_var, record) => ({
          children: (
            <Text strong>
              {record.args1.tr ? _.capitalize(record.args1.tr) : "-"}
            </Text>
          ),
        }),
      },
      {
        title: "Semantic Category",
        dataIndex: "args1",
        key: "args1",
        render: (_var, record) => ({
          children: (
            <Text strong>
              {record.args1.sc ? _.capitalize(record.args1.sc) : "-"}
            </Text>
          ),
        }),
      },
    ],
  },
  {
    title: "Verb",
    children: [
      {
        title: "Verbs",
        dataIndex: "verbs",
        key: "verbs",
        render: (_var, record) => ({
          children: <Text strong>{record.verbs.verbs}</Text>,
        }),
      },
      {
        title: "Lexical Domain",
        dataIndex: "verbs",
        key: "verbs",
        render: (_var, record) => ({
          children: (
            <Text strong>
              {record.verbs.domain ? _.capitalize(record.verbs.domain) : "-"}
            </Text>
          ),
        }),
      },
    ],
  },
  {
    title: "Second Argument",
    children: [
      {
        title: "Nouns",
        dataIndex: "args2",
        key: "args2",
        render: (_var, record) => ({
          children: <Text strong>{record.args2.nouns}</Text>,
        }),
      },
      {
        title: "Thematic Role",
        dataIndex: "args2",
        key: "args2",
        render: (_var, record) => ({
          children: (
            <Text strong>
              {record.args2.tr ? _.capitalize(record.args2.tr) : "-"}
            </Text>
          ),
        }),
      },
      {
        title: "Semantic Category",
        dataIndex: "args2",
        key: "args2",
        render: (_var, record) => ({
          children: (
            <Text strong>
              {record.args2.sc ? _.capitalize(record.args2.sc) : "-"}
            </Text>
          ),
        }),
      },
    ],
  },
];

const ColumnsNoTags: ColumnsType<IGroupedTriples> = [
  {
    title: "First Argument",
    children: [
      {
        title: "Nouns",
        dataIndex: "args1",
        key: "args1",
        render: (_var, record) => ({
          children: <Text strong>{record.args1.nouns}</Text>,
        }),
      },
    ],
  },
  {
    title: "Verb",
    children: [
      {
        title: "Verbs",
        dataIndex: "verbs",
        key: "verbs",
        render: (_var, record) => ({
          children: <Text strong>{record.verbs.verbs}</Text>,
        }),
      },
    ],
  },
  {
    title: "Second Argument",
    children: [
      {
        title: "Nouns",
        dataIndex: "args2",
        key: "args2",
        render: (_var, record) => ({
          children: <Text strong>{record.args2.nouns}</Text>,
        }),
      },
    ],
  },
];

export const ProjectDisplay: React.FC<ProjectDisplayProps> = ({
  selectedProject,
  options,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<IGroupedTriples[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const response = await API.groupedTriples.getAllForProject(
        (selectedProject as IProject).id
      );

      if (response.isSuccess()) {
        setData(response.value);
      } else {
        setIsError(true);
      }

      setIsLoading(false);
    };

    if (selectedProject) {
      fetchData();
    } else {
      setData(null);
    }
  }, [selectedProject]);

  const filterColumns = (
    group: ColumnGroupType<IGroupedTriples> | ColumnType<IGroupedTriples>
  ): boolean => {
    switch (group.title) {
      case "First Argument":
        return options.showNoun1;
      case "Verb":
        return options.showVerb;
      case "Second Argument":
        return options.showNoun2;
      default:
        return false;
    }
  };

  if (isError) {
    return <p>Something went wrong retrieving project data</p>;
  }

  return (
    <Table
      loading={selectedProject ? isLoading : false}
      columns={
        options.showTags
          ? COLUMNS.filter(filterColumns)
          : ColumnsNoTags.filter(filterColumns)
      }
      dataSource={data ?? undefined}
      scroll={{ x: "auto" }}
      style={{ padding: "10px" }}
      pagination={{ position: ["bottomCenter"] }}
    ></Table>
  );
};
