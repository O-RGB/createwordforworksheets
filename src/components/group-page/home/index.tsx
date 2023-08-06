import AutoCompleteCustom from "@/components/common/auto-complete";
import CardCustom from "@/components/common/card";
import CheckBoxCustom from "@/components/common/check-box";
import RadioCustom from "@/components/common/radio";
import SwitchCustom from "@/components/common/switch";
import { HeadWorkSheets } from "@/model/headworksheets";
import { Form, Radio } from "antd";
import React, { useEffect, useState } from "react";

interface HomeGroupProps {
  getMockup: HeadWorkSheets[];
  optionMockup: Option[];
}

const HomeGroup: React.FC<HomeGroupProps> = ({ getMockup, optionMockup }) => {
  //SETTING DISPLAY
  const debug = true;

  // ELEMENT
  const [form] = Form.useForm();
  const [modeSetting, setModeSetting] = useState<ModeOnFinish>(1);
  const [display, setDisplay] = useState<DisplaySetting>({
    grid: false,
    image: false,
  });

  // Fuction
  const scrollToEleemtById = (id: string) => {
    var my_element: HTMLElement | null = document.getElementById(id);

    if (my_element) {
      my_element.className =
        "bg-amber-400 rounded-md duration-300 hover:bg-amber-400";
      setTimeout(() => {
        if (my_element) {
          my_element.className = "duration-300";
        }
      }, 2000);
      my_element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  };

  return (
    <>
      {debug && <div className=" text-2xl font-bold">Version: DEBUG</div>}
      <div className="p-5">
        <div className="flex flex-col gap-2">
          <CardCustom Header={"Display"}>
            <SwitchCustom
              className="flex gap-6 "
              value={display}
              onChange={(value: Option[]) => {
                let displayTemp: DisplaySetting = {
                  grid: false,
                  image: false,
                };
                value.map((data) => {
                  displayTemp[data.value as DisplayOnFinish] =
                    data.select ?? false;
                });
                setDisplay(displayTemp);
              }}
              switchOption={[
                { value: "image", label: "Image" },
                { value: "grid", label: "Grid" },
              ]}
            ></SwitchCustom>
            {debug && <div>Display Selection: {JSON.stringify(display)}</div>}
          </CardCustom>

          <CardCustom Header={"Mode"}>
            <RadioCustom
              value={modeSetting}
              onChange={(e) => {
                setModeSetting(e.target.value);
              }}
              radioOption={[
                { value: 1, label: "File" },
                { value: 2, label: "Print" },
                { value: 3, label: "Book" },
                { value: 4, label: "Mix" },
              ]}
            ></RadioCustom>
            {debug && <div>Mode Selection: {JSON.stringify(modeSetting)}</div>}
          </CardCustom>
        </div>

        <div className="flex flex-col gap-2 py-2 ">
          <CardCustom Header={"Search Item"}>
            <AutoCompleteCustom
              option={optionMockup}
              onSelect={scrollToEleemtById}
            ></AutoCompleteCustom>
          </CardCustom>
        </div>
        <div className="flex flex-col gap-3">
          {getMockup.map((worksheets, IKey) => {
            let getModel = worksheets.getHeadWorksheets();
            return (
              <div key={`header-key-${IKey}`}>
                <CardCustom Header={<div>Header: {getModel.headerTitle}</div>}>
                  <div className="grid lg:grid-cols-2 gap-2  ">
                    {getModel.worksheets?.map((element, JKey) => {
                      let getEleemtnModel = element.getWorksheets();
                      if (getEleemtnModel) {
                        return (
                          <div
                            key={`element-key-${JKey}`}
                            id={getEleemtnModel.workSheetsId}
                          >
                            <CheckBoxCustom
                              display={display}
                              modeSetting={modeSetting}
                              id={getEleemtnModel.workSheetsId}
                              image={getEleemtnModel.imageUrl}
                              label={getEleemtnModel.name}
                            ></CheckBoxCustom>
                          </div>
                        );
                      }
                    })}
                  </div>
                </CardCustom>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HomeGroup;
