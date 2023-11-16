import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //endpoints here

    //1- create course
    createCoures: builder.mutation({
      query: (data) => ({
        url: "create-course",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),

    //1- get all courses
    getAllCourses: builder.query({
      query: (data) => ({
        url: "all-courses-admin",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useCreateCouresMutation, useGetAllCoursesQuery } = courseApi;
