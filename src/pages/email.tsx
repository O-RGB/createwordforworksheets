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
        //   data.map((x) => {
        //     let blob = fetch(x.download).then((r) => r.blob());
        //     console.log(blob);
        //   });

        //   data[0];

          var xhr = new XMLHttpRequest();
          xhr.open("GET", data[0].download, true);
          xhr.responseType = "blob";
          xhr.onload = function (e) {
            if (this.status == 200) {
              var myBlob = this.response;
              // myBlob is now the blob that the object URL pointed to.
            }
          };
          xhr.send();
        }
      });
    }
  }, []);

  return <>test</>;
};

export default Email;
