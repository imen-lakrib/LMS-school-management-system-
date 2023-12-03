"use client";

import React, { FC, useEffect, useState } from "react";

import Heading from "../utils/Heading";
import Header from "../components/Header";
import { useSearchParams } from "next/navigation";
import { useGetAllCoursesForEveryoneQuery } from "@/redux/features/courses/coursesApi";
import { useGetLayoutQuery } from "@/redux/features/layout/layoutApi";
import { Loader } from "../components/Loader/Loader";
import Footer from "../components/Footer";
import { styles } from "../styles/style";
import CourseCard from "../components/Course/CourseCard";

type Props = {};

const Page: FC<Props> = (props) => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title");
  const { data, isLoading } = useGetAllCoursesForEveryoneQuery(undefined, {});
  const { data: categoriesData } = useGetLayoutQuery("Categories", {});
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(3);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (category === "All") {
      setCourses(data?.courses);
      console.log("courses", data);
    }
    if (category !== "All") {
      setCourses(
        data?.courses.filter((item: any) => item.categories === category)
      );
    }

    if (search) {
      setCourses(
        data?.courses.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [data, category, search]);

  const categories = categoriesData?.layout.categories;

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Heading
            title={`All Courses`}
            description="school management system"
            keywords="school, management, system"
          />{" "}
          <Header
            open={open}
            setOpen={setOpen}
            activeItem={1}
            setRoute={setRoute}
            route={route}
          />
          <div className="w-[95%] 800px:w-[85%] m-auto min-h-[70vh]">
            <br />
            <div className="w-full flex items-center flex-wrap">
              <div
                className={`h-[35px] ${
                  category === "All" ? "bg-[crimson]" : "bg-[#5050cb]"
                } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                onClick={() => setCategory("All")}
              >
                {" "}
                All
              </div>

              {categories &&
                categories.map((item: any, index: number) => (
                  <div key={index}>
                    <div
                      className={`h-[35px] ${
                        category === item.title
                          ? "bg-[crimson]"
                          : "bg-[#5050cb]"
                      } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                      onClick={() => setCategory(item.title)}
                    >
                      {item.title}
                    </div>
                  </div>
                ))}
            </div>

            {courses && courses.length === 0 && (
              <p
                className={`${styles.label} justify-center main-h-[50vh] flex items-center `}
              >
                {search
                  ? "No courses found! "
                  : "No courses found in this category. Please try another one!"}
              </p>
            )}
            <br />
            <br />

            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
              {courses &&
                courses.map((item: any, index: number) => (
                  <CourseCard item={item} key={index} />
                ))}
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Page;
