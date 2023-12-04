"use client";
import React, { FC, useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogoutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import CourseCard from "../Course/CourseCard";
import { useGetCourseContentforUserQuery } from "@/redux/features/courses/coursesApi";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const { data, isLoading } = useGetCourseContentforUserQuery(undefined, {});
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [logout, setLogout] = useState(false);
  const [courses, setCourses] = useState<any>([]);

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

  useEffect(() => {
    if (data) {
      const filtredCourses = user.courses
        .map((userCourse: any) =>
          data.courses.find((course: any) => course._id === userCourse._id)
        )
        .filter((course: any) => course !== undefined);

      setCourses(filtredCourses);
      console.log("courses", courses);
    }
  }, [data, courses, user]);
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
        {active === 2 && <ChangePassword user={user} />}

        {/* /// */}

        {active === 3 && (
          <div className="w-full pl-7 px-2 800px:px-10 800px:pl-8">
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-3 xl:gap-[35px]">
              {courses &&
                courses.map((item: any, index: number) => (
                  <CourseCard
                    item={item}
                    key={index}
                    user={user}
                    isProfile={true}
                  />
                ))}
            </div>
            {courses.lenght === 0 && (
              <h1 className="text-center text-[18px] font-Poppins">
                You dont have any purchased courses!
              </h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Profile;
