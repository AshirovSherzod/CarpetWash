import { api1 } from "./index";

export const userApi = api1.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query({
      query: (body) => ({
        url: `/users/profile`,
        method: "GET",
        body,
      }),
      invalidatesTags: ["Profile", "User"],
    }),
    updateProfile: build.mutation({
      query: (body) => ({
        url: `/users/update`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    updatePassword: build.mutation({
      query: (body) => ({
        url: `/users/password`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteCompany: build.mutation({
      query: (body) => ({
        url: `/users/delete`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useDeleteCompanyMutation,
} = userApi;
