import React from "react";
import { UserPlus, UsersInfo, XmarkIcon } from "../assets/images/Icons";
import Button from "../components/Button";

function Panel() {
  return (
    <aside className="col-span-2 h-screen overflow-y-auto px-[20px] pt-[29px] bg-black">
      <header className="flex items-center justify-between mb-[39px]">
        <h1 className="text-primary-10 font-bold leading-[25.3px] tracking-[1%] text-[20px]">
          Friend Activity
        </h1>
        <div className="flex items-center gap-3">
          <UserPlus />
          <XmarkIcon />
        </div>
      </header>

      <p className="font-[450] text-lg !leading-6 text-primary-10">
        Let friends and followers on Spotify see what you’re listening to.
      </p>

      <div className="mt-[23px] mb-[31px] flex flex-col gap-5">
        <UsersInfo />
        <UsersInfo />
        <UsersInfo />
      </div>

      <p className="font-[450] text-lg mb-[23px] !leading-6 text-primary-10">
        Go to Settings &#x2192; Social and enable “Share my listening activity on
        Spotify.’ You can turn this off at any time.
      </p>
      <Button/>
    </aside>
  );
}

export default Panel;
