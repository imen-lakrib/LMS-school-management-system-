import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useAllOrdersAdminQuery } from "@/redux/features/orders/ordersApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { format } from "timeago.js";
import { Loader } from "../../Loader/Loader";
import { Box } from "@mui/material";

type Props = { isDashboard?: boolean };

const AllInvoices: FC<Props> = ({ isDashboard }) => {
  const { theme, setTheme } = useTheme();
  const { isLoading, data } = useAllOrdersAdminQuery({});
  const { data: usersData } = useGetAllUsersQuery({});
  const { data: coursesData } = useGetAllCoursesQuery({});
  const [orderData, setOrderData] = useState<any>([]);

  useEffect(() => {
    if (data) {
      const temp = data.orders.map((item: any) => {
        const user = usersData?.users.find(
          (user: any) => user._id === item.userId
        );
        const course = usersData?.courses?.find(
          (course: any) => course._id === item.courseId
        );
        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: "$" + course?.price,
        };
      });
      setOrderData(temp);
    }
  }, [data, usersData, coursesData]);

  const columns: any = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "userName", headerName: "Name", flex: isDashboard ? 0.6 : 0.5 },
    ...(isDashboard
      ? []
      : [
          { field: "userEmail", headerName: "Email", flex: 1 },
          { field: "title", headerName: "Course Title", flex: 1 },
        ]),
    { field: "price", headerName: "Price", flex: 0.5 },
    ...(isDashboard
      ? [{ field: "created_at", headerName: "Created At", flex: 0.5 }]
      : [
          {
            field: " ",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: any) => {
              return (
                <a href={`mailto:${params.row.userEmail}`}>
                  <AiOutlineMail
                    className="dark:text-white text-black"
                    size={20}
                  />
                </a>
              );
            },
          },
        ]),
  ];

  const rows = [
    {
      id: "1234",
      userName: "test",
      userEmail: "test",
      title: "test",
      price: "500",
      created_at: "2 daysI",
    },
    {
      id: "1234",
      userName: "test",
      userEmail: "test",
      title: "test",
      price: "500",
      created_at: "2 daysI",
    },
    {
      id: "1234",
      userName: "test",
      userEmail: "test",
      title: "test",
      price: "500",
      created_at: "2 daysI",
    },
  ];

  orderData &&
    orderData.forEach((item: any) => {
      rows.push({
        id: item._id,
        userName: item.userName,
        userEmail: item.userEmail,
        title: item.title,
        price: item.price,
        created_at: format(item.createdAt),
      });
    });

  return (
    <div className={!isDashboard ? "mt-[120px]" : "mt-[0px]"}>
      {isLoading ? (
        <Loader />
      ) : (
        <Box m={isDashboard ? "0" : "40px 0 0 0 "}>
          <Box>
            <DataGrid
              checkboxSelection={isDashboard ? false : true}
              rows={rows}
              columns={columns}
              components={isDashboard ? {} : { Toolbar: GridToolbar }}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllInvoices;
