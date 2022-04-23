import { Breadcrumb } from "antd";
import { Header } from "antd/lib/layout/layout";
import { CSSProperties } from "react";
import { ActiveFolderStruct } from "../..";
import { BreadcrumbLabel } from "../BreadcrumbLabel";

type ProjectsHeaderProps = {
  clampActiveFolders: (lenght: number) => void;
  activeFolders: ActiveFolderStruct[];
};

export const ProjectsHeader: React.FC<ProjectsHeaderProps> = ({
  clampActiveFolders,
  activeFolders,
}) => {
  return (
    <Header style={{ ...styles.whiteBackground, ...styles.header }}>
      <BreadcrumbLabel
        clampActiveFolders={clampActiveFolders}
        index={0}
        name="My Projects"
        id={null}
        key="null"
      />
      {activeFolders.map((folderStruct, indx) => (
        <>
          <Breadcrumb.Separator key={`Separator ${folderStruct.id}`}>
            &gt;
          </Breadcrumb.Separator>
          <BreadcrumbLabel
            clampActiveFolders={clampActiveFolders}
            index={indx + 1}
            name={folderStruct.name}
            id={folderStruct.id}
            key={folderStruct.id}
          />
        </>
      ))}
    </Header>
  );
};

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    overflowX: "auto",
    overflowY: "hidden",
  } as CSSProperties,

  whiteBackground: {
    backgroundColor: "#FFF",
  } as CSSProperties,
};
