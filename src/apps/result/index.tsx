import TextAreaCommon from "@/components/common/textArea";
import { Form, Input } from "antd";
import React from "react";

interface ResultTextAppsProps {
  name?: string;
  label?: string;
  value?: string;
}

const ResultTextApps: React.FC<ResultTextAppsProps> = ({
  name,
  label,
  value,
}) => {
  return (
    <>
      <div>
        <TextAreaCommon value={value}></TextAreaCommon>
      </div>
    </>
  );
};

export default ResultTextApps;
