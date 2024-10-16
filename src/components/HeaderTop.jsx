import React from "react";
import { BackIcon, ForwardIcon } from "../assets/images/Icons";
import { useNavigate } from "react-router-dom";

function HeaderTop() {
  const navigate = useNavigate();
  return (
    <header className="sticky py-5 top-0 px-[40px] backdrop-blur z-30 shadow-xl left-0 w-full flex items-center">
      <div className="flex items-center gap-[22px]">
        <div onClick={() => navigate(-1)}>
          <BackIcon />
        </div>
        <div onClick={() => navigate(1)}>
        <ForwardIcon />
        </div>
      </div>
    </header>
  );
}

export default HeaderTop;
