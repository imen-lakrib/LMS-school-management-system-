"use client";
import { styles } from "@/app/styles/style";
import { AddCircleOutline } from "@mui/icons-material";
import React, { FC, useState } from "react";

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
  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="email">
          What are the benefits for student in this course?
        </label>
        <br />

        <>
          {benefits.map((benefit: any, index: number) => {
            <input
              type="text"
              key={index}
              name="Benefits"
              placeholder=""
              required
              className={`${styles.input} my-2`}
              value={benefit.title}
              onChange={(e) => handleBenefitChange(index, e.target.value)}
            />;
          })}
        </>

        <AddCircleOutline
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddBenefit}
        />
      </div>
    </div>
  );
};

export default CourseData;
