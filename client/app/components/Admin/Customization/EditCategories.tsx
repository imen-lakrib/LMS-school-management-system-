import { styles } from "@/app/styles/style";
import {
  useEditLayoutMutation,
  useGetLayoutQuery,
} from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Loader } from "../../Loader/Loader";

type Props = {};

const EditCategories: FC<Props> = () => {
  const [categories, setCategories] = useState<any[]>([]);

  //fetch Categories data
  const { data, refetch } = useGetLayoutQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess, error, isLoading }] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setCategories(data?.layout?.categories);
    }

    if (isSuccess) {
      refetch();
      toast.success("Categories updated successfuly");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess, error]);

  const handleCategoriesAdd = (id: any, value: string) => {
    setCategories((prevCategory: any) =>
      prevCategory.map((i: any) => (i._id === id ? { ...i, title: value } : i))
    );
  };

  const newCategoriesHandler = (id: any, value: string) => {
    if (categories[categories?.length - 1].title === "") {
      toast.error("Category title cannot be empty");
    } else {
      setCategories((prevCategory: any) => [...prevCategory, { title: "" }]);
    }
  };

  // function to check if the categories arrays are unchanged
  const areCategoriesUnchanged = (
    originalCategories: any[],
    newCategories: any[]
  ) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };

  const isAnyCategoryEmpty = (categories: any[]) => {
    return categories.some((q) => q.title === "");
  };

  const handleEdit = async () => {
    if (
      !areCategoriesUnchanged(data?.layout.categories, categories) &&
      !isAnyCategoryEmpty(categories)
    ) {
      await editLayout({ type: "Categories", categories });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[120px] text-center">
          <h1 className={`${styles.title}`}>All Categories</h1>
          {categories &&
            categories.map((item: any, index: number) => {
              return (
                <div className="p-3" key={index}>
                  <div className="flex items-center w-full justify-center">
                    <input
                      className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                      value={item.title}
                      onChange={(e) =>
                        handleCategoriesAdd(item._id, e.target.value)
                      }
                      placeholder="Enter category title..."
                    />

                    <AiOutlineDelete
                      className="dark:text-white text-black text-[18px] cursor-pointer"
                      onClick={() => {
                        setCategories((prevCategory: any) =>
                          prevCategory.filter((i: any) => i._id !== i.id)
                        );
                      }}
                    />
                  </div>
                  <div
                    className={`${
                      styles.button
                    } !w-[100px] !min-h-[40px] dark:text-white text-black bg-[#cccccc34] ${
                      areCategoriesUnchanged(
                        data?.layout.categories,
                        categories
                      ) || isAnyCategoryEmpty(categories)
                        ? "!cursor-not-allowed"
                        : "cursor-pointer !bg-[#42d383]"
                    } !rounded absolute bottom-12 right-12`}
                    onClick={
                      areCategoriesUnchanged(
                        data?.layout.categories,
                        categories
                      ) || isAnyCategoryEmpty(categories)
                        ? () => null
                        : handleEdit
                    }
                  >
                    Save
                  </div>
                </div>
              );
            })}
          <br />
          <br />

          <div className="w-full flex justify-center">
            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={newCategoriesHandler}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategories;
