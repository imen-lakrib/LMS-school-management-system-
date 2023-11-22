import { apiSlice } from "../api/apiSlice";

export const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //endpoints here

    //1- get users analytics
    usersAnalytics: builder.query({
      query: () => ({
        url: `analytics-users`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    //2- get orders analytics
    ordersAnalytics: builder.query({
      query: () => ({
        url: `analytics-orders`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    //3- get courses analytics
    coursesAnalytics: builder.query({
      query: () => ({
        url: `analytics-courses`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCoursesAnalyticsQuery,
  useOrdersAnalyticsQuery,
  useUsersAnalyticsQuery,
} = analyticsApi;
