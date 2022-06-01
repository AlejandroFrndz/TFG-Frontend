import { Col, Row } from "antd";
import { CSSProperties } from "react";
import {
  BarLoader,
  BeatLoader,
  BounceLoader,
  CircleLoader,
  ClimbingBoxLoader,
  ClipLoader,
  ClockLoader,
  DotLoader,
  FadeLoader,
  GridLoader,
  HashLoader,
  MoonLoader,
  PacmanLoader,
  PropagateLoader,
  PuffLoader,
  PulseLoader,
  RingLoader,
  RiseLoader,
  RotateLoader,
  ScaleLoader,
  SkewLoader,
  SquareLoader,
  SyncLoader,
} from "react-spinners";
import { Center } from "../Center/Center";

type LoaderType =
  | "Bar"
  | "Beat"
  | "Bounce"
  | "Circle"
  | "ClimbingBox"
  | "Clip"
  | "Clock"
  | "Dot"
  | "Fade"
  | "Grid"
  | "Hash"
  | "Moon"
  | "Pacman"
  | "Propagate"
  | "Puff"
  | "Pulse"
  | "Ring"
  | "Rise"
  | "Rotate"
  | "Scale"
  | "Skew"
  | "Square"
  | "Sync";

type FullScreenLoaderProps = {
  type: LoaderType;
  size?: number;
  height?: number;
  width?: number;
  margin?: number;
  radius?: number;
  color?: string;
  wrapperHeight?: string;
  wrapperWidth?: string;
  text?: JSX.Element;
};

export const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({
  type,
  size,
  height,
  width,
  margin,
  radius,
  color,
  wrapperHeight,
  wrapperWidth,
  text,
}) => {
  const renderLoader = () => {
    switch (type) {
      case "Bar":
        return <BarLoader height={height} width={width} color={color} />;
      case "Beat":
        return <BeatLoader size={size} margin={margin} color={color} />;
      case "Bounce":
        return <BounceLoader size={size} color={color} />;
      case "Circle":
        return <CircleLoader size={size} color={color} />;
      case "ClimbingBox":
        return <ClimbingBoxLoader size={size} color={color} />;
      case "Clip":
        return <ClipLoader size={size} color={color} />;
      case "Clock":
        return <ClockLoader size={size} color={color} />;
      case "Dot":
        return <DotLoader size={size} color={color} />;
      case "Fade":
        return (
          <FadeLoader
            height={height}
            width={width}
            radius={radius}
            margin={margin}
            color={color}
          />
        );
      case "Grid":
        return <GridLoader size={size} margin={margin} color={color} />;
      case "Hash":
        return <HashLoader size={size} color={color} />;
      case "Moon":
        return <MoonLoader size={size} color={color} />;
      case "Pacman":
        return <PacmanLoader size={size} margin={margin} color={color} />;
      case "Propagate":
        return <PropagateLoader size={size} color={color} />;
      case "Puff":
        return <PuffLoader size={size} color={color} />;
      case "Pulse":
        return <PulseLoader size={size} margin={margin} color={color} />;
      case "Ring":
        return <RingLoader size={size} color={color} />;
      case "Rise":
        return <RiseLoader size={size} margin={margin} color={color} />;
      case "Rotate":
        return <RotateLoader size={size} margin={margin} color={color} />;
      case "Scale":
        return (
          <ScaleLoader
            height={height}
            width={width}
            radius={radius}
            margin={margin}
            color={color}
          />
        );
      case "Skew":
        return <SkewLoader size={size} color={color} />;
      case "Square":
        return <SquareLoader size={size} color={color} />;
      case "Sync":
        return <SyncLoader size={size} margin={margin} color={color} />;
    }
  };
  return (
    <>
      <Center
        style={
          wrapperHeight || wrapperWidth
            ? { height: wrapperHeight, width: wrapperWidth }
            : styles.fullScreenSize
        }
      >
        <Row justify="center" align="middle">
          <Col span={24} style={styles.textWrapper}>
            {text}
          </Col>
          <Col span={24}>
            <div style={styles.loaderWrapper}>{renderLoader()}</div>
          </Col>
        </Row>
      </Center>
    </>
  );
};

const styles = {
  fullScreenSize: {
    height: "100vh",
    width: "100vw",
  } as CSSProperties,

  textWrapper: {
    marginTop: "-10vh",
  } as CSSProperties,

  loaderWrapper: {
    width: "100%",
    paddingLeft: "25%",
  } as CSSProperties,
};
