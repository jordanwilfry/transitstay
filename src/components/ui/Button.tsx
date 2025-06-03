import React, { JSX } from "react";

interface Props {
  type: "black" | "gray" | "white";
  text: string;
  icon?: JSX.Element;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ text, type, icon, className, onClick, disabled }: Props) => {
  const baseClasses =
    "rounded-full border text-sm border-white/50 py-2 px-5 flex gap-2 items-center justify-between select-none transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed";

  const typeClasses =
    type === "black"
      ? "bg-zinc-700/30 text-zinc-100 hover:bg-zinc-800/60 disabled:hover:scale-100 disabled:hover:bg-zinc-700/30"
      : type === "gray"
      ? "bg-[rgb(255_255_255_/_0.06)] text-white hover:bg-[rgb(255_255_255_/_0.1)] disabled:hover:scale-100 disabled:hover:bg-[rgb(255_255_255_/_0.06)]"
      : "bg-white/80 text-zinc-500 hover:bg-white hover:text-zinc-700 disabled:hover:scale-100 disabled:hover:bg-white/80 disabled:hover:text-zinc-500";

  return (
    <button
      className={`${baseClasses} ${typeClasses} ${className} cursor-pointer`}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{text}</span>
      {icon}
    </button>
  );
};

export default Button;
