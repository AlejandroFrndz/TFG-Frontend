import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setProject } from "src/redux/projects/actions";
import { Center } from "src/shared/Center/Center";
import { FullScreenLoader } from "src/shared/FullScreenLoader";
import API from "src/utils/api";
import { MarcoTAO } from "src/utils/constants";

export const Project: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const { projectId } = useParams<{ projectId: string }>();

  useEffect(() => {
    const fetchProject = async () => {
      const projectResponse = await API.project.get(projectId as string);

      if (projectResponse.isSuccess()) {
        dispatch(setProject(projectResponse.value));
      } else {
        const status = projectResponse.error.error?.response?.status;

        if (status) {
          switch (status) {
            case 404:
              setErrorMessage("We couldn't find this project in our servers");
              break;
            case 403:
              setErrorMessage("You're not authorized to work on this project");
              break;
            default:
              setErrorMessage(
                "Something went wrong while loading your project. Please refresh the page and try again."
              );
              break;
          }
        } else {
          setErrorMessage(
            "We couldn't establish a connection to our servers. Please check if your connection works properly and try again later"
          );
        }

        setError(true);
      }

      setLoading(false);
    };

    fetchProject();
  }, [dispatch, projectId, setLoading]);

  if (loading)
    return (
      <>
        <Helmet>
          <title>{`${MarcoTAO} - Workspace`}</title>
        </Helmet>
        <FullScreenLoader type="Propagate" color="red" />
      </>
    );

  if (error) return <Center style={{ height: "100vh" }}>{errorMessage}</Center>;

  return <Center style={{ height: "100vh" }}>Yo wasa</Center>;
};
