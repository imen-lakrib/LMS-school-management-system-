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

    //1- update password
    updatePassword: builder.mutation({
      query: (avatar) => ({
        url: "update-password",
        method: "PUT",
        body: { avatar },
        credentials: "include" as const,
      }),
    }),

    //1- update my account
    updateMyAccount: builder.mutation({
      query: (avatar) => ({
        url: "update-my-account",
        method: "POST",
        body: { avatar },
        credentials: "include" as const,
      }),
    }),

    //1- update user role
    updateUserRole: builder.mutation({
      query: (avatar) => ({
        url: "update-user-role",
        method: "PUT",
        body: { avatar },
        credentials: "include" as const,
      }),
    }),

    //1- Get all users
    getAllUsers: builder.query({
      query: (avatar) => ({
        url: "all-users-admin",
        method: "GET",
        body: { avatar },
        credentials: "include" as const,
      }),
    }),

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

export const { useUpdateAvatarMutation } = userApi;
