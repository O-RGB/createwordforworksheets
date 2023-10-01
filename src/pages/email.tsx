import { getFile } from "@/api/fetcher/getFile";
import { getLocal } from "@/lib/local";
import { NextPage } from "next";
import React, { useEffect } from "react";

const Email: NextPage = () => {
  useEffect(() => {
    let sheetes = getLocal("googlesheets");
    if (sheetes) {
      sheetes = sheetes + "?page=email";
      getFile(sheetes).then((data) => {
        if (data) {
          data.map((x) => {
            let blob = fetch(x.download).then((r) => r.blob());
            console.log(blob);
          });
        }
      });
    }
  }, []);

  return <>test</>;
};

export default Email;
