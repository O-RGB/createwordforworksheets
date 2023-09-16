import { CalColor, colorSecondary } from "@/config/color";
import React from "react";

interface CardCustomProps {
  children?: React.ReactNode;
  Header?: React.ReactNode;
  className?: string;
  cardClassName?: string;
}

const CardCustom: React.FC<CardCustomProps> = ({
  children,
  Header,
  className,
  cardClassName,
}) => {
  return (
    <div
      style={{
        backgroundColor: CalColor(colorSecondary, 150),
      }}
      className={`p-4 md:p-5 overflow-hidden  rounded-xl flex flex-col gap-2 w-full h-full ${cardClassName}`}
    >
      <div className="text-lg font-bold">{Header}</div>
      <div className={className}>{children}</div>
    </div>
  );
};

export default CardCustom;
