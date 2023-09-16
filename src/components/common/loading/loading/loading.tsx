import React, { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

interface LoadingProps {}

const LoadingComponent: React.FC<LoadingProps> = ({}) => {
  return (
    <div className="fixed w-full h-screen bg-black/10 flex justify-center items-center">
      <div className="p-4 rounded-md overflow-hidden shadow-md flex justify-center items-center gap-3 bg-white">
        <div>
          <LoadingOutlined className="text-3xl" />
        </div>
        <div>กำลังโหลดข้อมูลจาก Google Sheets</div>
      </div>
    </div>
  );
};

export default LoadingComponent;
