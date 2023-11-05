"use client";
import Link from "next/link";
import React, { FC, useState } from "react";
import NavItems from "../utils/NavItems";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi"
type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: number;
};
const Header: FC<Props> = ({ activeItem, setOpen }) => {
    const [active, setActive] = useState(false);
    const [openSideBar, setOpenSideBar] = useState(false);

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
    return (
        <div className="w-full relative">
            <div
                className={`${active
                    ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500   "
                    : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
                    }`}
            >
                <div className="w-[95%] 800px:w-[90%] m-auto py-2 h-full">
                    <div className="w-full h-[80px] flex items-center justify-between p-3">
                        <div>
                            <Link
                                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
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
                                    className="cursor-pointer dark:text-white text-black"
                                    onClick={() => setOpenSideBar(true)}
                                />
                            </div>
                            <HiOutlineUserCircle
                                size={25}
                                className="cursor-pointer dark:text-white text-black"
                                onClick={() => setOpen(true)}
                            />
                        </div>
                    </div>
                </div>

                {/* mobile sidebar  todo*/}
            </div>
        </div>
    );
};

export default Header;
