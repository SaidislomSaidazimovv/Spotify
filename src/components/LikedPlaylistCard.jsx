import React from "react";
import { FaHeart } from "react-icons/fa";

function LikedPLaylistCard({ index, track }) {
  return (
    <div
      key={index}
      className="grid grid-cols-12 gap-4 items-center hover:bg-gray-800 p-2 rounded-lg"
    >
      <div className="flex items-center gap-4 col-span-5">
        <p className="text-gray-400">{index + 1}</p>
        <div className="flex items-center gap-3">
          <img
            className="w-10 h-10 rounded-md"
            src={
              track?.track?.album?.images[0]?.url ||
              "https://placehold.co/40x40?text=No+Image"
            }
            alt="Album cover"
          />
          <div>
            <p className="">{track?.track?.name}</p>
            <p className="text-xs text-gray-400">
              {track?.track?.artists.map((artist) => artist.name).join(", ")}
            </p>
          </div>
        </div>
      </div>
      <p className="line-clamp-2 col-span-4 text-primary-5">
        {track?.track?.album?.name}
      </p>
      <div className="flex items-center">
        <p>
          <button className="text-green-500">
            <FaHeart />
          </button>
        </p>
        
      </div>
    </div>
  );
}

export default LikedPLaylistCard;
