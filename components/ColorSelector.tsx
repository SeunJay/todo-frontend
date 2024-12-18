"use client";

import React, { useState } from "react";

interface Props {
  label: string;
  color: string;
  colors: string[];
  handleSelectColor: (color: string) => void;
}

const ColorSelector = ({ label, colors, color, handleSelectColor }: Props) => {
  return (
    <div className="w-full flex flex-col gap-[12px] h-[81px]">
      <label className="text-[#4EA8DE] text-[14px] font-bold">{label}</label>

      <div className="flex items-center gap-[15px] w-full">
        {colors.map((bgColor, i) => (
          <span
            className={
              color === bgColor
                ? `h-[25px] md:h-[52px] w-[25px] md:w-[52px] rounded-full !border-2 !border-[#fff] cursor-pointer`
                : `h-[25px] md:h-[52px] w-[25px] md:w-[52px] rounded-full cursor-pointer`
            }
            style={{ backgroundColor: bgColor }}
            key={i}
            onClick={() => handleSelectColor(bgColor)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
