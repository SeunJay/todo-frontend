"use client";

import React, { ChangeEvent } from "react";

interface Props {
  label: string;
  value: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, onChange, value, placeholder = "" }: Props) => {
  return (
    <div className="w-full flex flex-col gap-[12px] h-[81px]">
      <label className="text-[#4EA8DE] text-[14px] font-bold">{label}</label>

      <input
        type="text"
        className="w-full h-[52px] outline-none !border !border-[#333333] text-[#f2f2f2] p-[16px] rounded-[8px] bg-transparent drop-shadow-md"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
