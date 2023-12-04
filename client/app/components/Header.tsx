"use client";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Verification from "./Auth/Verification";
import { useSelector } from "react-redux";
import Image from "next/image";

import avatar from "../../public/assets/img.png";
import { useSession } from "next-auth/react";
import {
  useLogoutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { styles } from "../styles/style";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  setRoute: (route: string) => void;
  route: string;
};
const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);

  // const { user } = useSelector((state: any) => state.auth);
  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, {});
  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);

  const {
    /* Destructure the necessary properties */
  } = useLogoutQuery(undefined, {
    skip: !logout,
  });
  useEffect(() => {
    if (!isLoading) {
      if (!userData) {
        if (data) {
          socialAuth({
            email: data?.user?.email,
            name: data?.user?.name,
            avatar: data?.user?.image,
          });
        }
      }
      if (data === null) {
        if (isSuccess) {
          toast.success("Login Success!");
        }
      }
      if (data === null && !isLoading && !userData) {
        setLogout(true);
      }
    }
  }, [data, userData, isLoading]);

  if (typeof window !== "undefined") {
    // for sticky
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSideBar(false);
    }
  };

  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500   "
            : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
        }`}
      >
        <div className="w-[95%] 800px:w-[90%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                className={`text-[25px] font-Poppins font-[500] ${styles.textColorWhite}`}
                href={"/"}
              >
                {" "}
                LMS
              </Link>
            </div>

            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {/* only for mobile */}
              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className={`cursor-pointer ${styles.textColorWhite}`}
                  onClick={() => setOpenSideBar(true)}
                />
              </div>

              {userData ? (
                <Link className="hidden 800px:block" href={"/profile"}>
                  <Image
                    src={
                      userData.user.avatar ? userData.user.avatar.url : avatar
                    }
                    alt="Your Alt Text"
                    className=" hidden 800px:block rounded-full  ml-[20px]  1500px:w-[10] 1100px:w-[8] w-[30px] h-[30px] "
                    width={30}
                    height={30}
                    style={{
                      border: activeItem === 5 ? "2px solid #ffc107" : "none",
                    }}
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className={`hidden 800px:block cursor-pointer ${styles.textColorWhite}`}
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </div>
        </div>

        {/* mobile sidebar  */}
        {openSideBar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[999999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[9999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
              <NavItems activeItem={activeItem} isMobile={true} />

              <div className="px-5">
                {userData ? (
                  <Link href={"/profile"}>
                    <Image
                      src={
                        userData.user.avatar ? userData.user.avatar.url : avatar
                      }
                      alt="Your Alt Text"
                      className="rounded-full  1500px:w-[12] 1100px:w-[8] w-[30px]  h-[30px] "
                      width={30}
                      height={30}
                      style={{
                        border: activeItem === 5 ? "2px solid #ffc107" : "none",
                      }}
                    />
                  </Link>
                ) : (
                  <HiOutlineUserCircle
                    size={25}
                    className={`block 800px:hidden cursor-pointer ${styles.textColorWhite}`}
                    onClick={() => setOpen(true)}
                    style={{
                      border: activeItem === 5 ? "2px solid #ffc107" : "none",
                    }}
                  />
                )}
              </div>

              <br />

              <br />
              <p className={`text-[16px] px-2 pl-5 ${styles.textColorWhite}`}>
                Copyright c 2024 LMS
              </p>
            </div>
          </div>
        )}
      </div>
      {route === "Login" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
              refetch={refetch}
            />
          )}
        </>
      )}
      {route === "Sign-Up" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={SignUp}
            />
          )}
        </>
      )}

      {route === "Verification" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
