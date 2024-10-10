import { api1 } from "./index";

export const authApi = api1.injectEndpoints({
  endpoints: (build) => ({
    signin: build.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth", "Profile"],
    }),
    signup: build.mutation({
      query: (body) => ({
        url: "/auth/post_register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useSigninMutation, useSignupMutation } = authApi;
