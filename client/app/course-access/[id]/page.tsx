"use client";

import Header from "../../components/Header";
import Heading from "../../utils/Heading";
import React, { FC, useState } from "react";

type Props = {
  params: any;
};

const Page: FC<Props> = ({ params }) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(3);
  const [route, setRoute] = useState("Login");
  const id = params.id;
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
