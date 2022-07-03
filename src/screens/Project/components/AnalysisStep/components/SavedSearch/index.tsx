import {
  DeleteOutlined,
  FileTextOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import { Checkbox, Col, Row, Space, Typography } from "antd";
import moment from "moment";
import { CSSProperties, useState } from "react";
import { ISearch } from "src/utils/api/resources/search";

type SavedSearchesProps = {
  search: ISearch;
  deleteSearch: (searchId: string) => Promise<void>;
  index: number;
};

const { Text } = Typography;

export const SavedSearch: React.FC<SavedSearchesProps> = ({
  search,
  deleteSearch,
  index,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Col
      span={24}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Row
        justify="space-around"
        style={styles.mainRow(isHovering)}
        className="savedSearchRow"
      >
        <Col span={1} style={{ padding: "20px" }}>
          {index}
        </Col>
        <Col style={{ padding: "20px", wordBreak: "break-word" }} span={3}>
          <Space size="large">
            {search.noun1.type === "file" ? (
              <FileTextOutlined style={styles.fileIcon} />
            ) : null}
            {search.noun1.type === "any" ? <QuestionOutlined /> : null}
            {search.noun1.type === "any" ? null : (
              <span style={styles.valueSpan}>{search.noun1.value}</span>
            )}
          </Space>
        </Col>
        <Col span={3} style={{ padding: "20px", wordBreak: "break-word" }}>
          <Space size="large">
            {search.verb.type === "file" ? (
              <FileTextOutlined style={styles.fileIcon} />
            ) : null}
            {search.verb.type === "any" ? <QuestionOutlined /> : null}
            {search.verb.type === "any" ? null : (
              <span style={styles.valueSpan}>{search.verb.value}</span>
            )}
          </Space>
        </Col>
        <Col span={3} style={{ padding: "20px", wordBreak: "break-word" }}>
          <Space size="large">
            {search.noun2.type === "file" ? (
              <FileTextOutlined style={styles.fileIcon} />
            ) : null}
            {search.noun2.type === "any" ? <QuestionOutlined /> : null}
            {search.noun2.type === "any" ? null : (
              <span style={styles.valueSpan}>{search.noun2.value}</span>
            )}
          </Space>
        </Col>
        <Col span={3} style={{ padding: "20px" }}>
          <Space size="large">
            <Checkbox checked={search.isUsingSynt} />
          </Space>
        </Col>
        <Col span={3} style={{ wordBreak: "break-word", padding: "20px" }}>
          <Space size="large">
            <Text>{search.description}</Text>
          </Space>
        </Col>
        <Col span={3} style={{ padding: "20px" }}>
          <p>Saved At</p>
          <Text>{moment(search.createdAt).format("ddd, MMMM Do, h:mm A")}</Text>
        </Col>
        <Col span={2} style={{ padding: "20px" }}>
          <DeleteOutlined
            style={styles.deleteIcon}
            onClick={() => deleteSearch(search.id)}
          />
        </Col>
      </Row>
    </Col>
  );
};

const styles = {
  deleteIcon: {
    cursor: "pointer",
  } as CSSProperties,

  valueSpan: {
    wordWrap: "break-word",
  } as CSSProperties,

  fileIcon: {
    marginRight: "5px",
  } as CSSProperties,

  mainRow: (isHovering: boolean): CSSProperties => ({
    textAlign: "center",
    backgroundColor: isHovering ? "#f1f1f1" : undefined,
  }),
};
