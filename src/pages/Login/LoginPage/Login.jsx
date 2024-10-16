import React from "react";
import "./Login.css";
import { FaSpotify } from "react-icons/fa";
import { CLIENT_ID } from "../../../hook/useEnv";

function Login() {
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=http://localhost:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-recently-played`
  return (
    <div className="login h-screen flex items-center justify-center">
      <a
        href={AUTH_URL}
        className="w-[250px] text-center p-3 flex items-center justify-center gap-2 rounded-full bg-green-600 hover:scale-125 duration-300 text-white font-bold capitalize"
      >
        {" "}
        <FaSpotify /> <p> login to spotify</p>
      </a>
    </div>
  );
}

export default Login;
