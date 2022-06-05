import {
  DeleteOutlined,
  FileTextOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import { Checkbox, Col, Row } from "antd";
import { CSSProperties, useState } from "react";
import { ISearch } from "src/utils/api/resources/search";

type SavedSearchesProps = {
  search: ISearch;
  deleteSearch: (searchId: string) => Promise<void>;
};

export const SavedSearch: React.FC<SavedSearchesProps> = ({
  search,
  deleteSearch,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Col
      span={24}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Row
        justify="center"
        align="middle"
        style={styles.mainRow(isHovering)}
        className="savedSearchRow"
      >
        <Col span={5} style={{ padding: "20px" }}>
          {search.noun1.type === "file" ? (
            <FileTextOutlined style={styles.fileIcon} />
          ) : null}
          {search.noun1.type === "any" ? <QuestionOutlined /> : null}
          {search.noun1.type === "any" ? null : (
            <span style={styles.valueSpan}>{search.noun1.value}</span>
          )}
        </Col>
        <Col span={5}>
          {search.verb.type === "file" ? (
            <FileTextOutlined style={styles.fileIcon} />
          ) : null}
          {search.verb.type === "any" ? <QuestionOutlined /> : null}
          {search.verb.type === "any" ? null : (
            <span style={styles.valueSpan}>{search.verb.value}</span>
          )}
        </Col>
        <Col span={5}>
          {search.noun2.type === "file" ? (
            <FileTextOutlined style={styles.fileIcon} />
          ) : null}
          {search.noun2.type === "any" ? <QuestionOutlined /> : null}
          {search.noun2.type === "any" ? null : (
            <span style={styles.valueSpan}>{search.noun2.value}</span>
          )}
        </Col>
        <Col span={5}>
          <Checkbox checked={search.isUsingSynt} />
        </Col>
        <Col span={3}>
          <DeleteOutlined
            style={styles.deleteIcon(isHovering)}
            onClick={() => deleteSearch(search.id)}
          />
        </Col>
      </Row>
    </Col>
  );
};

const styles = {
  deleteIcon: (isHovering: boolean): CSSProperties => ({
    visibility: isHovering ? "visible" : "hidden",
    cursor: "pointer",
  }),

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
