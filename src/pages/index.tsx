import CheckBoxCommon from "@/components/common/checkbox";
import { Form } from "antd";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const optionsWithDisabled: CheckBoxGroupOptions[] = [
    { label: "ใบงานคณิตสาสตร์ อ.2", value: "Apple" },
    { label: "Pear", value: "Pear" },
    { label: "Orange", value: "Orange" },
  ];
  return (
    <>
      <Form layout="vertical">
        <CheckBoxCommon
          CheckBoxGroupOptions={optionsWithDisabled}
          label="eigjow"
        ></CheckBoxCommon>
      </Form>
    </>
  );
};

export default Home;
