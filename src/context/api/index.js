import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const baseQuery = async (args, api, extraOptions) => {
  const { dispatch } = api;
  const token = localStorage.getItem("x-auth-token");

  const rawBaseQuery1 = fetchBaseQuery({
    baseUrl: "http://18.194.52.136:8081",
    prepareHeaders: (headers) => {
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  const rawBaseQuery2 = fetchBaseQuery({
    baseUrl: "http://18.194.52.136:8080",
    prepareHeaders: (headers) => {
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  let result;
  if (args.url.startsWith("/api")) {
    result = await rawBaseQuery2(args, api, extraOptions);
  } else {
    result = await rawBaseQuery1(args, api, extraOptions);
  }

  if (result && result.error) {
    const { status } = result.error;
    if (status === 401 || status === 403) {
      console.error("Unauthorized access - Redirecting to login...");
      // dispatch(logout());
    }
  }

  return result;
};

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

export const api1 = createApi({
  reducerPath: "myApi1",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Auth", "Profile", "User"],
  endpoints: () => ({}),
});

export const api2 = createApi({
  reducerPath: "myApi2",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Orders", "Service", "Company", "Address"],
  endpoints: () => ({}),
});
