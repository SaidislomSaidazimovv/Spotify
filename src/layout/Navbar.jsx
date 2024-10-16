import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  LibraryIcon,
  LikedSongs,
  SearchIcon,
  SubstractIcon,
} from "../assets/images/Icons";
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node";

function Navbar({accessToken}) {
  const navigate = useNavigate()
  const spotifyApi = new SpotifyWebApi()
  const [artistsNames, setAtristsNames] = useState([])
  useEffect(() => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
      axios('https://api.spotify.com/v1/browse/categories/toplists/playlists', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }).then(res => {
        const artistNames = res.data.playlists.items.filter(item => item.name);
        setAtristsNames(artistNames);
      }).catch(err => {
        console.error('Error fetching playlists:', err);
      });
    }
  }, [accessToken]);
 

  return (
    <aside className="col-span-2 h-screen bg-black overflow-y-auto">
      <nav className="flex flex-col gap-5 text-primary px-[30px] pt-[70px]">
        <NavLink to={'/'} className={"flex items-center gap-[20px]"}>
          <HomeIcon />
          <p className="nav-text">Home</p>
        </NavLink>
        <NavLink to={'/search'} className={"flex items-center gap-[20px]"}>
          <SearchIcon />
          <p className="nav-text">Search</p>
        </NavLink>
        <div className={"flex items-center gap-[20px]"}>
          <LibraryIcon />
          <p className="nav-text">Your Library</p>
        </div>
      </nav>
      <nav className="mt-[49px] flex flex-col gap-5 text-primary px-[30px]">
        <div className={"flex items-center gap-[20px]"}>
          <SubstractIcon />
          <p className="nav-text">Create Playlist</p>
        </div>
        <NavLink to={'/liked-songs'} className={"flex items-center gap-[20px] text-white"}>
          <LikedSongs/>
          <p className="nav-text">Liked Songs</p>
        </NavLink>
      </nav>
      <div className="mt-[43px] text-primary-5 flex flex-col gap-[18px] px-[30px] text-lg">
        {artistsNames.map((item, index) => <p key={index} onClick={() => navigate(`/playlist/${item.id}/${accessToken}`)} className="line-clamp-1 font-[450] leading-[22.77px] cursor-pointer hover:text-white hover:underline">{item.name}</p>)}
      </div>
    </aside>
  );
}

export default Navbar;
