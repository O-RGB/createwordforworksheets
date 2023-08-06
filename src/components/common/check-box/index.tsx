import { Checkbox, CheckboxProps } from "antd";
import React, { useEffect, useState } from "react";
import ImageNumber from "../input-number";

interface CheckboxResult {
  formName: string;
  id: string;
}

interface InputValue {
  value: string;
  name: string;
}

const File: InputValue[] = [
  {
    name: "File",
    value: "1",
  },
];
const Print: InputValue[] = [
  {
    name: "Print",
    value: "1",
  },
];
const Book: InputValue[] = [
  {
    name: "Book",
    value: "1",
  },
];
const Mix: InputValue[] = [
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

interface CheckBoxCustomProps extends CheckboxProps {
  image?: string;
  label: string;
  id?: string;
  modeSetting?: ModeOnFinish;
  display?: DisplaySetting;
  onChangeCheckBox?: (id: string, value: string) => void;
}

const CheckBoxCustom: React.FC<CheckBoxCustomProps> = ({
  image,
  label,
  id,
  modeSetting = 1, // File
  onChangeCheckBox,
  display,
  ...props
}) => {
  const [onCheck, setCheck] = useState<boolean>(false);
  const [onCheckDelay, setCheckDelay] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<InputValue[] | undefined>(
    undefined
  );

  let textSize = "text-md";
  let imageSize = "w-20 h-20";

  const resetInputValue = () => {
    setTimeout(() => {
      setInputValue([]);
      setTimeout(() => {
        if (modeSetting == 1) {
          setInputValue(File);
        } else if (modeSetting == 2) {
          setInputValue(Print);
        } else if (modeSetting == 3) {
          setInputValue(Book);
        } else if (modeSetting == 4) {
          setInputValue(Mix);
        }
      }, 0);
    }, 0);
  };

  useEffect(() => {
    resetInputValue();
  }, [modeSetting, display]); // Detect Mode Setting on top page changed

  if (!id) {
    return <></>;
  }

  return (
    <div className={`flex flex-col w-full ${props.className}`}>
      <Checkbox
        {...props}
        onChange={(e) => {
          setCheck(e.target.checked);
          resetInputValue();
          setTimeout(() => {
            setCheckDelay(e.target.checked);
          }, 600);
        }}
        className={`p-3 rounded-md ${
          onCheck ? "bg-gray-200" : "bg-transparent"
        } hover:bg-gray-200 duration-300 border border-solid w-full`}
      >
        <div
          className={`ml-1.5  select-none  flex flex-col ${
            display?.image ? "gap-1.5 pb-1" : ""
          } duration-300 transition-all`}
        >
          <div className={textSize}>{label}</div>
          {image && display && (
            // <div
            //   className={`overflow-hidden rounded-md aspect-square  ${
            //     display?.image ? imageSize : "w-0 h-0"
            //   }`}
            // >
            //   <img src={image} alt="" className="w-full h-full object-cover" />
            // </div>
            <ImageForChange
              show={display?.image}
              image={image}
            ></ImageForChange>
          )}
        </div>
      </Checkbox>

      {/* <div className=""></div> */}
      <div className="">
        <div className="-mt-2">
          <div
            className={`w-full flex flex-col lg:flex-row gap-4 px-3 rounded-md overflow-hidden ${
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
                  key={`input-number-key-${inputkey}`}
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
                  <ImageNumber value={data.value} id={id}></ImageNumber>
                </div>
              );
            })}
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
    <>
      <div
        className={`overflow-hidden rounded-md aspect-square  ${
          getShow ? imageSize : "w-0 h-0"
        } duration-300 transition-all`}
      >
        <img src={image} alt="" className="w-full h-full object-cover" />
      </div>
    </>
  );
};
