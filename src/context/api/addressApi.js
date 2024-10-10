import { api2 } from "./index";

export const addressApi = api2.injectEndpoints({
  endpoints: (build) => ({
    getAddress: build.query({
      query: (id) => ({
        url: `/api/company/${id}`,
      }),
      invalidatesTags: ["Address"],
    }),
    createAddress: build.mutation({
      query: (body) => ({
        url: "/api/company",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Address"],
    }),
    updateAddress: build.mutation({
      query: ({ id, body }) => ({
        url: `/api/company/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Address"],
    }),
    deleteAddress: build.mutation({
      query: (id) => ({
        url: `/api/company/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Address"],
    }),
  }),
});

export const {
  useGetAddressQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressApi;
