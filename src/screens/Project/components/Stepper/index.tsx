import {
  DotChartOutlined,
  ExperimentOutlined,
  FileTextOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { Divider, Steps } from "antd";
import { CSSProperties } from "react";
import { AnalysisStep } from "../AnalysisStep";
import { CreationStep } from "../CreationStep";
import { ProcessingSpinner } from "../ProcessingSpinner";
import { TaggingStep } from "../TaggingStep";
import { VisualizationStep } from "../VisualizationStep";
import { useStep } from "./hooks/useStep";

const { Step } = Steps;

type ProjectStepperProps = {
  setError: (value: boolean) => void;
  setErrorMessage: (value: string) => void;
};

export const ProjectStepper: React.FC<ProjectStepperProps> = ({
  setError,
  setErrorMessage,
}) => {
  const [step, processing] = useStep();

  const renderStep = () => {
    switch (step) {
      case 0:
        return <CreationStep />;
      case 1:
        return processing ? (
          <ProcessingSpinner
            setError={setError}
            setErrorMessage={setErrorMessage}
          />
        ) : (
          <AnalysisStep />
        );
      case 2:
        return processing ? (
          <ProcessingSpinner
            setError={setError}
            setErrorMessage={setErrorMessage}
          />
        ) : (
          <TaggingStep />
        );
      case 3:
        return processing ? (
          <ProcessingSpinner
            setError={setError}
            setErrorMessage={setErrorMessage}
          />
        ) : (
          <VisualizationStep />
        );
      default:
        return <></>;
    }
  };

  if (step === -1) {
    setError(true);
    setErrorMessage(
      "Something went wrong. Please refresh the page and try again"
    );
    return <></>;
  }

  return (
    <>
      <Steps current={step} size="small" style={styles.stepper}>
        <Step title="Creation" icon={<FileTextOutlined />} />
        <Step title="Analysis" icon={<ExperimentOutlined />} />
        <Step title="Tagging" icon={<TagsOutlined />} />
        <Step title="Visualization" icon={<DotChartOutlined />} />
      </Steps>
      <Divider />
      {renderStep()}
    </>
  );
};

const styles = {
  stepper: {
    padding: "2vh 2vw 0 2vw",
  } as CSSProperties,
};
