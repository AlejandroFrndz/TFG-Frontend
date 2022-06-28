import { Row, Spin } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RingLoader } from "react-spinners";
import { setProject } from "src/redux/projects/actions";
import { selectProject } from "src/redux/projects/selectors";
import API from "src/utils/api";
import { IProject, ProjectPhase } from "src/utils/api/resources/project";

interface ProcessingSpinnerProps {
  setError: (value: boolean) => void;
  setErrorMessage: (value: string) => void;
}

export const ProcessingSpinner: React.FC<ProcessingSpinnerProps> = ({
  setError,
  setErrorMessage,
}) => {
  const dispatch = useDispatch();
  const project = useSelector(selectProject()) as IProject;

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const projectResponse = await API.project.get(project.id);

      if (projectResponse.isFailure()) {
        setError(true);
        setErrorMessage(
          "Something went wrong. Please refresh the page and try again"
        );
        return;
      }

      dispatch(setProject(projectResponse.value));
    }, 10000);

    return () => clearInterval(intervalId);
  }, [dispatch, project, setError, setErrorMessage]);

  const renderLabel = () => {
    switch (project.phase) {
      case ProjectPhase.ExecutingParse:
        return "Parsing Corpus";
      case ProjectPhase.ExecutingSearch:
        return "Running Searches";
      case ProjectPhase.ExecutingGroup:
        return "Grouping Results";
      default:
        return "";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <p style={{ marginBottom: "50px" }}>{renderLabel()}</p>
      <Spin indicator={<RingLoader />} style={{ marginLeft: "-50px" }} />
      <p style={{ marginTop: "100px" }}>
        This process could take several minutes to complete
      </p>
    </div>
  );
};
