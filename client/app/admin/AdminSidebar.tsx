"use client";
import { useTheme } from "next-themes";
import {
  AddAPhotoOutlined,
  AddCircleOutline,
  AddToDrive,
  ArrowBackIos,
  ArrowForwardIos,
  BarChartOutlined,
  ExitToApp,
  Groups,
  Home,
  LiveTvOutlined,
  ManageHistory,
  MapOutlined,
  PeopleOutline,
  Quiz,
  ReceiptOutlined,
  Settings,
  Web,
  Wysiwyg,
} from "@mui/icons-material";
import { Box, Typography, IconButton } from "@mui/material";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { MenuItem, ProSidebar, Menu } from "react-pro-sidebar";
import { useSelector } from "react-redux";

// import {} from "./Icon.tsx"

import "react-pro-sidebar/dist/css/styles.css";
import Image from "next/image";

interface itemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
}

const Item: FC<itemProps> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography className="!text-[16px] !font-Poppins">{title}</Typography>
      <Link href={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setLogout] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [selected, setSelected] = useState("Dashboard");

  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const logoutHandler = () => {
    setLogout(true);
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${
            theme === "dark" ? "#111C43 !important" : "#fff !important"
          }`,
        },

        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },

        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },

        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },

        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          opacity: 1,
        },

        "& .pro-menu-item": {
          color: `${theme !== "dark" && "#000"}`,
        },
      }}
      className="!bg-white dark:bg-[#111C43]"
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: isCollapsed ? "0%" : "16%",
        }}
      >
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ArrowForwardIos /> : undefined}
            style={{
              margin: "10px 0 20px 0",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Link href="/">
                  <h3 className="text-[25px] font-Poppins uppercase dark:text-white text-black">
                    LMS
                  </h3>
                </Link>

                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="inline-block"
                >
                  <ArrowBackIos className="text-balck dark:text-white" />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                  alt="profile-user"
                  width={100}
                  height={100}
                  src={user.avatar ? user.avatar.url : avatarDefault}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    border: "3px solid #5b6fe6",
                    width: 100,
                    height: 100,
                  }}
                />
              </Box>

              <Box textAlign="center">
                <Typography
                  variant="h4"
                  className="!text-[20px] text-black dark:text-[#ffffffc1]"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user?.name}
                </Typography>

                <Typography
                  variant="h4"
                  className="!text-[20px] text-black dark:text-[#ffffffc1]"
                  sx={{ m: "10px 0 0 0" }}
                >
                  - {user?.role}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<Home />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              className="!text-[18px] text-black dark:text-white capitalize !font-[400]"
              sx={{ m: "15px 0 5px 20px" }}
            >
              {" "}
              {!isCollapsed && "Data"}
            </Typography>

            <Item
              title="Users"
              to="/admin/users"
              icon={<Groups />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices"
              to="/admin/invoices"
              icon={<ReceiptOutlined />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              className="!text-[18px] text-black dark:text-white capitalize !font-[400]"
              sx={{ m: "15px 0 5px 20px" }}
            >
              {" "}
              {!isCollapsed && "Content"}
            </Typography>

            <Item
              title="Create Course"
              to="/admin/createCourse"
              icon={<AddCircleOutline />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Live Courses"
              to="/admin/courses"
              icon={<LiveTvOutlined />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              className="!text-[18px] text-black dark:text-white capitalize !font-[400]"
              sx={{ m: "15px 0 5px 20px" }}
            >
              {" "}
              {!isCollapsed && "Customization"}
            </Typography>
            <Item
              title="Hero"
              to="/admin/hero"
              icon={<Web />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ"
              to="/admin/faq"
              icon={<Quiz />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Categories"
              to="/admin/categories"
              icon={<Wysiwyg />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              className="!text-[18px] text-black dark:text-white capitalize !font-[400]"
              sx={{ m: "15px 0 5px 20px" }}
            >
              {" "}
              {!isCollapsed && "Controllers"}
            </Typography>
            <Item
              title="Manage Team"
              to="/admin/team"
              icon={<PeopleOutline />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              className="!text-[18px] text-black dark:text-white capitalize !font-[400]"
              sx={{ m: "15px 0 5px 20px" }}
            >
              {" "}
              {!isCollapsed && "Analytics"}
            </Typography>

            <Item
              title="Courses Analytics"
              to="/admin/courses-analytics"
              icon={<BarChartOutlined />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Orders Analytics"
              to="/admin/orders-analytics"
              icon={<MapOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Users Analytics"
              to="/admin/users-analytics"
              icon={<ManageHistory />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              className="!text-[18px] text-black dark:text-white capitalize !font-[400]"
              sx={{ m: "15px 0 5px 20px" }}
            >
              {" "}
              {!isCollapsed && "Extras"}
            </Typography>
            <Item
              title="Settings"
              to="/admin/settings"
              icon={<Settings />}
              selected={selected}
              setSelected={setSelected}
            />

            <div onClick={logoutHandler}>
              <Item
                title="Logout"
                to="/"
                icon={<ExitToApp />}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
          </Box>
        </Menu>
      </ProSidebar>
      ;
    </Box>
  );
};

export default Sidebar;
