"use client";
import React, { FC, useState } from "react";
import Protected from "../components/hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import AdminProtected from "../components/hooks/adminProtected";
import AdminSidebar from "./AdminSidebar";
import DashboradHero from "./DashboradHero";

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
        <div className="flex h-[200vh]">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>

          <div className="w-[85%]">
            <DashboradHero isDashboard={true} />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
