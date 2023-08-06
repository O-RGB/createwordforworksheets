import HomeGroup from "@/components/group-page/home";
import CheckBoxCustom from "@/components/common/check-box";
import { WorkSheetsData } from "@/mock/workSheetsData";
import { HeadWorkSheets } from "@/model/headworksheets";
import { Form, Radio } from "antd";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";

const InterFaceTest: NextPage = () => {
  const [getMockup, setMockup] = useState<HeadWorkSheets[]>([]);
  const [optionMockup, setOptionMockup] = useState<Option[]>([]);
  const [keyMockup, setKeyMockup] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    WorkSheetsData().then((data) => {
      let optionForSearch: Option[] = [];
      let ketMockup: string[] = [];
      data.map((work) => {
        work.getHeadWorksheets().worksheets?.map((elem) => {
          let element = elem.getWorksheets();
          if (element) {
            ketMockup.push(element.workSheetsId);
            optionForSearch.push({
              label: element?.name,
              value: element?.workSheetsId,
            });
          }
        });
      });

      setKeyMockup(ketMockup);
      setOptionMockup(optionForSearch);
      setMockup(data);

      setTimeout(() => {
        setLoading(true);
      }, 100);
    });
  }, []);

  return (
    <>
      {loading && (
        <HomeGroup
          keyMockup={keyMockup}
          optionMockup={optionMockup}
          getMockup={getMockup}
        ></HomeGroup>
      )}
    </>
  );
};

export default InterFaceTest;
