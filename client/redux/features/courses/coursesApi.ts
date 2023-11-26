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

    //2- get all courses for admin
    getAllCourses: builder.query({
      query: (data) => ({
        url: "all-courses-admin",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    //3- delete course
    deleteCoures: builder.mutation({
      query: (id) => ({
        url: `delete-course/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),

    //4- update course
    updateCoures: builder.mutation({
      query: ({ id, data }) => ({
        url: `edit-course/${id}`,
        method: "PUT",
        body: data,

        credentials: "include" as const,
      }),
    }),

    //5- get all courses for everyone
    getAllCoursesForEveryone: builder.query({
      query: () => ({
        url: "all-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateCouresMutation,
  useGetAllCoursesQuery,
  useDeleteCouresMutation,
  useUpdateCouresMutation,
  useGetAllCoursesForEveryoneQuery,
} = courseApi;
