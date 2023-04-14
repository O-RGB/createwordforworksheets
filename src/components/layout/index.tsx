import React from "react";

interface LayoutDisplayProps {
  children?: React.ReactNode;
  tabChildren?: React.ReactNode;
}

const LayoutDisplay: React.FC<LayoutDisplayProps> = ({
  children,
  tabChildren,
}) => {
  return (
    <>
      <div className="w-full min-h-screen flex border-l-2">
        <div
          className="bg-gray-100 hidden lg:block 
         md:w-[500px] layout-padding "
        >
          <div className="sticky top-5 w-full  bg-gray-100 ">{tabChildren}</div>
        </div>
        <div className="bg-gray-100 w-full layout-padding">{children}</div>
      </div>
    </>
  );
};

export default LayoutDisplay;
