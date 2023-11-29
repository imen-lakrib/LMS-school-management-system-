"use client";

import Header from "../../components/Header";
import Heading from "../../utils/Heading";
import React, { FC, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Loader } from "../../components/Loader/Loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import CourseContent from "@/app/components/Course/CourseContent";

type Props = {
  params: any;
};

const Page: FC<Props> = ({ params }) => {
  const id = params.id;
  const { isLoading, error, data } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (data) {
      const isPurchased = data.user.courses.find(
        (item: any) => item._id === id
      );

      if (!isPurchased) {
        redirect("/");
      }

      if (error) {
        redirect("/");
      }
    }
  }, [data, error]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <CourseContent id={id} user={data.user} />
        </div>
      )}
    </>
  );
};

export default Page;
