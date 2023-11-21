import { apiSlice } from "../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //endpoints here

    //1- create lyout
    createLayout: builder.mutation({
      query: (data) => ({
        url: "create-layout",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),

    //2- get layout
    getLayout: builder.query({
      query: (type) => ({
        url: `get-layout/${type}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    //3- edit layout
    editLayout: builder.mutation({
      query: ({ type, image, title, subtitle, faq, categories }) => ({
        url: `edit-layout`,
        body: {
          type,
          image,
          title,
          subtitle,
          faq,
          categories,
        },
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetLayoutQuery,
  useEditLayoutMutation,
  useCreateLayoutMutation,
} = layoutApi;
