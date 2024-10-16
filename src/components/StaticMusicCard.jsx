import React from "react";
import { useNavigate } from "react-router-dom";

function StaticMusicCard({ mix, accessToken }) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/playlist/${mix.id}/${accessToken}`) } className="col-span-6 w-full bg-white/10 hover:bg-white/50 duration-300 flex items-center gap-5 ">
      <img src={mix.images[0].url} width={82} alt="" />
      <p className="capitalize text-[20px] leadig-[25.3px] tracking-[1%] font-bold line-clamp-1">
        {mix.name}
      </p>
    </div>
  );
}

export default StaticMusicCard;
