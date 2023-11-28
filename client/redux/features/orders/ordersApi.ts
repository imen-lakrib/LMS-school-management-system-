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
      query: ({ courseId, payment_info }) => ({
        url: `create-order`,
        method: "POST",
        body: {
          courseId,
          payment_info,
        },
        credentials: "include" as const,
      }),
    }),

    //3- getStripePublishableKey
    getStripePublishableKey: builder.query({
      query: () => ({
        url: `/payment/stripepublishablekey`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    //4- createPaymentIntent
    createPaymentIntent: builder.mutation({
      query: (amount) => ({
        url: `payment`,
        method: "POST",
        body: { amount },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useAllOrdersAdminQuery,
  useCreateOrderMutation,
  useGetStripePublishableKeyQuery,
  useCreatePaymentIntentMutation,
} = ordersApi;
