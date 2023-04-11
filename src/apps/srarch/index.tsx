import AutoCompleteCommon from "@/components/common/autoComplete";
import ButtonCommon from "@/components/common/button";
import { Form } from "antd";

import React from "react";

interface SearchAppsProps {}

const SearchApps: React.FC<SearchAppsProps> = ({}) => {
  return (
    <>
      <Form>
        <div className="flex gap-2">
          <AutoCompleteCommon></AutoCompleteCommon>
          <ButtonCommon>Search</ButtonCommon>
        </div>
      </Form>
    </>
  );
};

export default SearchApps;
