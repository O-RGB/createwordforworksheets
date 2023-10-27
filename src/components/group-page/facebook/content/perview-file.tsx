import React from "react";
import { FilePdfOutlined } from "@ant-design/icons";

interface FacebookPreviewFileProps {
  getMockup?: WorksheetsModelInput[];
}

const FacebookPreviewFile: React.FC<FacebookPreviewFileProps> = ({
  getMockup,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {getMockup?.map((data, i) => {
        if (data.filename && data.root) {
          return (
            <div key={`main-file-${i}`} className="border p-2 rounded-md">
              <div className="font-bold">{data.name}</div>
              {data.filename && (
                <div className="flex flex-col gap-0">
                  {data.filename.map((file, f) => {
                    return (
                      <div key={`min-file-${i}-${f}`} className="flex items-center gap-2">
                        <FilePdfOutlined className="text-red-500"/>  {file}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        } else {
          return (
            <div key={`main-file-${i}`}>
              <div className="text-gray-500">
                <div>{data.name}</div>
                <div>ไม่ได้ Set Path</div>
                <div>Status: ข้ามการส่งเมล</div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default FacebookPreviewFile;
