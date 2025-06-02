import React from "react";
import { IconProps } from ".";

const GradientCircle = ({ className, onClick, size = 22 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={className}
    >
      <rect
        x="0.5"
        width="23"
        height="22"
        rx="11"
        fill="url(#paint0_linear_1_2065)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1_2065"
          x1="12"
          y1="0"
          x2="12"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#928EF2" />
          <stop offset="1" stopColor="#FFCAA4" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default GradientCircle;
