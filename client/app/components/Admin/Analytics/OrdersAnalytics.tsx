import React, { FC } from "react";

import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Label,
  YAxis,
  LabelList,
} from "recharts";
import { Loader } from "../../Loader/Loader";
import { useOrdersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import { styles } from "@/app/styles/style";

type Props = { isDashboard?: boolean };

const OrdersAnalytics: FC<Props> = ({ isDashboard }) => {
  const { data, isLoading, isSuccess, error } = useOrdersAnalyticsQuery({});
  //   const analyticsData = [
  //     { name: "June 2023", uv: 2 },
  //     { name: "July 2023", uv: 3 },
  //     { name: "August 2023", uv: 7 },
  //     { name: "Sept 2023", uv: 3 },
  //     { name: "October 2023", uv: 3 },
  //     { name: "November 2023", uv: 5 },
  //     { name: "December 2023", uv: 3 },
  //   ];

  const analyticsData: any = [];

  data &&
    data.orders.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, count: item.count });
    });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen">
          <div className="mt-[50px]">
            <h1 className={`${styles.title} px-5 !text-start`}>
              Orders Analytics
            </h1>

            <p className={`${styles.label} px-5 `}>
              Last 12 months analytics data
            </p>
          </div>

          <div className="w-full h-[90%] flex items-center justify-center">
            <ResponsiveContainer width="90%" height="50%">
              <BarChart width={150} height={300} data={analyticsData}>
                <XAxis dataKey="name">
                  <Label offset={0} position="insideBottom" />
                </XAxis>

                <YAxis domain={["auto", "auto"]} />
                <Bar dataKey="count" fill="#3faf82">
                  <LabelList dataKey="count" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default OrdersAnalytics;
