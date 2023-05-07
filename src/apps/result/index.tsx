import TextAreaCommon from "@/components/common/textArea";
import { Form, Input } from "antd";
import React from "react";

interface ResultTextAppsProps {
  name?: string;
  label?: string;
  value?: string;
  disabled?: boolean;
}

const ResultTextApps: React.FC<ResultTextAppsProps> = ({
  name,
  label,
  value,
  disabled,
}) => {
  return (
    <>
      <div>
        <TextAreaCommon
          placeholder="ผลลัพธ์"
          disabled={disabled}
          value={value}
        ></TextAreaCommon>
      </div>
    </>
  );
};

export default ResultTextApps;
