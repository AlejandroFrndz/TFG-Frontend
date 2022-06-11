import { Select } from "antd";
import type { CSSProperties } from "react";
import type { DefaultOptionType } from "antd/lib/select";
import { ILexicalDomainTag } from "src/utils/api/resources/tags/lexicalDomain";
import { ITriple } from "src/utils/api/resources/triple";
import { ISemanticRoleTag } from "src/utils/api/resources/tags/semanticRole";
import { useValue } from "./hooks/useValue";

interface TagSelectProps {
  options: ILexicalDomainTag[] | ISemanticRoleTag[];
  triple: ITriple;
  entity: "noun1" | "noun2" | "verb";
  updateTriple: (triple: ITriple) => void;
}

const { Option } = Select;

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
  triple,
  entity,
  updateTriple,
}) => {
  const value = useValue(entity, triple);

  const onSelect = (value: string) => {
    const updatedTriple: ITriple =
      entity === "verb"
        ? { ...triple, verb: { ...triple.verb, domain: value } }
        : entity === "noun1"
        ? { ...triple, noun1: { ...triple.noun1, tr: value } }
        : { ...triple, noun2: { ...triple.noun2, tr: value } };

    updateTriple(updatedTriple);
  };

  return (
    <Select
      showSearch
      placeholder="Select a tag"
      bordered={false}
      style={styles.select}
      value={value}
      filterOption={filter}
      onChange={onSelect}
    >
      {options.map((option) => (
        <Option value={option.tag} key={option.tag}>
          {option.tag}
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
