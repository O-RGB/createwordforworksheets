import AutoCompleteCommon from "@/components/common/autoComplete";
import ButtonCommon from "@/components/common/button";
import CascaderCommon from "@/components/common/cascader";
import { HeadWorkSheets } from "@/model/headworksheets";
import { Form } from "antd";

import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";

interface SearchAppsProps {
  data: HeadWorkSheets[] | undefined;
}

const SearchApps: React.FC<SearchAppsProps> = ({ data }) => {
  const [prepardataforseach, setData] = useState<Option[]>([]);

  useEffect(() => {
    let option: Option[] = [];
    if (data) {
      data.map((x) => {
        let temp = x.getHeadWorksheets();
        temp.worksheets?.map((y) => {
          let ytemp = y.getWorksheets();
          ytemp;
          option.push({
            label: ytemp?.name ?? "",
            value: ytemp?.workSheetsId ?? "",
          });
        });
      });
      setData(option);
    }
  }, [data]);

  return (
    <>
      <Form>
        <div className="flex gap-2">
          {prepardataforseach && (
            <CascaderCommon
              onChange={(e) => {
                setTimeout(() => {
                  let element = document.getElementById(e);
                  if (element) {
                    element.classList.add("bg-gray-300");
                    element.classList.add("rounded-md");
                    setTimeout(() => {
                      if (element) {
                        element.classList.remove("bg-gray-300");
                        element.classList.remove("rounded-md");
                      }
                    }, 2000);
                    window.scrollTo({
                      top: element.offsetTop - 600,
                      behavior: "smooth",
                    });
                  }
                }, 100);
              }}
              options={prepardataforseach}
            ></CascaderCommon>
          )}
          <ButtonCommon>
            <BiSearch></BiSearch>
          </ButtonCommon>
        </div>
      </Form>
    </>
  );
};

export default SearchApps;
