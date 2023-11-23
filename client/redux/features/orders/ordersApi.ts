import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //endpoints here

    //1- get all ordrs admin
    allOrdersAdmin: builder.query({
      query: (type) => ({
        url: `all-orders-admin`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    //2- create order
    createOrder: builder.mutation({
      query: () => ({
        url: `create-order`,
        method: "POST",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useAllOrdersAdminQuery, useCreateOrderMutation } = ordersApi;
