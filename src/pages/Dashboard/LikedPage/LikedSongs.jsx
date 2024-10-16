import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./liked.css";
import HeaderTop from "../../../components/HeaderTop";
import LikedImg from "../../../assets/images/liked.png";
import LikedOwner from "../../../assets/images/liked-owner.png";
import { GoDotFill } from "react-icons/go";
import {
  ClockIcon,
  DownButton,
  DownloadButton,
  LikeButton,
  OptionButton,
  PLayMusicButton,
  SearchIcon,
} from "../../../assets/images/Icons";
import PlayListMusicCard from "../../../components/PlayListMusicCard";
import LikedPLaylistCard from "../../../components/LikedPlaylistCard";

function LikedList() {
  const likedArray = useSelector((state) => state.likedArray);
  const dispatch = useDispatch(); 
  

  return (
    <section id="liked" className="w-full text-white h-screen overflow-y-auto">
      <HeaderTop />
      <main className="px-[40px]">
        <div className="mt-[28px] flex items-end gap-8">
          <img src={LikedImg} width={297} height={297} alt="" />
          <div className="flex flex-col text-white">
            <p className="uppercase font-medium text-base !leading-[20.24px] tracking-[-2%]">
              public <br /> playlist
            </p>
            <h1 className="text-[90px] !leading-[154.33px] tracking-[-6%] font-extrabold">
              Liked Songs
            </h1>
            <div className="flex items-center gap-2">
              <img src={LikedOwner} alt="" />
              <p className="font-bold text-lg">davedirect3</p>
              <GoDotFill />
              <p className="text-gray-400 ">
                {likedArray.length} {likedArray.length > 0 ? "songs" : "song"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-10">
          <div className="flex items-center gap-4">
            <PLayMusicButton className="w-14 h-14 rounded-full bg-green-500 text-black hover:bg-green-400 transition" />
            <LikeButton className="w-10 h-10 hover:scale-105 transition-transform" />
            <DownloadButton className="w-10 h-10 hover:scale-105 transition-transform" />
            <OptionButton className="w-10 h-10 hover:scale-105 transition-transform" />
          </div>
          <div className="flex items-center gap-4">
            <SearchIcon className="w-8 h-8" />
            <div className="flex items-center gap-2">
              <p>Custom Order</p>
              <DownButton className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="grid grid-cols-12 gap-4 border-b border-gray-600 pb-2 text-sm text-gray-400 uppercase">
            <div className="flex gap-4 items-center col-span-5">
              <p className="min-w-[24px]">#</p>
              <p>Title</p>
            </div>
            <p className="col-span-4">Album</p>
            <ClockIcon />
          </div>

          <div className="flex flex-col mt-4">
            {likedArray.map((track, index) => <LikedPLaylistCard track={track} index={index} key={track.track.id}/>)}
          </div>
        </div>
      </main>
    </section>
  );
}

export default LikedList;