import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import React, { FC, useState } from "react";
import { Loader } from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../Footer";
import CourseDetails from "./CourseDetails";

type Props = { id: string };

const CourseDetailsPage: FC<Props> = ({ id }) => {
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={` ${data?.course.name}- LMS`}
            description="school management system"
            keywords={data?.course?.tags}
          />
          <Header
            open={open}
            setOpen={setOpen}
            activeItem={1}
            setRoute={setRoute}
            route={route}
          />
          <CourseDetails data={data.course} />
          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
