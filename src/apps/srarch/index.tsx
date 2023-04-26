import AutoCompleteCommon from "@/components/common/autoComplete";
import ButtonCommon from "@/components/common/button";
import { Form } from "antd";

import React from "react";
import { BiSearch } from "react-icons/bi";

interface SearchAppsProps {}

const SearchApps: React.FC<SearchAppsProps> = ({}) => {
  return (
    <>
      <Form>
        <div className="flex gap-2">
          <AutoCompleteCommon placeholder="ค้นหา"></AutoCompleteCommon>
          <ButtonCommon>
            <BiSearch></BiSearch>
          </ButtonCommon>
        </div>
      </Form>
    </>
  );
};

export default SearchApps;
