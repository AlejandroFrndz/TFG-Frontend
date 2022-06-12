import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { SingleTableCheatSheet } from "./components/SingleTable";
import { TreeCheatSheet } from "./components/Tree";

export const CheatSheetsSwitch: React.FC = () => {
  const { type } = useParams<{
    type: "thematicRoles" | "semanticCategories" | "lexicalDomains" | "errors";
  }>();
  const [element, setElement] = useState<JSX.Element>(<></>);

  useEffect(() => {
    switch (type) {
      case "thematicRoles":
        setElement(
          <SingleTableCheatSheet type={type} title="Thematic Roles" />
        );
        break;
      case "semanticCategories":
        setElement(<TreeCheatSheet />);
        break;
      case "lexicalDomains":
        setElement(
          <SingleTableCheatSheet type={type} title="Lexical Domains" />
        );
        break;
      case "errors":
        setElement(<>Errors</>);
        break;
      default:
        setElement(<Navigate to={"/tags"} />);
    }
  }, [type, setElement]);

  return element;
};
