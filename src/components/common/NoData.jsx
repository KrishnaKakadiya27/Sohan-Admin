import React from "react";
import useWindowHeight from "../../customHooks/useWindowHeight";

const NoData = () => {
  const windowHeight = useWindowHeight();
  return (
    <div
      className="flex justify-center items-center border-[1px] border-[#D0D0D0] text-[#9E9E9E] h-full p-[20px]"
      style={{
        height: `${windowHeight - 450}px`,
      }}
    >
      No data available in table
    </div>
  );
};

export default NoData;
