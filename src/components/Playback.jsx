import React, { useContext } from "react";
import SpotifyWebPlayer from "react-spotify-web-playback";
import { Context } from "../context/Context";

function Playback({ accessToken }) {
  const {playing, play, setPlaying} = useContext(Context)

  return (
    <SpotifyWebPlayer
      play={playing}
      token={accessToken}
      uris={play ? [play] : []}
      callback={(state) => {
        if (!state.isPlaying) {
          setPlaying(false);
        }
      }}
    />
  );
}

export default Playback;