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
}

const CheckBoxCustom: React.FC<CheckBoxCustomProps> = ({
  image,
  label,
  id,
  modeSetting = 1, // File
  onChangeCheckBox,
  display,
  form,
  name,
  ...props
}) => {
  let File: InputValue[] = [
    {
      name: "File",
      value: "1",
    },
  ];
  let Print: InputValue[] = [
    {
      name: "Print",
      value: "1",
    },
  ];
  let Book: InputValue[] = [
    {
      name: "Book",
      value: "1",
    },
  ];
  let Mix: InputValue[] = [
    {
      name: "File",
      value: "1",
    },
    {
      name: "Print",
      value: "1",
    },
    {
      name: "Book",
      value: "1",
    },
  ];

  const [onCheck, setCheck] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<InputValue[] | undefined>(
    undefined
  );
  const [value, setValue] = useState<CheckboxResult>();

  let textSize = "text-md";

  const resetInputValue = () => {
    setInputValue([]);
    let obj: InputValue[] = [];
    setTimeout(() => {
      setTimeout(() => {
        if (name) {
          if (modeSetting == 1) {
            obj = File;
            setInputValue(File);
          } else if (modeSetting == 2) {
            obj = Print;
            setInputValue(Print);
          } else if (modeSetting == 3) {
            obj = Book;
            setInputValue(Book);
          } else if (modeSetting == 4) {
            obj = Mix;
            setInputValue(Mix);
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
      }, 0);
    }, 0);
  };

  useEffect(() => {
    resetInputValue();
  }, [modeSetting, display, form]); // Detect Mode Setting on top page changed

  if (!id) {
    return <></>;
  }

  return (
    <div>
      <div className="break-all">{JSON.stringify(value)}</div>
      <div className="flex flex-col gap-2"></div>
      <div className="m-0 h-0 w-0 p-0">
        <Form.Item name={name}>
          <Input className="m-0 w-0 h-0 p-0 opacity-0"></Input>
        </Form.Item>
      </div>
      <div className={`relative flex flex-col w-full ${props.className}`}>
        <Checkbox
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
          className={`p-3 rounded-md ${
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
              className={`z-10 w-full flex flex-col lg:flex-row gap-4 px-3 rounded-md overflow-hidden bg-blue-200 ${
                onCheck && modeSetting != 1
                  ? ` ${
                      modeSetting == 4 ? "h-36" : "h-14"
                    }  lg:h-14  py-4 border border-solid `
                  : "h-0"
              }  duration-300 transition-all`}
            >
              {inputValue?.map((data, inputkey) => {
                return (
                  <div
                    key={`input-number-${name}-key-${inputkey}`}
                    className="flex gap-2"
                  >
                    {modeSetting == 4 && (
                      <>
                        {inputkey == 0
                          ? "Print"
                          : inputkey == 1
                          ? "Book"
                          : inputkey == 2
                          ? "Mix"
                          : ""}
                      </>
                    )}
                    <ImageNumber
                      name={name}
                      onChange={(id: string, input: number) => {
                        let clone = inputValue;
                        if (clone && clone.length > 0) {
                          if (id == "0") {
                            clone[0].value = String(input);
                          } else if (id == "1") {
                            clone[1].value = String(input);
                          } else if (id == "2") {
                            clone[2].value = String(input);
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
                      value={data.value}
                      id={`${String(inputkey)}`}
                    ></ImageNumber>
                    <div className="break-all">{JSON.stringify(data)}</div>
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
