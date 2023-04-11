import TextAreaCommon from "@/components/common/textArea";
import { Form, Input } from "antd";
import React from "react";

interface ResultTextAppsProps {
  name?: string;
  label?: string;
}

const ResultTextApps: React.FC<ResultTextAppsProps> = ({ name, label }) => {
  return (
    <>
      <div>
        <TextAreaCommon></TextAreaCommon>
      </div>
    </>
  );
};

export default ResultTextApps;
