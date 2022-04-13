import { Button, Col, Row, Typography } from "antd";
import React, { CSSProperties } from "react";
import { Center } from "../../../../shared/Center";

const { Text } = Typography;

export const SingUp: React.FC = () => {
  return (
    <Row>
      <Col span={24} style={styles.marginBottom20}>
        <Center>
          <Text>Don't have an account?</Text>
        </Center>
      </Col>
      <Col span={24}>
        <Center>
          <Button type="primary" style={styles.newAccountButton}>
            Create a new one
          </Button>
        </Center>
      </Col>
    </Row>
  );
};

const styles = {
  marginBottom20: {
    marginBottom: "20px",
  } as CSSProperties,

  newAccountButton: {
    borderRadius: "5px",
    width: "80%",
  } as CSSProperties,
};
