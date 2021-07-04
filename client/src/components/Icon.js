import React from "react";

function withIcon(icon) {
  const Icon = ({
    viewBox = "0 0 24 24",
    className = "stroke-current",
    fill = "none",
    color = "text-gray-600",
    size = "h-6 w-6",
  }) => {
    return (
      <svg
        viewBox={viewBox}
        fill={fill}
        dangerouslySetInnerHTML={{ __html: icon }}
        className={`flex-shrink-0 ${className} ${color} ${size} stroke-2`}
      ></svg>
    );
  };

  return Icon;
}

export default withIcon;
