import { NextPage } from "next";
import React from "react";

const Test: NextPage = () => {
  return (
    <div className="w-full h-screen flex flex-col gap-10">
      <div className="w-full h-full">
        <div>Full URL</div>
        <iframe
          src="https://th.kerryexpress.com/th/track/?track=YWIzOGQ5NmRiNmI3NzIzODMwY2Q3MTBhNmMwZTFlNjBmSHg4ZDMxOWQ5MGVmODdmODcyOTE0ZmUxMzFmYjViOGQwZjVmSHg4UlJFVDAwMDEzNDI5M00zZkh4ODBjNGNiZTNiOGY3NTE0NzJmZDFmNmI4M2IzMGExMDc5Zkh4ODgwMDYwNWY0NzdhYzE3OTU1NjY2ZjM4Yjg1Zjg3YmNj"
          className="w-full h-full"
        ></iframe>
      </div>
      <div className="w-full h-full">
        <div>Copy URL</div>
        <iframe
          src="http://keth.me/0e0b7da0"
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};

export default Test;
