import { NextPage } from "next";
import React, { useEffect } from "react";

const Test: NextPage = () => {
  useEffect(() => {
    var iframe: any = document.getElementById("preview_content");
    if (iframe != null) {
      alert(iframe.contentWindow.document.body.innerHTML);
    }
  }, []);

  return (
    <div className="w-full h-screen flex flex-col gap-10">
      <div className="w-full h-full">
        <div>Full URL</div>
        <iframe
        id="preview_content"
          src="https://th.kerryexpress.com/th/track/?track=YWIzOGQ5NmRiNmI3NzIzODMwY2Q3MTBhNmMwZTFlNjBmSHg4ZDMxOWQ5MGVmODdmODcyOTE0ZmUxMzFmYjViOGQwZjVmSHg4UlJFVDAwMDEzNDI5M00zZkh4ODBjNGNiZTNiOGY3NTE0NzJmZDFmNmI4M2IzMGExMDc5Zkh4ODgwMDYwNWY0NzdhYzE3OTU1NjY2ZjM4Yjg1Zjg3YmNj"
          className="w-full h-full"
        ></iframe>
      </div>
      {/* <div className="w-full h-full">
        <div>Copy URL</div>
        <iframe
          src="https://th.kerryexpress.com/th/track/?track=NTZlMjQxNTE3MzlhZWY2NDRiMTQ4NDI1ODRhN2QyYWZmSHg4OThjMDAzOGQ1N2EzZDE4Mjk2ZjhkNzE3OWY3MGY2MDJmSHg4UlJFVDAwMDEzNDI5M00zZkh4OGQ3YTk2NjY3OGZkNjdmNzQ0NWFiM2JiOTQ1NjYzM2Y2Zkh4ODY0ZWNkY2M5MjNlNzJkZWFmYWI4MWY4MGQ4M2JjNTBj"
          className="w-full h-full"
        ></iframe>
      </div> */}
    </div>
  );
};

export default Test;
