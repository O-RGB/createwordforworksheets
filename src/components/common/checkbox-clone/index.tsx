import { Form, FormInstance } from "antd";
import React, { useEffect } from "react";
import MainCheckBox from "./main-checkbox";
import { WorksheetsModel } from "@/model/worksheets";

interface CheckBoxCloneProps {
  name?: string;
  label?: string;
  form: FormInstance<any>;
  mixMode?: boolean;
  WorksheetsModel?: WorksheetsModel[];
  setting?: SettingOnFinish;
  modeOnFinish: ResultModeOnFinish;
  getReusltForm: () => void;
}

const CheckBoxClone: React.FC<CheckBoxCloneProps> = ({
  form,
  WorksheetsModel,
  setting,
  modeOnFinish,
  getReusltForm,
}) => {
  useEffect(() => {}, []);

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
              <div id={`${get.workSheetsId}`} className="w-full duration-300">
                <MainCheckBox
                  getReusltForm={getReusltForm}
                  modeOnFinish={modeOnFinish}
                  image={temp.headerArray.imageUrl}
                  headerArray={temp.headerArray}
                  initialValue={temp.select}
                  name={temp.name}
                  title={temp.title}
                  form={form}
                  setting={setting}
                ></MainCheckBox>
              </div>
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
