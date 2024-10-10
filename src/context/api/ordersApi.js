import { api2 } from "./index";

export const ordersApi = api2.injectEndpoints({
  endpoints: (build) => ({
    getAllOrders: build.query({
      query: () => ({
        url: "/api/orders",
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    getOrder: build.query({
      query: (id) => ({
        url: `/api/order/${id}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    createOrders: build.mutation({
      query: (body) => ({
        url: "/api/order",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Orders"],
    }),
    updateOrders: build.mutation({
      query: ({ id, body }) => ({
        url: `/api/order/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Orders"],
    }),
    deleteOrders: build.mutation({
      query: (id) => ({
        url: `/api/order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderQuery,
  useCreateOrdersMutation,
  useUpdateOrdersMutation,
  useDeleteOrdersMutation,
} = ordersApi;
