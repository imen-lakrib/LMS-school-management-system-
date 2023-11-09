import { RiLockPasswordLine } from "react-icons/ri";
import { SiGoogleclassroom } from "react-icons/si";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Image from "next/image";
import React, { FC } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { styles } from "@/app/styles/style";
import Link from "next/link";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logoutHandler: any;
};

const avatarDefault = "/assets/img.png";

const SideBarProfile: FC<Props> = ({
  user,
  avatar,
  active,
  setActive,
  logoutHandler,
}) => {
  return (
    <div className="w-full ">
      <div
        onClick={() => setActive(1)}
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
      >
        <Image
          src={
            user.avatar
              ? user.avatar.url
              : avatar
              ? avatar || avatar
              : avatarDefault
          }
          width={10}
          height={10}
          alt=""
          className="w-[30px]  h-[30px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full"
        />

        <h5
          className={`pl-2 800px:block hidden font-Poppins ${styles.textColorWhite}`}
        >
          My Account
        </h5>
      </div>

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} className=" dark:fill-white fill-black" />
        <h5
          className={`pl-2 800px:block hidden font-Poppins ${styles.textColorWhite}`}
        >
          Change Password
        </h5>
      </div>

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 3 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(3)}
      >
        <SiGoogleclassroom size={20} className=" dark:fill-white fill-black" />
        <h5
          className={`pl-2 800px:block hidden font-Poppins ${styles.textColorWhite}`}
        >
          Enrolled Courses
        </h5>
      </div>

      {user.role === "admin" && (
        <Link
          href={"/admin"}
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${
            active === 6 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
          }`}
        >
          <MdOutlineAdminPanelSettings
            size={20}
            className=" dark:fill-white fill-black"
          />
          <h5
            className={`pl-2 800px:block hidden font-Poppins ${styles.textColorWhite}`}
          >
            Admin Dashboard
          </h5>
        </Link>
      )}

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 4 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => logoutHandler()}
      >
        <AiOutlineLogout size={20} className=" dark:fill-white fill-black" />
        <h5
          className={`pl-2 800px:block hidden font-Poppins ${styles.textColorWhite}`}
        >
          Logout
        </h5>
      </div>
    </div>
  );
};

export default SideBarProfile;
