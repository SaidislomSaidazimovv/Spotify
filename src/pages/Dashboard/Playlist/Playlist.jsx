import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Playlist.css";
import HeaderTop from "../../../components/HeaderTop";
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

function Playlist() {
  const { id, token } = useParams();
  const [singlePlaylist, setSingePlaylist] = useState([]);

  useEffect(() => {
    axios(`https://api.spotify.com/v1/playlists/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      res.data.tracks.items.forEach((item) => {
        item.isLiked = false;
      });
      setSingePlaylist(res.data);
    });
  }, [id, token]);

  return (
    <section id="playlist" className="text-white  h-screen overflow-y-auto">
      <HeaderTop />
      <main className="px-[40px]">
        <div className="mt-[28px] flex flex-wrap md:flex-nowrap gap-6">
          <img
            className="w-[297px] rounded-lg shadow-lg"
            src={
              singlePlaylist?.images?.[0]?.url ||
              "https://placehold.co/297x297?text=No+Image"
            }
            alt="Playlist cover"
          />
          <div className="flex-1">
            <p className="uppercase text-sm tracking-wider font-medium">
              Public Playlist
            </p>
            <h1 className="text-6xl font-bold w-full line-clamp-1 mt-2">
              {singlePlaylist?.name}
            </h1>
            <div className="flex items-center gap-2 mt-3">
              {singlePlaylist?.tracks?.items.slice(0, 2).map((item, index) => (
                <span key={index} className="text-white">
                  {item?.track?.artists[0]?.name || "Unknown Artist"},
                </span>
              ))}
              <p className="text-primary-5">and more</p>
            </div>
            <div className="flex items-center text-gray-400 mt-2">
              Made for
              <span className="text-white font-medium ml-1">
                {singlePlaylist?.owner?.display_name}
              </span>
              <GoDotFill className="mx-2" />
              <span>{singlePlaylist?.tracks?.items?.length} songs</span>
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
          <div className="grid grid-cols-12 gap-4 border-b border-gray-600 pb-3 text-xs text-gray-400 uppercase tracking-wide">
            <div className="flex gap-4 items-center col-span-5">
              <p className="min-w-[24px] text-center">#</p>
              <p className="text-sm">Title</p>
            </div>
            <p className="col-span-2 text-sm">Album</p>
            <div className="flex items-center justify-end col-span-2">
              <ClockIcon className="w-5 h-5 text-gray-400" />
            </div>
            <div className="col-span-2 text-right">Action</div>
          </div>

          <div className="flex flex-col mt-4">
            {singlePlaylist?.tracks?.items?.map((track, index) => (
              <PlayListMusicCard index={index} track={track} key={index + 1} />
            ))}
          </div>
        </div>
      </main>
    </section>
  );
}

export default Playlist;
