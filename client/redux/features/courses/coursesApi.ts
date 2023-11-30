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

    //6- get all courses for everyone
    getCourseDetails: builder.query({
      query: (id) => ({
        url: `single-course/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    //7- get course data for purchased users
    getCourseContentforUser: builder.query({
      query: (id) => ({
        url: `get-course-content/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    //8- add a new question
    addNewQuestion: builder.mutation({
      query: ({ question, courseId, contentId }) => ({
        url: `add-question`,
        method: "PUT",
        body: { question, courseId, contentId },

        credentials: "include" as const,
      }),
    }),

    //9- add answer
    addAnswer: builder.mutation({
      query: ({ answer, questionId, courseId, contentId }) => ({
        url: `add-answer`,
        method: "PUT",
        body: { answer, questionId, courseId, contentId },

        credentials: "include" as const,
      }),
    }),

    //10- add review
    addReview: builder.mutation({
      query: ({ review, rating, courseId }) => ({
        url: `add-review/${courseId}`,
        method: "PUT",
        body: { review, rating },

        credentials: "include" as const,
      }),
    }),

    //11- add add-review-replay
    addReviewReplay: builder.mutation({
      query: ({ comment, courseId, reviewId }) => ({
        url: `add-review-replay`,
        method: "PUT",
        body: { comment, courseId, reviewId },

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
  useGetCourseDetailsQuery,
  useGetCourseContentforUserQuery,
  useAddAnswerMutation,
  useAddNewQuestionMutation,
  useAddReviewMutation,
  useAddReviewReplayMutation,
} = courseApi;
