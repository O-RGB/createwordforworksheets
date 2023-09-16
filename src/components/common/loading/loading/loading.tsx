import React, { useEffect, useState } from "react";

interface LoadingProps {}

const LoadingComponent: React.FC<LoadingProps> = ({}) => {
  return (
    <div className="fixed w-full h-screen bg-black/10 flex justify-center items-center">
      <div className="p-3 rounded-md overflow-hidden shadow-md flex flex-col gap-3">
        <div>loaidng</div>
      </div>
    </div>
  );
};

export default LoadingComponent;
