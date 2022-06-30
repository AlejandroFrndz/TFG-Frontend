import { Row, Select, Space } from "antd";
import React from "react";
import ReactCountryFlag from "react-country-flag";
import { IProject, ProjectLanguage } from "src/utils/api/resources/project";

interface ProjectSelectorProps {
  allProjects: IProject[];
  selectedProject: IProject | null;
  setSelectedProject: (project: IProject | null) => void;
}

const { Option } = Select;

const renderFlag = (language: ProjectLanguage | null): JSX.Element | null => {
  switch (language) {
    case ProjectLanguage.English:
      return <ReactCountryFlag countryCode="GB" svg />;
    case ProjectLanguage.French:
      return <ReactCountryFlag countryCode="FR" svg />;
    case ProjectLanguage.Spanish:
      return <ReactCountryFlag countryCode="ES" svg />;
    default:
      return null;
  }
};

export const ProjectSelector: React.FC<ProjectSelectorProps> = ({
  allProjects,
  selectedProject,
  setSelectedProject,
}) => {
  return (
    <Row justify="center">
      <Select
        showSearch
        allowClear
        placeholder={<Row justify="center">Select a project</Row>}
        filterOption={(inputValue, option) =>
          ((option as any).children[0].props.children as string)
            .toLowerCase()
            .includes(inputValue.toLowerCase())
        }
        onClear={() => setSelectedProject(null)}
        onChange={(value) =>
          setSelectedProject(
            allProjects.find((project) => project.id === value) ?? null
          )
        }
        value={selectedProject ? selectedProject.id : null}
        style={{ width: "90%" }}
      >
        {allProjects.map((project) => (
          <Option value={project.id}>
            <div style={{ display: "none" }}>{project.domainName}</div>
            <Row justify="center">
              <Space size="small">
                {project.domainName}-{renderFlag(project.language)}
              </Space>
            </Row>
          </Option>
        ))}
      </Select>
    </Row>
  );
};
