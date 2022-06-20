import { Select } from "antd";
import { IErrorTag } from "src/utils/api/resources/tags/error";
import { ITriple } from "src/utils/api/resources/triple";
import type { CSSProperties } from "react";
import _ from "lodash";

interface ErrorSelectProps {
  options: IErrorTag[];
  triple: ITriple;
  updateTriple: (triple: ITriple) => void;
}

const { Option } = Select;

export const ErrorSelect: React.FC<ErrorSelectProps> = ({
  options,
  triple,
  updateTriple,
}) => {
  const onSelect = (value: string) => {
    updateTriple({ ...triple, problem: value });
  };

  const onClear = () => {
    updateTriple({ ...triple, problem: null });
  };

  const mapCodeToReadable = (
    code: string | null
  ): string | undefined | null => {
    if (!code) {
      return null;
    }

    const numericCode = parseInt(code);

    if (_.isNaN(numericCode)) {
      return null;
    }

    return options.find((tag) => tag.errorCode === numericCode)?.humanReadable;
  };

  return (
    <Select
      allowClear
      placeholder="Select an error"
      bordered={false}
      value={mapCodeToReadable(triple.problem)}
      style={styles.select}
      onChange={onSelect}
      onClear={onClear}
    >
      {options.map((option) => (
        <Option value={option.errorCode.toString()} key={option.errorCode}>
          {option.humanReadable}
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
