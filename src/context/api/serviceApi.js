import { api2 } from "./index";

export const serviceApi = api2.injectEndpoints({
  endpoints: (build) => ({
    getAllServices: build.query({
      query: (body) => ({
        url: "/api/services",
        method: "GET",
        params: {
          page: body.page,
          limit: body.limit
        },
      }),
      invalidatesTags: ["Services"],
    }),
    getService: build.query({
      query: ({ body, id }) => ({
        url: `/api/service${id}`,
        method: "GET",
        body,
      }),
      invalidatesTags: ["Services"],
    }),
    createService: build.mutation({
      query: (body) => ({
        url: "/api/service",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Services"],
    }),
    updateService: build.mutation({
      query: (id) => ({
        url: `/api/service/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Services"],
    }),
    deleteService: build.mutation({
      query: (id) => ({
        url: `/api/service/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Services"],
    }),
  }),
});

export const {
  useGetAllServicesQuery,
  useGetServiceQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
