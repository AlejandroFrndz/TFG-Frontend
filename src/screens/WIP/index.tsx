import React, { CSSProperties } from "react";
import { Helmet } from "react-helmet";
import { Center } from "src/shared/Center/Center";
import { MarcoTAO } from "src/utils/constants";

export const WIP: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>{MarcoTAO} - WIP</title>
      </Helmet>
      <Center style={styles.centerInPage}>
        <h1>We're working on it 🛠</h1>
      </Center>
    </>
  );
};

const styles = {
  centerInPage: {
    width: "100vw",
    height: "100vh",
  } as CSSProperties,
};
