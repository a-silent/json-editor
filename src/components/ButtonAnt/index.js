import React from "react";
import { Button } from "antd";

import "antd/dist/antd.css";

export default props => {
  const { loading, click, text, type, disabled, htmlType } = props;
  return (
    <Button
      disabled={disabled}
      type={type}
      loading={loading}
      onClick={click}
      htmlType={htmlType}
    >
      {text}
    </Button>
  );
};
