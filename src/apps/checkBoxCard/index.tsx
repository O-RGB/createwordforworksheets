import CheckBoxCommon from "@/components/common/checkbox";
import TextAreaCommon from "@/components/common/textArea";
import { WorkSheetsToOption } from "@/lib/worksheetsToOption";
import { WorksheetsModel } from "@/model/worksheets";
import { Form, FormInstance, Input } from "antd";
import React, { useEffect, useState } from "react";

interface CheckBoxCardProps {
  WorksheetsModel?: WorksheetsModel[];
  imageSrtting?: boolean;
  label?: string;
  name?: string;
  form?: FormInstance<any>;
  imageUrl?: string;
}

const CheckBoxCard: React.FC<CheckBoxCardProps> = ({
  WorksheetsModel,
  imageSrtting,
  label,
  name,
  form,
  imageUrl,
}) => {
  const [worksheetsOption, setWorksheetsOption] = useState<
    CheckBoxGroupOptions[]
  >([]);
  useEffect(() => {
    if (WorksheetsModel) {
      let temp = WorkSheetsToOption(WorksheetsModel);
      setWorksheetsOption(temp);
    }
  }, [WorksheetsModel]);
  return (
    <>
      <div className="layout-card">
        <div className="layout-card-title">{label}</div>
        <CheckBoxCommon
          form={form}
          name={name}
          CheckBoxGroupOptions={worksheetsOption}
          imageMode={imageSrtting}
        ></CheckBoxCommon>
      </div>
    </>
  );
};

export default CheckBoxCard;
