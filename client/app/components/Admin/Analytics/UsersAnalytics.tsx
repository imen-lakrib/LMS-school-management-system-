import React, { FC } from "react";

import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Label,
  YAxis,
  LabelList,
  AreaChart,
  Tooltip,
  Area,
} from "recharts";
import { Loader } from "../../Loader/Loader";
import { useUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import { styles } from "@/app/styles/style";

type Props = {
  isDashboard?: boolean;
};

const UsersAnalytics: FC<Props> = ({ isDashboard }) => {
  const { data, isLoading, isSuccess, error } = useUsersAnalyticsQuery({});

  const analyticsData: any = [];

  data &&
    data.users.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, count: item.count });
    });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            !isDashboard
              ? "mt-[50px]"
              : "mt-[50px] dark:bg-[#111C43] shadow-sm pb-5 rounded-sm"
          }`}
        >
          <div className={`${!isDashboard ? "!ml-8 mb-5" : ""}`}>
            <h1
              className={`${styles.title} ${
                !isDashboard && "!text-[20px]"
              } px-5 !text-start`}
            >
              Users Analytics
            </h1>

            {!isDashboard && (
              <p className={`${styles.label} px-5 `}>
                Last 12 months analytics data
              </p>
            )}

            <div
              className={` ${
                !isDashboard ? "h-[30vh]" : "h-screen"
              } w-full  flex items-center justify-center`}
            >
              <ResponsiveContainer
                width={isDashboard ? "100%" : "90%"}
                height={!isDashboard ? "50%" : "100%"}
              >
                <AreaChart
                  data={analyticsData}
                  margin={{
                    top: 20,
                    right: 20,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <XAxis dataKey="name" />

                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#4d62d9"
                    fill="#4d62d9"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UsersAnalytics;
