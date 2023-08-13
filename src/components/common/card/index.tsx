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
      className={`p-5 overflow-hidden border border-solid rounded-lg flex flex-col gap-2 w-full h-full ${cardClassName}`}
    >
      <div className="text-lg font-bold">{Header}</div>
      <div className={className}>{children}</div>
    </div>
  );
};

export default CardCustom;
