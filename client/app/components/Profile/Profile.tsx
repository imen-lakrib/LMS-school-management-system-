"use client";
import React, { FC, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogoutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [logout, setLogout] = useState(false);

  const {
    /* Destructure the necessary properties */
  } = useLogoutQuery(undefined, {
    skip: !logout,
  });

  const logoutHandler = async () => {
    try {
      setLogout(true);

      await signOut();
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  if (typeof window !== "undefined") {
    // for sticky
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }
  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-white bg-opacity-90 border dark:border-[#ffffff1d] border-[#2d27270f] rounded-[5px] dark:shadow-sm  shadow-md mt-[80px] mb-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        } left-[30px]`}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logoutHandler={logoutHandler}
        />
      </div>{" "}
      {/* content conditional displaying */}
      <div className="text-center w-full mt-[80px] mb-[80px]">
        {active === 1 && <ProfileInfo user={user} avatar={avatar} />}
      </div>
    </div>
  );
};

export default Profile;
