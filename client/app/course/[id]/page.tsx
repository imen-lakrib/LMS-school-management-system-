"use client";

import CourseDetailsPage from "../../components/Course/CourseDetailsPage";
import React, { FC, useState } from "react";

const Page = ({ params }: any) => {
  return (
    <div>
      <CourseDetailsPage id={params.id} />
    </div>
  );
};

export default Page;
