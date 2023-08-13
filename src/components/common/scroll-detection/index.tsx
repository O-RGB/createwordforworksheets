import { HeadWorkSheets } from "@/model/headworksheets";
import React, { useEffect, useState } from "react";

interface ScrollDetectionProps {
  getMockup: HeadWorkSheets[];
  scrollToEleemtById: (id: string) => void;
}

const ScrollDetection: React.FC<ScrollDetectionProps> = ({
  getMockup,
  scrollToEleemtById,
}) => {
  const [minScroll, setMinScroll] = useState<number>(0);

  useEffect(() => {
    const options: any = { passive: true }; // options must match add/remove event
    const scroll = (event: any) => {
      const { scrollY } = window;
      console.log("scrollY", scrollY);
      setMinScroll(Math.ceil(scrollY * 0.24));
    };
    document.addEventListener("scroll", scroll, options);
    // remove event on unmount to prevent a memory leak
    () => document.removeEventListener("scroll", scroll, options);
  }, []);
  return (
    <>
      <div className=" flex items-center w-20 h-[100vh] duration-300 right-0 z-30 opacity-100 select-none ">
        <div className=" h-[100vh] w-full  ">
          <div className="flex flex-col gap-3 h-full   text-[10px]  ">
            <div className="relative flex flex-col gap-3">
              {/* <div
                className={`absolute right-0 z-10`}
                style={{ top: minScroll }}
              >
                <div className={``}>----</div>
              </div> */}
              {getMockup.map((worksheets, IKey) => {
                let getModel = worksheets.getHeadWorksheets();
                return (
                  <div
                    key={`header-key-scorll-${IKey}`}
                    className="flex flex-col gap-2 items-end justify-end "
                  >
                    <div
                      onClick={() =>
                        scrollToEleemtById(getModel.formName ?? "")
                      }
                      className={`p-1 bg-white hover:bg-green-400 shadow-md rounded-xl whitespace-nowrap z-40 w-full duration-300 cursor-pointer`}
                    >
                      <div className="pl-1">{getModel.headerTitle}</div>
                    </div>
                    {/* <div className="flex flex-col gap-2 w-fit  ">
                      {getModel.worksheets?.map((data) => {
                        return (
                          <div className=" p-0.5 shadow-md rounded-full bg-gray-200 w-1 h-1"></div>
                        );
                      })}
                    </div> */}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScrollDetection;
