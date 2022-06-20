import { ITriple } from "src/utils/api/resources/triple";

export const useValue = (
  entity: "noun1" | "noun2" | "verb",
  triple: ITriple
): string | undefined => {
  return entity === "verb"
    ? triple[entity].domain ?? undefined
    : triple[entity].tr ?? undefined;
};
