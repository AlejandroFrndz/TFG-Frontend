import { ITriple } from "src/utils/api/resources/triple";

type WarningProps = {
  status: "warning" | undefined;
  bordered: boolean;
  placeholder: string;
  className: string;
};

export const useValue = (
  entity: "noun1" | "noun2" | "verb",
  triple: ITriple
): readonly [string, WarningProps] => {
  const value = entity === "verb" ? triple[entity].verb : triple[entity].noun;

  const warningProps: WarningProps =
    value === ""
      ? {
          status: "warning",
          bordered: true,
          placeholder: "Empty Field",
          className: "",
        }
      : {
          status: undefined,
          bordered: false,
          placeholder: "",
          className: "hidePrefix",
        };

  return [value, warningProps];
};
