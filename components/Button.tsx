import React from "react";

interface Props {
  label: string;
  onPress?: () => void | Promise<void>;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
}

const Button = ({
  label,
  children,
  onPress,
  type = "button",
  loading,
}: Props) => {
  return (
    <button
      className="w-full bg-[#1E6F9F] font-bold rounded-[8px] h-[52px] flex items-center text-[#fff] justify-center gap-[6px]"
      onClick={onPress}
      type={type}
    >
      {loading ? "loading.." : label}
      {loading ? "" : children}
    </button>
  );
};

export default Button;
