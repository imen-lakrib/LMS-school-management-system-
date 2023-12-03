import { apiSlice } from "../api/apiSlice";

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //endpoints here

    //1-
    getAllNotifications: builder.query({
      query: () => ({
        url: "get-notifications",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    //2-
    updateNotificationStatus: builder.mutation({
      query: (id) => ({
        url: `update-notifications/${id}`,
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} = notificationApi;
