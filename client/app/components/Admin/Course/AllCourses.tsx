import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";

type Props = {};

const AllCourses = (props: Props) => {
  const { theme, setTheme } = useTheme();
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
            <Button>
              <AiFillEdit
                className="dark:text-white text-black"
                size={20}
              />
            </Button>
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
              <Button>
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

  const rows = [
    {
      id: "1234",
      title: "React",
      purchased: "30",
      ratings: "5",
      created_at: "12/12/12",
    },
  ];
  return (
    <div className="mt-[120px]">
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
      </Box>
    </div>
  );
};

export default AllCourses;
