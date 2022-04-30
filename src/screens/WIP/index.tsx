import React, { CSSProperties } from "react";
import { Center } from "src/shared/Center/Center";

export const WIP: React.FC = () => {
  return (
    <Center style={styles.centerInPage}>
      <h1>We're working on it 🛠</h1>
    </Center>
  );
};

const styles = {
  centerInPage: {
    width: "100vw",
    height: "100vh",
  } as CSSProperties,
};
