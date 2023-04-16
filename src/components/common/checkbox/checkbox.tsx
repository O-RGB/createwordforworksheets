import { Checkbox } from "antd";
import React, { useState } from "react";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import ImageDetail from "./imageMode/image-detail";
import ImageCondition from "./radioSelect/image-condition";
import ImageNumber from "./element/image-number";
import ImageCheckBook from "./mixMode";
import CheckBoxImageLabel from "./imageMode/image-image";

interface CheckBoxProps {
  value: string;
  label: string;
  imageMode?: boolean;
  mixMode?: boolean;
  onSelect?: (
    value: CheckBoxGroupOptions<WorksheetsModelInput>,
    select: boolean
  ) => void;
  onUpdate?: (value: CheckBoxGroupOptions<WorksheetsModelInput>) => void;
  relationship?: string[][];
  WorksheetsModelInput?: WorksheetsModelInput;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  value,
  label,
  imageMode = false,
  mixMode = false,
  onSelect,
  onUpdate,
  WorksheetsModelInput,
  relationship,
}) => {
  const [checkBoxOnChange, setOnChange] = useState<boolean>(false);
  const [countNumber, setCountNumber] = useState<number>(1);
  const [modeCheckBox, setModeCheckBox] =
    useState<ResultWorkSheetsMode>("File");
  const [checkboxMixMain, setcheckboxMixMain] = useState<
    checkboxMixMain | undefined
  >();
  const onCheck = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setOnChange(true);
      onSelect?.(
        {
          label: label,
          value: value,
          realData: WorksheetsModelInput,
          mode: modeCheckBox,
          relationship: relationship,
          number: 1,
          mixMode: !mixMode,
        },
        true
      );
    } else {
      setModeCheckBox("File");
      setOnChange(false);
      onSelect?.(
        {
          label: label,
          value: value,
          realData: WorksheetsModelInput,
          relationship: relationship,
          mode: modeCheckBox,
          mixMode: !mixMode,
        },
        false
      );
    }
  };

  const radioOnChange = (result: ResultWorkSheetsMode) => {
    onUpdate?.({
      label: label,
      value: value,
      realData: WorksheetsModelInput,
      mode: result,
      relationship: relationship,
      number: 1,
      mixMode: !mixMode,
    });
  };

  const numberOnChange = (id: string, number: number) => {
    console.log(number);
    setCountNumber(number);
    onUpdate?.({
      label: label,
      value: value,
      realData: WorksheetsModelInput,
      mode: modeCheckBox,
      relationship: relationship,
      number: number,
      mixMode: !mixMode,
    });
  };

  const mixDataOnChange = (data: checkboxMixMain) => {
    onUpdate?.({
      label: label,
      value: value,
      realData: WorksheetsModelInput,
      mode: modeCheckBox,
      relationship: relationship,
      number: 0,
      mixMode: !mixMode,
      mixData: data,
    });
  };

  return (
    <>
      <Checkbox
        onChange={(e) => {
          onCheck(e);
        }}
        rootClassName="w-full"
        className={`${
          imageMode ? "p-2" : "p-2 "
        }   rounded-md w-full duration-200 ${
          checkBoxOnChange ? "bg-slate-100" : ""
        }`}
        value={value}
      >
        <div
          className={`${
            imageMode ? "flex flex-col sm:flex-row" : ""
          } w-full gap-4`}
        >
          <div className={`flex flex-col gap-2 `}>
            <div>{label}</div>
            <div hidden={imageMode}>
              <div className="flex gap-3">
                {WorksheetsModelInput && (
                  <>
                    <CheckBoxImageLabel
                      url={WorksheetsModelInput.imageUrl}
                      select={checkBoxOnChange}
                    ></CheckBoxImageLabel>

                    <ImageDetail
                      ImageDetailPrice={{
                        book: WorksheetsModelInput.price?.book,
                        tool: WorksheetsModelInput.price?.tool,
                        file: WorksheetsModelInput.price?.file,
                        print: WorksheetsModelInput.price?.print,
                      }}
                    ></ImageDetail>
                  </>
                )}
              </div>
            </div>
          </div>
          {checkBoxOnChange && (
            <div
              className={`flex flex-col sm:flex-row  ${
                imageMode ? "gap-3 sm:gap-5" : "sm:items-end gap-3 pt-3"
              }  select-none -mt-0.5  `}
            >
              {modeCheckBox != "File" && (
                <div>
                  <ImageNumber
                    id={value}
                    onChange={(id, value) => {
                      if (checkBoxOnChange) {
                        numberOnChange(id, value);
                      }
                    }}
                  ></ImageNumber>
                </div>
              )}

              {mixMode ? (
                <>
                  <div className="flex pt-1 ">
                    {!imageMode && <br />}
                    <ImageCondition
                      id={value}
                      onChange={(id, value) => {
                        if (checkBoxOnChange) {
                          radioOnChange(value);
                          setModeCheckBox(value);
                        }
                      }}
                    ></ImageCondition>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex pt-1 ">
                    {!imageMode && <br />}
                    <ImageCheckBook onChange={mixDataOnChange}></ImageCheckBook>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </Checkbox>
    </>
  );
};

export default CheckBox;
