import { Select } from "antd";
import React from "react";

const { Option } = Select;

export const TagSelect: React.FC = () => (
  <Select
    showSearch
    placeholder="Select a tag"
    bordered={false}
    style={{ width: "100%" }}
  >
    <Option value="a">A</Option>
    <Option value="b">B</Option>
  </Select>
);
