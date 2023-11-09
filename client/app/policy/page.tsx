"use client";

import React, { FC, useState } from "react";

import Heading from "../utils/Heading";
import Header from "../components/Header";

type Props = {};

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(3);
  const [route, setRoute] = useState("Login");
  return (
    <div>
      <Heading
        title={`Policy LMS`}
        description="school management system"
        keywords="school, management, system"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
    </div>
  );
};

export default Page;
