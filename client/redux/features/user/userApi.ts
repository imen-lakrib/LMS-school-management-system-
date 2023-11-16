import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //endpoints here

    //1- update avatar
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "update-picture",
        method: "PUT",
        body: avatar,
        credentials: "include" as const,
      }),
    }),

    //2- update password
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "update-password",
        method: "PUT",
        body: { oldPassword, newPassword },
        credentials: "include" as const,
      }),
    }),

    //3- update my account
    updateMyAccount: builder.mutation({
      query: ({ name }) => ({
        url: "update-my-account",
        method: "POST",
        body: { name },
        credentials: "include" as const,
      }),
    }),

    //4- Get all users
    getAllUsers: builder.query({
      query: (avatar) => ({
        url: "all-users-admin",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    //5- update user role
    updateUserRole: builder.mutation({
      query: ({ email, role }) => ({
        url: "update-user-role",
        method: "PUT",
        body: { email, role },
        credentials: "include" as const,
      }),
    }),

    //token refresh eachTime "stratigy token sliding or token rotation"

    //1- delete User
    deleteUser: builder.mutation({
      query: (avatar) => ({
        url: "delete-user",
        method: "DELETE",
        body: { avatar },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useUpdateAvatarMutation,
  useUpdateMyAccountMutation,
  useUpdatePasswordMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} = userApi;
