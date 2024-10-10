import { api2 } from "./index";

export const companyApi = api2.injectEndpoints({
  endpoints: (build) => ({
    getCompany: build.query({
      query: ({ body, id }) => ({
        url: `/api/company${id}`,
        method: "GET",
        body,
      }),
      invalidatesTags: ["Company"],
    }),
    createCompany: build.mutation({
      query: (body) => ({
        url: "/api/company",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Company"],
    }),
    updateCompany: build.mutation({
      query: (id) => ({
        url: `/api/company/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Company"],
    }),
    deleteCompany: build.mutation({
      query: (id) => ({
        url: `/api/company/${id}`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Company"],
    }),
  }),
});

export const {
  useGetCompanyQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = companyApi;
