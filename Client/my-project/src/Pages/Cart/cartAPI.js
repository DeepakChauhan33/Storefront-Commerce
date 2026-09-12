import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getLocalStorage } from "../../Utils/localStorage";

export const cartApi = createApi({
  reducerPath: "cartApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/cart`,

    prepareHeaders: (headers) => {
      const token = getLocalStorage("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["Cart"],

  endpoints: (builder) => ({
    // Get logged-in user's cart
    getCart: builder.query({
      query: () => "/",
      providesTags: ["Cart"],
    }),

    // Add product to cart
    addToCart: builder.mutation({
      query: (productId) => ({
        url: "/add",
        method: "POST",
        body: { productId },
      }),
      invalidatesTags: ["Cart"],
    }),

    // Update product quantity
    updateQuantity: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: "/update",
        method: "PUT",
        body: {
          productId,
          quantity,
        },
      }),
      invalidatesTags: ["Cart"],
    }),

    // Remove product from cart
    removeFromCart: builder.mutation({
      query: (productId) => ({
        url: `/remove/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    // Clear entire cart
    clearCart: builder.mutation({
      query: () => ({
        url: "/clear",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateQuantityMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = cartApi;