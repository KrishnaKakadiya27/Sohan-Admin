import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import useWindowHeight from "../../customHooks/useWindowHeight";

export default function CircularIndeterminate() {
  const windowHeight = useWindowHeight();

  return (
    <div
      className="flex justify-center items-center text-center border-[1px] border-[#D0D0D0]  text-[#9E9E9E] p-[20px]"
      style={{
        height: `${windowHeight - 450}px`,
      }}
    >
      <CircularProgress color="black" />
    </div>
  );
}
