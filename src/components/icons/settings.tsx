import React from "react";
import { IconProps } from ".";

const Settings = ({
  className,
  fillOpacity = 0.9,
  onClick,
  size = 22,
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path
        d="M8.99858 0C4.02943 0 0 4.02943 0 8.99858C0 13.9677 4.02943 17.9972 8.99858 17.9972C13.9677 17.9972 17.9972 13.9677 17.9972 8.99858C17.9972 4.02943 13.9706 0 8.99858 0ZM12.8771 11.3934H5.32511C5.01187 11.3934 4.75558 11.1372 4.75558 10.8239C4.75558 10.5107 5.01187 10.2544 5.32511 10.2544H12.8771C13.1903 10.2544 13.4466 10.5107 13.4466 10.8239C13.4466 11.1372 13.1903 11.3934 12.8771 11.3934ZM12.8771 8.6056H5.32511C5.01187 8.6056 4.75558 8.34931 4.75558 8.03607C4.75558 7.72283 5.01187 7.46654 5.32511 7.46654H12.8771C13.1903 7.46654 13.4466 7.72283 13.4466 8.03607C13.4466 8.34931 13.1903 8.6056 12.8771 8.6056Z"
        fill="white"
        fillOpacity={fillOpacity}
      />
    </svg>
  );
};

export default Settings;
