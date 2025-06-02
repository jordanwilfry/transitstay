import React from "react";
import { IconProps } from ".";

const Facebook = ({
  className,
  fillOpacity = 0.6,
  onClick,
  size = 22,
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path
        d="M9.25165 15.8184V10.5551H11.1104L11.4691 8.39581C11.4719 8.38401 11.4538 8.36171 11.4468 8.36171H9.25026V6.84125C9.27529 6.63791 9.31977 6.43982 9.43377 6.26403C9.86057 5.60154 10.8713 5.80881 11.5594 5.77339V3.91972C11.3537 3.88955 11.1452 3.85675 10.9366 3.83445C9.65343 3.70195 8.27432 3.68621 7.39152 4.71865C6.51289 5.74584 6.79372 7.13642 6.74645 8.36171H4.72227V10.5551H6.74645V15.8184C3.25974 15.333 0.490392 12.6108 0.0608094 9.31412C-0.445236 5.43755 2.25738 1.81155 6.29462 0.992947C11.6651 -0.0959029 16.5268 4.0614 15.954 9.20261C15.5828 12.5374 12.7703 15.3356 9.25165 15.8184Z"
        fill="white"
        fillOpacity={fillOpacity}
      />
    </svg>
  );
};

export default Facebook;
