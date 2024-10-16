import React, { useState, useEffect, useContext } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { addArray } from "../store/LikeSlice";
import { useDispatch } from "react-redux";
import { Context } from "../context/Context";

function PlayListMusicCard({ index, track }) {
  function formatDuration(durationMs) {
    const seconds = Math.floor(durationMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${formattedSeconds}`;
  }

  const [liked, setLiked] = useState(
    JSON.parse(window.localStorage.getItem(`likedState-${track?.track?.id}`)) ||
      false
  );
  const dispatch = useDispatch();
  const { setPlay, setPlaying } = useContext(Context);

  const handleLike = () => {
    setLiked(true);
    dispatch(addArray(track)); 
  };

  useEffect(() => {
    window.localStorage.setItem(
      `likedState-${track?.track?.id}`,
      JSON.stringify(liked)
    );
  }, [liked, track]);

  return (
<div
  className="grid grid-cols-12 gap-4 items-center p-3 rounded-lg hover:bg-gray-800 cursor-pointer transition duration-200"
  key={index}
  onClick={() => {
    setPlaying(true);
    setPlay(track?.track?.uri);
  }}
>
  <div className="col-span-5 flex items-center gap-4">
    <p className="text-gray-400">{index + 1}</p>
    <img
      className="w-12 h-12 rounded-md"
      src={
        track?.track?.album?.images[0]?.url ||
        "https://placehold.co/40x40?text=No+Image"
      }
      alt="Album cover"
    />
    <div className="flex flex-col">
      <p className="text-white font-medium line-clamp-1">
        {track?.track?.name}
      </p>
      <p className="text-gray-400 text-sm line-clamp-1">
        {track?.track?.artists.map((artist) => artist.name).join(", ")}
      </p>
    </div>
  </div>

  <p className="col-span-3 text-primary-5 truncate">
    {track?.track?.album?.name}
  </p>

  <div className="col-span-2 text-gray-400 text-sm">
    {formatDuration(track?.track?.duration_ms)}
  </div>

  <div
    className="col-span-1 flex justify-end"
    onClick={(e) => {
      e.stopPropagation(); 
      handleLike();
    }}
  >
    {liked ? (
      <button className="text-green-500 transition-transform transform hover:scale-110">
        <FaHeart size={18} />
      </button>
    ) : (
      <button className="text-gray-400 hover:text-white transition-colors">
        <FaRegHeart size={18} />
      </button>
    )}
  </div>
</div>

  );
}

export default PlayListMusicCard;
