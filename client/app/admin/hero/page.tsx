"use client";
import AdminProtected from "../../components/hooks/adminProtected";
import Heading from "../../utils/Heading";
import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import AdminSidebar from "../AdminSidebar";
import DashboradHero from "../DashboradHero";
import CreateCourse from "../../components/Admin/Course/CreateCourse";
import DashboardHeader from "../DashboardHeader";
import AllCourses from "../../components/Admin/Course/AllCourses";
import EditHero from "@/app/components/Admin/Hero/EditHero";
type Props = {};

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div>
      <AdminProtected>
        <Heading
          title={`welcome ${user?.name} to Admin -LMS`}
          description="school management system"
          keywords="school, management, system"
        />
        <div className="flex h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>

          <div className="w-[85%]">
            <DashboradHero />
            <EditHero />

            hero
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
