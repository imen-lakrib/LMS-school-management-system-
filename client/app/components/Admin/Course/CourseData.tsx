"use client";
import { styles } from "@/app/styles/style";
import { AddCircleOutline } from "@mui/icons-material";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  setBenefits: (benefits: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  prerequisites,
  setPrerequisites,
  setBenefits,
  active,
  setActive,
}) => {
  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handlePrerequisiteChange = (index: number, value: any) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  };

  const handleAddPrerequisite = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };
  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else toast.error("Please fill the fields for go to next!");
  };

  



  

  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="email">
          What are the benefits for student in this course?
        </label>
        <br />

        <>
          {benefits.map((benefit: any, index: number) => {
            return (
              <input
                type="text"
                key={index}
                name="Benefits"
                placeholder=""
                required
                className={`${styles.input} my-2`}
                value={benefit.title}
                onChange={(e) => handleBenefitChange(index, e.target.value)}
              />
            );
          })}
        </>

        <AddCircleOutline
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddBenefit}
        />
      </div>

      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="email">
          What are the prerequisites for starting this course?
        </label>
        <br />

        <>
          {prerequisites.map((prerequisite: any, index: number) => {
            return (
              <input
                type="text"
                key={index}
                name="Prerequisites"
                placeholder=""
                required
                className={`${styles.input} my-2`}
                value={prerequisite.title}
                onChange={(e) =>
                  handlePrerequisiteChange(index, e.target.value)
                }
              />
            );
          })}
        </>

        <AddCircleOutline
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddPrerequisite}
        />
      </div>

      <div className="w-full flex items-center justify-between">
        <div
          onClick={() => prevButton()}
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer"
        >
          Prev
        </div>
        <div
          onClick={() => handleOptions()}
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer"
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;
