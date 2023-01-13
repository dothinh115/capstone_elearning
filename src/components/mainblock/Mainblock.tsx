import React from "react";

type Props = {
  headerContent?: string;
  value: any;
  icon?: string;
  iconColor?: string;
};

const Mainblock = ({ headerContent, value, icon, iconColor }: Props) => {
  return (
    <div className="main-block">
      {headerContent && (
        <div className="main-block-header">
          <h1>{headerContent}</h1>
        </div>
      )}

      <div className="main-block-content">
        {icon && (
          <i
            style={{ marginRight: "5px", color: iconColor, fontSize: "20px" }}
            className={`fa-solid ${icon}`}
          ></i>
        )}
        {value}
      </div>
    </div>
  );
};

export default Mainblock;
