import { Checkbox, CheckboxProps, Form, FormInstance, Input } from "antd";
import React, { useEffect, useState } from "react";
import ImageNumber from "../input-number";

interface CheckBoxCustomProps extends CheckboxProps {
  image?: string;
  label: string;
  id?: string;
  modeSetting?: ModeOnFinish;
  display?: DisplaySetting;
  onChangeCheckBox?: (result: CheckboxResult) => void;
  form?: FormInstance<any>;
  name: string;
  debug: boolean;
  InputDisable?: InputDisable;
}

const CheckBoxCustom: React.FC<CheckBoxCustomProps> = ({
  image,
  label,
  id,
  modeSetting = "file", // File
  onChangeCheckBox,
  display,
  form,
  name,
  debug,
  InputDisable,
  ...props
}) => {
  let File: InputValue[] = [
    {
      value: "file",
      label: "File",
      count: "1",
      disabled: InputDisable
        ? InputDisable.file
          ? InputDisable.file
          : false
        : false,
    },
  ];
  let Print: InputValue[] = [
    {
      value: "print",
      label: "Print",
      count: "1",
      disabled: InputDisable
        ? InputDisable.print
          ? InputDisable.print
          : false
        : false,
    },
  ];
  let Book: InputValue[] = [
    {
      value: "book",
      label: "Book",
      count: "1",
      disabled: InputDisable
        ? InputDisable.book
          ? InputDisable.book
          : false
        : false,
    },
  ];
  let Mix: InputValue[] = [
    {
      value: "file",
      label: "ไฟล์",
      count: "0",
      disabled: InputDisable
        ? InputDisable.file
          ? InputDisable.file
          : false
        : false,
    },
    {
      value: "print",
      label: "ปริ้น",
      count: "0",
      disabled: InputDisable
        ? InputDisable.print
          ? InputDisable.print
          : false
        : false,
    },
    {
      value: "book",
      label: "เล่ม",
      count: "0",
      disabled: InputDisable
        ? InputDisable.book
          ? InputDisable.book
          : false
        : false,
    },
  ];

  const [disableAll, setDsiabledAll] = useState<boolean>(false);
  const [onCheck, setCheck] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<InputValue[] | undefined>(
    undefined
  );
  const [value, setValue] = useState<CheckboxResult>();
  let textSize = "text-md";

  const resetInputValue = () => {
    setInputValue(undefined);
    let obj: InputValue[] = [];

    setTimeout(() => {
      if (name) {
        if (modeSetting == "file") {
          obj = File;
          setInputValue(File);
          obj.map((x) => {
            if (x.value == "file") {
              setDsiabledAll(x.disabled ? x.disabled : false);
            }
          });
        } else if (modeSetting == "print") {
          obj = Print;
          setInputValue(Print);
          obj.map((x) => {
            if (x.value == "print") {
              setDsiabledAll(x.disabled ? x.disabled : false);
            }
          });
        } else if (modeSetting == "book") {
          obj = Book;
          setInputValue(Book);
          obj.map((x) => {
            if (x.value == "book") {
              setDsiabledAll(x.disabled ? x.disabled : false);
            }
          });
        } else if (modeSetting == "mix") {
          obj = Mix;
          setInputValue(Mix);
          setDsiabledAll(Mix.every((x) => x.disabled == true));
        }
        let cloneObj = {
          checked: onCheck,
          formName: name,
          id: name,
          inputNumber: onCheck ? obj : undefined,
        };
        form?.setFieldValue(name, cloneObj);
        setValue(cloneObj);
      }
    }, 10);
  };

  useEffect(() => {
    resetInputValue();
  }, [modeSetting, display, form]); // Detect Mode Setting on top page changed

  if (!id) {
    return <></>;
  }

  return (
    <div>
      {debug && <div className="break-all">{JSON.stringify(value)}</div>}
      {debug && <div className="break-all">{JSON.stringify(InputDisable)}</div>}
      {debug && (
        <div className="break-all">
          Disabled All: {JSON.stringify(disableAll)}
        </div>
      )}
      {debug && (
        <div className="break-all">onCheck: {JSON.stringify(onCheck)}</div>
      )}
      <div className="flex flex-col gap-2"></div>
      <div className="m-0 h-0 w-0 p-0">
        <Form.Item name={name}>
          <Input className="m-0 w-0 h-0 p-0 opacity-0"></Input>
        </Form.Item>
      </div>
      <div
        className={`relative flex flex-col w-full bg-white ${props.className}`}
      >
        <Checkbox
          disabled={disableAll}
          {...props}
          onChange={(e) => {
            setCheck(e.target.checked);
            if (name) {
              if (e.target.checked) {
                let obj = {
                  checked: e.target.checked,
                  formName: name,
                  id: name,
                  inputNumber: inputValue,
                };
                form?.setFieldValue(name, obj);
                setValue(obj);
                onChangeCheckBox?.(obj);
              } else {
                let obj = {
                  checked: false,
                  formName: name,
                  id: name,
                  inputNumber: undefined,
                };
                form?.setFieldValue(name, obj);
                onChangeCheckBox?.(obj);
                setValue(obj);
              }
            }
          }}
          className={`p-2 md:p-3   rounded-md ${
            onCheck ? "bg-gray-200" : "bg-transparent"
          } hover:bg-gray-200 duration-300 border border-solid w-full z-20`}
        >
          <div
            className={`ml-1.5  select-none  flex flex-col ${
              display?.image ? "gap-1.5 pb-1" : ""
            } duration-300 transition-all`}
          >
            <div className={textSize}>{label}</div>
            {image && display && (
              <ImageForChange
                show={display?.image}
                image={image}
              ></ImageForChange>
            )}
          </div>
        </Checkbox>

        <div className="">
          <div className="-mt-2">
            <div
              className={`z-10 w-full flex flex-col lg:flex-row gap-4 px-3 rounded-md overflow-hidden bg-green-200 ${
                onCheck && modeSetting != "file" && disableAll != true
                  ? ` ${
                      modeSetting == "mix" ? "h-32" : "h-12"
                    }  lg:h-12  py-4 border border-solid `
                  : "h-0"
              }  duration-300 transition-all`}
            >
              {inputValue?.map((data, inputkey) => {
                return (
                  <div
                    key={`input-number-${name}-key-${inputkey}`}
                    className="flex gap-2"
                  >
                    {modeSetting == "mix" && (
                      <div className="min-w-[30px]">{data.label}</div>
                    )}

                    <ImageNumber
                      name={name}
                      isStartWithZero={modeSetting == "mix"}
                      maxOne={data.value == "file"}
                      disabled={data.disabled}
                      value={data.count}
                      id={`${String(inputkey)}`}
                      onChange={(id: string, input: number) => {
                        let clone = inputValue;
                        if (clone && clone.length > 0) {
                          if (id == "0") {
                            clone[0].count = String(input);
                          } else if (id == "1") {
                            clone[1].count = String(input);
                          } else if (id == "2") {
                            clone[2].count = String(input);
                          }
                          if (onCheck && name) {
                            let obj = {
                              checked: onCheck,
                              formName: name,
                              id: name,
                              inputNumber: clone,
                            };
                            form?.setFieldValue(name, obj);
                            onChangeCheckBox?.(obj);
                            setValue(obj);
                          }
                        }
                      }}
                    ></ImageNumber>

                    {debug && (
                      <div className="break-all">{JSON.stringify(data)}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckBoxCustom;

interface ImageForChangeProps {
  show: boolean;
  image: string;
}

const ImageForChange: React.FC<ImageForChangeProps> = ({ show, image }) => {
  let imageSize = "w-20 h-20";
  const [getShow, setShow] = useState<boolean>(false);

  useEffect(() => {
    setShow(show);
  }, [show]);

  return (
    <div
      className={`overflow-hidden rounded-md aspect-square  ${
        getShow ? imageSize : "w-20 h-0"
      } duration-300 transition-all`}
    >
      <img src={image} alt="" className="w-full h-full object-cover" />
    </div>
  );
};
