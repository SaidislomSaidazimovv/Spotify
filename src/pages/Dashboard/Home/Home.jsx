import React, { useEffect, useState } from "react";
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node";
import { CLIENT_ID } from "../../../hook/useEnv";
import "./Home.css";
import { TailSpin } from "react-loader-spinner";
import HeaderTop from "../../../components/HeaderTop";
import StaticMusicCard from "../../../components/StaticMusicCard";
import MusicCard from "../../../components/MusicCard";

function Home({ accessToken }) {
  const [topMixesMusic, setTopMixesMusic] = useState([]);
  const [madeForYou, setMadeForYou] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [jumpBack, setJumpBack] = useState([]);
  const [uniquelyYours, setUniquelyYours] = useState([]);

  const [jumpBackCount, setJumpBackCount] = useState(4);
  const [recentlyCount, setRecentlyCount] = useState(4);
  const [musicCount, setMusicCount] = useState(4);
  const [musicForYouCount, setMusicForYouCount] = useState(4);
  const [uniquelyYoursCount, setUniquelyYoursCount] = useState(4);
  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
  });
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    axios("https://api.spotify.com/v1/browse/categories/toplists/playlists", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => setTopMixesMusic(res.data.playlists.items))
      .catch((err) => console.log(err));
    axios(
      "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFHOzuVTgTizF/playlists",
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    )
      .then((res) => setMadeForYou(res.data.playlists.items))
      .catch((err) => console.log(err));
    axios(
      "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFQ00XGBls6ym/playlists",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((res) => setRecentlyPlayed(res.data.playlists.items))
      .catch((err) => console.log(err));
    axios(
      "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFLVaM30PMBm4/playlists",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((res) => setJumpBack(res.data.playlists.items))
      .catch((err) => console.log(err));
    axios(
      "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFCbimwdOYlsl/playlists",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((res) => setUniquelyYours(res.data.playlists.items));
  }, [accessToken]);

  return (
    <section
      id="home"
      className="text-white h-screen overflow-y-auto "
    >
      <HeaderTop />
      <div className="mt-[30px] px-[41px]">
        <h1 className="part-heading mb-[29px]">Good afternoon</h1>
        <div className="grid grid-cols-12 gap-[30px] w-full relative">
          {topMixesMusic.length > 0 ? (
            topMixesMusic
              .slice(0, 6)
              .map((mix, index) => <StaticMusicCard accessToken={accessToken} mix={mix} key={index} />)
          ) : (
            <div className="left-1/2 top-1/2 absolute -translate-x-1/2 -translate-y-1/2">
              <TailSpin
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}
        </div>
        <div className="my-[50px]">
          <div className="flex items-center justify-between">
            <h1 className="part-heading mb-[26px] capitalize">made for you</h1>
            <p
              onClick={() =>
                setMusicCount(musicCount == 4 ? topMixesMusic.length : 4)
              }
              className="uppercase hover:underline text-base tracking-[8%] leading-[20.24px] font-bold text-primary-5 cursor-pointer"
            >
              {musicCount == 4 ? 'see all' : 'show less'}
            </p>
          </div>
          <div className="grid grid-cols-12 relative gap-[31px]">
            {topMixesMusic.length > 0 ? (
              topMixesMusic
                .slice(0, musicCount)
                .map((mix, index) => (
                  <MusicCard accessToken={accessToken} mix={mix} key={index} />
                ))
            ) : (
              <div className="left-1/2 top-1/2 absolute -translate-x-1/2 -translate-y-1/2">
                <TailSpin
                  visible={true}
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            )}
          </div>
        </div>
        <div className="my-[50px]">
          <div className="flex items-center justify-between">
            <h1 className="part-heading mb-[26px]">Your top mixes</h1>
            <p
              onClick={() =>
                setMusicForYouCount(
                  musicForYouCount == 4 ? madeForYou.length : 4
                )
              }
              className="uppercase hover:underline text-base tracking-[8%] leading-[20.24px] font-bold text-primary-5 cursor-pointer"
            >
              {musicForYouCount == 4 ? "see all" : "show less"}
            </p>
          </div>
          <div className="grid grid-cols-12 relative gap-[31px]">
            {madeForYou.length > 0 ? (
              madeForYou
                .slice(0, musicForYouCount)
                .map((mix, index) => (
                  <MusicCard mix={mix} accessToken={accessToken} key={index} />
                ))
            ) : (
              <div className="left-1/2 top-1/2 absolute -translate-x-1/2 -translate-y-1/2">
                <TailSpin
                  visible={true}
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            )}
          </div>
        </div>
        <div className="my-[50px]">
          <div className="flex items-center justify-between">
            <h1 className="part-heading mb-[26px] capitalize">
              recently played
            </h1>
            <p
              onClick={() =>
                setRecentlyCount(recentlyCount == 4 ? recentlyPlayed.length : 4)
              }
              className="uppercase hover:underline text-base tracking-[8%] leading-[20.24px] font-bold text-primary-5 cursor-pointer"
            >
              {recentlyCount == 4 ? "seel all" : "show less"}
            </p>
          </div>
          <div className="grid grid-cols-12 relative gap-[31px]">
            {recentlyPlayed.length > 0 ? (
              recentlyPlayed
                .slice(0, recentlyCount)
                .map((mix, index) => (
                  <MusicCard accessToken={accessToken} mix={mix} key={index} />
                ))
            ) : (
              <div className="left-1/2 top-1/2 absolute -translate-x-1/2 -translate-y-1/2">
                <TailSpin
                  visible={true}
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            )}
          </div>
        </div>
        <div className="my-[50px]">
          <div className="flex items-center justify-between">
            <h1 className="part-heading mb-[26px] capitalize">jump back in</h1>
            <p
              onClick={() =>
                setUniquelyYoursCount(
                  uniquelyYoursCount == 4 ? uniquelyYoursCount.length : 4
                )
              }
              className="uppercase hover:underline text-base tracking-[8%] leading-[20.24px] font-bold text-primary-5 cursor-pointer"
            >
              {uniquelyYoursCount == 4 ? 'see all' : 'show less'}
            </p>
          </div>
          <div className="grid grid-cols-12 relative gap-[31px]">
            {uniquelyYours.length > 0 ? (
              uniquelyYours
                .slice(0, uniquelyYoursCount)
                .map((mix, index) => (
                  <MusicCard mix={mix} accessToken={accessToken} key={index} />
                ))
            ) : (
              <div className="left-1/2 top-1/2 absolute -translate-x-1/2 -translate-y-1/2">
                <TailSpin
                  visible={true}
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            )}
          </div>
        </div>
        <div className="my-[50px]">
          <div className="flex items-center justify-between">
            <h1 className="part-heading mb-[26px] capitalize">
              Uniquely yours
            </h1>
            <p
              onClick={() =>
                setJumpBackCount(jumpBackCount == 4 ? jumpBack.length : 4)
              }
              className="uppercase hover:underline text-base tracking-[8%] leading-[20.24px] font-bold text-primary-5 cursor-pointer"
            >
              {jumpBackCount == 4 ? 'see all' : 'show less'}
            </p>
          </div>
          <div className="grid grid-cols-12 relative gap-[31px]">
            {jumpBack.length > 0 ? (
              jumpBack.slice(0, jumpBackCount).map((mix, index) => (
                <MusicCard mix={mix} accessToken={accessToken} key={index} />
              ))
            ) : (
              <div className="left-1/2 top-1/2 absolute -translate-x-1/2 -translate-y-1/2">
                <TailSpin
                  visible={true}
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
