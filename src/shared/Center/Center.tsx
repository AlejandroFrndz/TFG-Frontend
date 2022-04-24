import React, { CSSProperties } from "react";

type CenterProps = {
  style?: CSSProperties;
};

export const Center: React.FC<CenterProps> = ({ style, children }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
