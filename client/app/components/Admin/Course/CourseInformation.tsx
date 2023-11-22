"use client";
import { styles } from "@/app/styles/style";
import { useGetLayoutQuery } from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  //fetch Categories data
  const { data } = useGetLayoutQuery("Categories", {});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout?.categories);
    }
  }, [data]);

  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit}>
        <div>
          <label className={`${styles.label}`} htmlFor="">
            Course Name
          </label>
          <input
            name=""
            required
            type="text"
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="name"
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div>
          <label className={`${styles.label}`} htmlFor="">
            Course Description
          </label>
          <textarea
            name=""
            cols={8}
            rows={8}
            required
            value={courseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
            id="description"
            placeholder="name"
            className={`${styles.input} !h-min`}
          />
        </div>
        <br />
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`} htmlFor="">
              Course price
            </label>
            <input
              name=""
              required
              type="number"
              value={courseInfo.price}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              id="price"
              placeholder="1254"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[45%]">
            <label className={`${styles.label}`} htmlFor="">
              Course estimatedPrice
            </label>
            <input
              name=""
              required
              type="number"
              value={courseInfo.estimatedPrice}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              id="estimatedPrice"
              placeholder="254"
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`} htmlFor="">
              Course Tags
            </label>
            <input
              name=""
              required
              type="text"
              value={courseInfo.tags}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              id="tags"
              placeholder="tags"
              className={`${styles.input}`}
            />
          </div>

          {/* here */}
          <div className="w-[45%]">
            <label className={`${styles.label}`} htmlFor="">
              Course Categories
            </label>
            <select name="" id="" className={`${styles.input}`}>
              <option value="">Select category</option>
              {categories &&
                categories.map((item: any) => (
                  <option value={item._id} key={item._id}>
                    {item.title}
                  </option>
                ))}
            </select>

            {/* add something in here  */}
          </div>
        </div>

        <br />
        {/* <div>
          <label className={`${styles.label}`} htmlFor="">
            Course Tags
          </label>
          <input
            name=""
            required
            type="text"
            value={courseInfo.tags}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, tags: e.target.value })
            }
            id="tags"
            placeholder="tags"
            className={`${styles.input}`}
          />
        </div> */}

        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`} htmlFor="">
              Course Level
            </label>
            <input
              name=""
              required
              type="number"
              value={courseInfo.level}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              id="level"
              placeholder="1254"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[45%]">
            <label className={`${styles.label}`} htmlFor="">
              Course DemoUrl
            </label>
            <input
              name=""
              required
              type="text"
              value={courseInfo.demoUrl}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              id="demoUrl"
              placeholder="demoUrl"
              className={`${styles.input}`}
            />
          </div>
        </div>

        <br />

        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            htmlFor="file"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <img
                src={courseInfo.thumbnail}
                alt=""
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag your thumbnail here or click to browse
              </span>
            )}
          </label>
        </div>

        <br />
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer"
          />
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default CourseInformation;
