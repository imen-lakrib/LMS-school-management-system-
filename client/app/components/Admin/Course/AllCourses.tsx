import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import {
  useDeleteCouresMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/courses/coursesApi";
import { Loader } from "../../Loader/Loader";
import { format } from "timeago.js";
import { styles } from "@/app/styles/style";
import toast from "react-hot-toast";
import Link from "next/link";

type Props = {};

const AllCourses = (props: Props) => {
  const { theme, setTheme } = useTheme();

  const [oepnDeleteCourse, setOpenDeleteCourse] = useState(false);
  const [courseId, setCourseId] = useState("");

  const { data, error, isLoading, isSuccess, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [
    deleteCourse,
    {
      error: errorDelete,
      isLoading: isLoadingDelete,
      isSuccess: isSuccessDelete,
    },
  ] = useDeleteCouresMutation();

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: " ",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Link href={`/admin/edit-course/${params.row.id}`}>
              <AiFillEdit className="dark:text-white text-black" size={20} />
            </Link>
          </>
        );
      },
    },

    {
      field: "",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpenDeleteCourse(!oepnDeleteCourse);
                setCourseId(params.row.id);
              }}
            >
              <AiOutlineDelete
                className="dark:text-white text-black"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
  ];
  const rows: any = [];
  {
    data &&
      data.courses.forEach((item: any) => {
        rows.push({
          id: item._id,
          title: item.name,
          purchased: item.purchased,
          ratings: item.ratings,
          created_at: format(item.createdAt),
        });
      });
  }

  useEffect(() => {
    if (isSuccessDelete) {
      refetch();

      toast.success("Course deleted successfully");
      setOpenDeleteCourse(!oepnDeleteCourse);
    }

    if (errorDelete) {
      if ("data" in errorDelete) {
        const errorMessage = errorDelete as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccessDelete, errorDelete]);

  const handleDelete = async () => {
    const id = courseId;
    await deleteCourse(id);
  };

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },

              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30 !important"
                    : "1px solid #ccc !important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },

              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },

              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                color: theme === "dark" ? "#fff" : "#000",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                borderBottom: `none`,
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                borderBottom: `none`,
              },
              "& .MuiCheckBox-root": {
                color:
                  theme === "dark" ? `#b7ebde !important` : `#000 !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-test": {
                color: `#fff !important`,
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>

          {oepnDeleteCourse && (
            <Modal
              open={oepnDeleteCourse}
              onClose={() => setOpenDeleteCourse(!oepnDeleteCourse)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box className="w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none mx-auto">
                <h1 className={`${styles.title} `}>
                  Are you sure you want to delete this course?
                </h1>

                <div className="flex w-full items-center justify-between mb-6 mt-4">
                  <div
                    onClick={() => setOpenDeleteCourse(!oepnDeleteCourse)}
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7a3]`}
                  >
                    Cancel
                  </div>

                  <div
                    onClick={handleDelete}
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#d63f3f]`}
                  >
                    Delete
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllCourses;
