import { Form, FormInstance } from "antd";
import React from "react";
import MainCheckBox from "./main-checkbox";
import { WorksheetsModel } from "@/model/worksheets";

interface CheckBoxCloneProps {
  name?: string;
  label?: string;
  imageMode?: boolean;
  form: FormInstance<any>;
  mixMode?: boolean;
  WorksheetsModel?: WorksheetsModel[];
}

const CheckBoxClone: React.FC<CheckBoxCloneProps> = ({
  form,
  WorksheetsModel,
}) => {
  return (
    <>
      <div className="flex flex-col  justify-start items-start">
        {WorksheetsModel?.map((data, i) => {
          let get = data.getWorksheets();
          if (!get) {
            return <></>;
          }

          let temp: checkBoxType = {
            id: "",
            name: get.workSheetsId,
            title: get.name,
            onSelect: false,
            headerArray: get,
          };

          return (
            <React.Fragment key={`check-item-key-${i}`}>
              <Form.Item
                className="m-0 p-0 h-0"
                initialValue={temp.headerArray}
                name={`${temp.name}-real`}
              ></Form.Item>
              <MainCheckBox
                initialValue={temp.select}
                name={temp.name}
                title={temp.title}
                form={form}
              ></MainCheckBox>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default CheckBoxClone;

{
}
