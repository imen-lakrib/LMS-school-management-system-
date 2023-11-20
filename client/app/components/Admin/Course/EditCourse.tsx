"use client";
import React, { FC, useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import {
  useCreateCouresMutation,
  useGetAllCoursesQuery,
  useUpdateCouresMutation,
} from "@/redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import { redirect, useParams } from "next/navigation";

type Props = { id: string };

const EditCourse: FC<Props> = ({ id }) => {
  const { isLoading, isSuccess, error, data } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [
    updateCoures,
    { isLoading: loadingEdit, isSuccess: successEdit, error: errorEdit },
  ] = useUpdateCouresMutation();

  const editCourseData = data && data.courses.find((i: any) => i._id === id);

  useEffect(() => {
    if (editCourseData) {
      setCourseInfo({
        name: editCourseData.name,
        description: editCourseData.description,
        price: editCourseData.price,
        estimatedPrice: editCourseData?.estimatedPrice,
        tags: editCourseData.tags,
        level: editCourseData.level,
        demoUrl: editCourseData.demoUrl,
        thumbnail: editCourseData?.thumbnail?.url,
      });
      setBenefits(editCourseData.benefits);
      setPrerequisites(editCourseData.prerequisites);
      setCourseContentData(editCourseData.courseData);
    }
  }, [editCourseData]);

  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });

  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      videoSection: "Untitled Section",
      description: "",
      videoLength: "",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);

  useEffect(() => {
    if (successEdit) {
      toast.success("Course updated successfully");
      redirect("/admin/courses");
    }
    if (errorEdit) {
      if ("data" in errorEdit) {
        const errorMessage = errorEdit as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [successEdit, errorEdit]);

  const [courseData, setCourseData] = useState({});

  const handleSubmit = async () => {
    /// format benifits array
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    /// format benifits array
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));

    /// format course content array
    const formattedCourseContentData = courseContentData.map(
      (courseContentData) => ({
        title: courseContentData.title,
        videoUrl: courseContentData.videoUrl,
        videoSection: courseContentData.videoSection,
        description: courseContentData.description,
        videoLength: courseContentData.videoLength,
        links: courseContentData.links.map((link) => ({
          title: link.title,
          url: link.url,
        })),
        suggestion: courseContentData.suggestion,
      })
    );

    // prepare data object:
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      thumbnail: courseInfo.thumbnail,
      totalVideo: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseContent: formattedCourseContentData,
    };

    setCourseData(data);
  };

  const handleCourseCreate = async (e: any) => {
    const data = courseData;
    if (!isLoading) {
      await updateCoures({ id: editCourseData?._id, data });
    }
  };
  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <CourseData
            benefits={benefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            setBenefits={setBenefits}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 2 && (
          <CourseContent
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            active={active}
            setActive={setActive}
            handleSubmit={handleSubmit}
          />
        )}

        {active === 3 && (
          <CoursePreview
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
            active={active}
            setActive={setActive}
            isEdit={true}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
