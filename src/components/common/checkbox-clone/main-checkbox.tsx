import { Checkbox, Form, FormInstance, Input } from "antd";
import React, { useEffect, useState } from "react";
import ChlidCheckBox from "./chlid-checkbox";
import { CheckCircleOutlined } from "@ant-design/icons";

interface MainCheckboxProps {
  name: string;
  title: string;
  image: string;
  form: FormInstance<any>;
  initialValue: checkBoxSelect[] | undefined;
  headerArray: WorksheetsModelInput;
  setting?: SettingOnFinish;
  modeOnFinish: ResultModeOnFinish;
  getReusltForm: () => void;
}

const MainCheckBox: React.FC<MainCheckboxProps> = ({
  name,
  title,
  initialValue,
  form,
  headerArray,
  setting,
  image,
  modeOnFinish,
  getReusltForm,
}) => {
  const [check, setCheck] = useState<boolean>(false);

  useEffect(() => {
    if (initialValue) {
      if (initialValue.length > 0) {
        setCheck(true);
        form.resetFields([`${name}-value`]);
        form.setFieldValue(`${name}-value`, initialValue);
      }
    }
    if (headerArray) {
      form.resetFields([`${name}-real`]);
      form.setFieldValue(`${name}-real`, headerArray);
    }
  }, [headerArray]);
  return (
    <>
      <Form.Item
        className="m-0 p-0 h-0 opacity-0"
        initialValue={headerArray}
        name={`${name}-real`}
      >
        <Input></Input>
      </Form.Item>

      <Form.Item
        onReset={() => {
          setCheck(false);
          form.resetFields([`${name}-real`]);
          form.setFieldValue(`${name}-real`, headerArray);
        }}
        initialValue={
          initialValue ? (initialValue.length > 0 ? true : false) : false
        }
        valuePropName="checked"
        name={name}
        className="w-full p-0 m-0"
      >
        <Checkbox
          onChange={(e) => {
            setCheck(e.target.checked);
            if (!e.target.checked) {
              form.resetFields([`${name}-value`]);
            } else {
              let modeObj = {};
              if (modeOnFinish.mode == 1) {
                modeObj = {
                  count: 1,
                  id: `${name}-file`,
                  type: "File",
                  bool: true,
                };
              } else if (modeOnFinish.mode == 2) {
                modeObj = {
                  count: 1,
                  id: `${name}-print`,
                  type: "Print",
                  bool: true,
                };
              } else if (modeOnFinish.mode == 3) {
                modeObj = {
                  count: 1,
                  id: `${name}-book`,
                  type: "Book",
                  bool: true,
                };
              } else if (modeOnFinish.mode == 4) {
                modeObj = {
                  count: 1,
                  id: `${name}-file`,
                  type: "File",
                  bool: true,
                };
              }
              form.setFieldValue(`${name}-value`, [modeObj]);
              getReusltForm()
            }
          }}
          className="w-full p-3 !m-0 rounded-md hover:bg-slate-100 duration-300"
        >
          <div>{title}</div>
          {setting?.image && (
            <div className="py-2">
              <div className="w-20 h-20 rounded-md overflow-hidden relative">
                <div
                  className={` z-20 absolute top-0  w-full h-full ${
                    check ? "bg-opacity-40 bg-black" : ""
                  } duration-300`}
                >
                  <div
                    className={`flex w-full h-full justify-center items-center ${
                      check ? "opacity-100" : "opacity-0"
                    } duration-300`}
                  >
                    <CheckCircleOutlined className="text-lg text-white" />
                  </div>
                </div>
                <img
                  src={image}
                  alt=""
                  className="object-cover w-full h-full z-10"
                />
              </div>
            </div>
          )}
        </Checkbox>
      </Form.Item>

      {check && (
        <div className="relative">
          <div className="absolute left-5 h-[40%] w-[0.05rem] bg-[#E4E7EB]"></div>
          <div className="absolute left-5 h-[0.05rem] w-3 bg-[#E4E7EB] bottom-[60%]"></div>

          <div className="pl-6">
            <Form.Item
              className={`m-0 p-0 w-full ${
                setting?.mixData ? "" : "h-0 opacity-0"
              }`}
              name={`${name}-value`}
            >
              <ChlidCheckBox
                getReusltForm={getReusltForm}
                mainName={name}
                name={`${name}-value`}
                form={form}
              ></ChlidCheckBox>
            </Form.Item>
            {setting?.mixData && (
              <div className="w-full py-2">
                <hr />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MainCheckBox;
