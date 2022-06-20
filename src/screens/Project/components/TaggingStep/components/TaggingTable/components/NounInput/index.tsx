import { EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Input } from "antd";
import type { CSSProperties } from "react";
import type React from "react";
import { ITriple } from "src/utils/api/resources/triple";
import { useValue } from "./hooks/useValue";

interface Props {
  entity: "noun1" | "noun2" | "verb";
  triple: ITriple;
  updateTriple: (triple: ITriple) => void;
}

export const NounInput: React.FC<Props> = ({
  entity,
  triple,
  updateTriple,
}) => {
  const [value, warningProps] = useValue(entity, triple);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    const updatedTriple: ITriple =
      entity === "verb"
        ? { ...triple, verb: { ...triple.verb, verb: newValue } }
        : entity === "noun1"
        ? { ...triple, noun1: { ...triple.noun1, noun: newValue } }
        : { ...triple, noun2: { ...triple.noun2, noun: newValue } };

    updateTriple(updatedTriple);
  };

  return (
    <Input
      value={value}
      style={styles.input}
      onChange={onChange}
      prefix={<ExclamationCircleOutlined />}
      suffix={<EditOutlined style={styles.suffix} />}
      {...warningProps}
    />
  );
};

const styles = {
  input: {
    width: "100%",
  } as CSSProperties,

  suffix: {
    color: "#cacaca",
  } as CSSProperties,
};
