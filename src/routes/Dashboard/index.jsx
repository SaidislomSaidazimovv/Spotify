import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";
import { Home, LikedSongs, Playlist, Search } from "../../pages/Dashboard";
import Navbar from "../../layout/Navbar";
import Panel from "../../layout/Panel";
import { CLIENT_ID } from "../../hook/useEnv";
import { useAuth } from "../../hook/useAuth";
import Playback from "../../components/Playback";

function DashboardRoutes({ code }) {
  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
  });
  const accessToken = useAuth(code);
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);
  return (
    <div className="grid grid-cols-12">
      <Navbar accessToken={accessToken} />
      <main className="col-span-8 h-screen overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home accessToken={accessToken} />} />
          <Route
            path="/search"
            element={<Search accessToken={accessToken} />}
          />
          <Route path="/liked-songs" element={<LikedSongs />} />
          <Route path="/playlist/:id/:token" element={<Playlist />} />
        </Routes>
        <Playback accessToken={accessToken} />
      </main>
      <Panel />
    </div>
  );
}

export default DashboardRoutes;
