import { QuestionCircleOutlined } from "@ant-design/icons";
import { Row } from "antd";
import { CSSProperties, useEffect, useState } from "react";

interface Props {
  type: "tr" | "dom" | "err";
}

export const InfoHeader: React.FC<Props> = ({ type }) => {
  const [label, setLabel] = useState("");

  useEffect(() => {
    switch (type) {
      case "tr":
        setLabel("Thematic Role");
        break;
      case "dom":
        setLabel("Domain");
        break;
      case "err":
        setLabel("Problem");
        break;
    }
  }, [setLabel, type]);

  return (
    <Row
      justify={type === "err" ? "space-evenly" : "space-between"}
      align="middle"
    >
      <span>{label}</span>
      <QuestionCircleOutlined style={styles.icon} />
    </Row>
  );
};

const styles = {
  icon: {
    color: "#7a7a7a",
    cursor: "pointer",
  } as CSSProperties,
};
