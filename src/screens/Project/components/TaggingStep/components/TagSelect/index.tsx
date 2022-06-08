import { ExclamationOutlined, StopOutlined } from "@ant-design/icons";
import { Select } from "antd";
import type { DefaultOptionType } from "antd/lib/select";
import React, { CSSProperties } from "react";
import { ITriple } from "src/utils/api/resources/triple";

const { Option } = Select;

interface TagSelectProps {
  options: string[];
  value: string | null;
  triple: ITriple;
  type?:
    | { entity: "noun1" | "noun2"; property: "tr" | "sc" }
    | { entity: "verb"; property: "domain" };
  problem?: boolean;
  updateTriple: (triple: ITriple) => void;
  disabled?: boolean;
}

const filter = (
  input: string,
  option: DefaultOptionType | undefined
): boolean => {
  const lowerCaseInput = input.toLowerCase();
  const value = option?.value as string | undefined;

  if (!value) {
    return false;
  }

  const match = value.match(lowerCaseInput);

  return match === null ? false : true;
};

export const TagSelect: React.FC<TagSelectProps> = ({
  options,
  value,
  triple,
  type,
  problem,
  updateTriple,
  disabled,
}) => {
  const onSelect = (value: string) => {
    if (problem) {
      if (triple.problem !== value) {
        updateTriple({ ...triple, problem: value });
      }
    } else if (type) {
      if (type.entity === "verb") {
        if (triple.verb.domain !== value) {
          updateTriple({ ...triple, verb: { ...triple.verb, domain: value } });
        }
      } else if (triple[type.entity][type.property] !== value) {
        const tripleCopy = { ...triple };
        tripleCopy[type.entity][type.property] = value;

        updateTriple(tripleCopy);
      }
    }
  };

  const onClear = () => {
    updateTriple({ ...triple, problem: null });
  };

  return (
    <Select
      showSearch
      placeholder="Select a tag"
      bordered={false}
      style={styles.select}
      filterOption={filter}
      value={value}
      onChange={onSelect}
      allowClear={problem}
      onClear={onClear}
      disabled={disabled}
      suffixIcon={disabled ? <StopOutlined /> : undefined}
    >
      {options.map((option) => (
        <Option value={option.toLowerCase()} key={option}>
          {option}
        </Option>
      ))}
    </Select>
  );
};

const styles = {
  select: {
    width: "100%",
  } as CSSProperties,
};
