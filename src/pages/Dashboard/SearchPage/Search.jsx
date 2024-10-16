import React, { useContext, useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { CLIENT_ID } from "../../../hook/useEnv";
import "./style.css";
import { SearchIcon } from "../../../assets/images/Icons";
import useDebounce from "../../../hook/useDebounce";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../context/Context";

function Search({ accessToken }) {
  const { setPlay, setPlaying, play, playing } = useContext(Context);
  const [playlist, setPlaylist] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [artists, setArtists] = useState([]);
  const searchTextDebounce = useDebounce(searchText, 1000);
  const navigate = useNavigate();

  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
  });

  useEffect(() => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
    }
  }, [accessToken, searchText, searchTextDebounce]);

  useEffect(() => {
    if (searchTextDebounce && accessToken) {
      spotifyApi
        .searchPlaylists(searchTextDebounce)
        .then((res) => {
          setPlaylist(res.body.playlists.items);
        })
        .catch((err) => {
          console.error("Error fetching playlists:", err);
        });

      spotifyApi
        .searchTracks(searchTextDebounce)
        .then((res) => {
          setTracks(res.body.tracks.items);
        })
        .catch((err) => {
          console.error("Error fetching tracks:", err);
        });
      spotifyApi
        .searchArtists(searchTextDebounce)
        .then((res) => setArtists(res.body.artists.items));
    }
  }, [searchTextDebounce, accessToken, searchText]);

  return (
    <section id="search" className="h-screen overflow-y-auto text-white">
      <main className="px-[40px]">
        <div className="rounded-full flex gap-3 items-center p-3 mt-3 bg-black">
          <p className="scale-[.6]">
            <SearchIcon />
          </p>
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            className="bg-transparent w-full outline-none"
            placeholder="Enter playlist name..."
          />
        </div>
        <div className="grid grid-cols-12 mt-10 gap-4">
          <div className="col-span-6 flex flex-col gap-2 h-[300px] overflow-y-auto p-5 bg-black rounded-2xl">
            <p className="text-3xl font-semibold">Playlists</p>

            {playlist.length > 0 ? (
              <div
                onClick={() =>
                  navigate(`/playlist/${playlist[0]?.id}/${accessToken}`)
                }
                className="col-span-6 p-5 bg-black rounded-2xl cursor-pointer"
              >
                <img
                  src={playlist[0]?.images[0]?.url}
                  width={170}
                  alt="Playlist"
                />
                <p className="text-3xl mt-5 font-semibold">
                  {playlist[0]?.name}
                </p>
              </div>
            ) : (
              <div className="bg-black rounded-2xl">
                <p>No Playlist</p>
              </div>
            )}
          </div>
          <div className="col-span-6 flex flex-col gap-2 h-[300px] overflow-y-auto p-5 bg-black rounded-2xl">
            <p className="text-3xl font-semibold">Tracks</p>
            {tracks.length > 0 ? (
              tracks.map((track, index) => (
                <div
                  onClick={() => {
                    setPlay(track?.uri);
                    setPlaying(true);
                  }}
                  key={track.id}
                  className="flex justify-between items-center p-2 bg-white/40 rounded-md"
                >
                  <img
                    src={
                      track?.album?.images[0]?.url ||
                      "https://placehold.co/70x70?text=No+Image"
                    }
                    width={70}
                    alt="Album cover"
                  />
                  <p>{track?.name}</p>
                </div>
              ))
            ) : (
              <div className="bg-black rounded-2xl">
                <p>No Tracks</p>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-12 mt-10">
          <div className="col-span-12 bg-black rounded-2xl p-5">
            <p className="text-3xl font-semibold">Artists</p>
            <div className="mt-5 flex overflow-y-auto">
              {artists.length > 0 ? (
                artists.map((artist, index) => (
                  <div
                    className="min-w-[250px] p-2 rounded-md duration-200 flex items-center flex-col hover:bg-white/50 cursor-pointer"
                    key={index}
                  >
                    <img
                      className="mx-auto"
                      width={170}
                      src={
                        artist.images[0]?.url ||
                        "https://placehold.co/170x170?text=No+Image"
                      }
                      alt=""
                    />
                    <h1 className="mt-3 font-medium text-center text-xl">
                      {artist.name}
                    </h1>
                  </div>
                ))
              ) : (
                <p>No Artist</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}

export default Search;
