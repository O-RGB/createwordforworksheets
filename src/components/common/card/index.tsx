import React from "react";

interface CardCustomProps {
  children?: React.ReactNode;
  Header?: React.ReactNode;
  className?: string;
}

const CardCustom: React.FC<CardCustomProps> = ({
  children,
  Header,
  className,
}) => {
  return (
    <div className="p-5 overflow-hidden border border-solid rounded-lg flex flex-col gap-2">
      <div className="text-lg font-bold">{Header}</div>
      <div className={className}>{children}</div>
    </div>
  );
};

export default CardCustom;
