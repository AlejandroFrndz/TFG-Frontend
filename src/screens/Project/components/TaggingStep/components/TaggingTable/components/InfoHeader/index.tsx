import { QuestionCircleOutlined } from "@ant-design/icons";
import { Row } from "antd";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

interface Props {
  type: "tr" | "dom" | "err" | "sc";
}

export const InfoHeader: React.FC<Props> = ({ type }) => {
  const [label, setLabel] = useState("");
  const [href, setHRef] = useState("");

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    switch (type) {
      case "tr":
        setLabel("Thematic Role");
        setHRef("/thematicRoles");
        break;
      case "dom":
        setLabel("Domain");
        setHRef("/lexicalDomains");
        break;
      case "err":
        setLabel("Problem");
        setHRef("/errors");
        break;
      case "sc":
        setLabel("Semantic Category");
        setHRef("/semanticCategories");
        break;
    }
  }, [setLabel, type]);

  return (
    <Row
      justify={type === "err" ? "space-evenly" : "space-between"}
      align="middle"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <span>{label}</span>
      <QuestionCircleOutlined
        style={{
          ...styles.icon,
          visibility: isHovering ? "visible" : "hidden",
        }}
        onClick={() =>
          window.open(`/tags${href}`, "_blank", "noopener,noreferrer")
        }
      />
    </Row>
  );
};

const styles = {
  icon: {
    color: "#7a7a7a",
    cursor: "pointer",
  } as CSSProperties,
};
