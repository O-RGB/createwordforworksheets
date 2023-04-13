import CheckBoxCommon from "@/components/common/checkbox";
import TextAreaCommon from "@/components/common/textArea";
import { Form, FormInstance, Input } from "antd";
import React from "react";

interface CheckBoxCardProps {
  optionsWithDisabled?: CheckBoxGroupOptions[];
  imageSrtting?: boolean;
  label?: string;
  name?: string;
  form?: FormInstance<any>;
}

const CheckBoxCard: React.FC<CheckBoxCardProps> = ({
  optionsWithDisabled,
  imageSrtting,
  label,
  name,
  form,
}) => {
  return (
    <>
      <div className="layout-card">
        <div className="layout-card-title">{label}</div>
        <CheckBoxCommon
          form={form}
          name={name}
          CheckBoxGroupOptions={optionsWithDisabled}
          imageMode={imageSrtting}
        ></CheckBoxCommon>
      </div>
    </>
  );
};

export default CheckBoxCard;
