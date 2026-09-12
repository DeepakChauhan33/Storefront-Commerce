import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// Local Storage
import { getLocalStorage } from "../../Utils/localStorage";

export const wishlistApi = createApi({

  reducerPath: "wishlistApi",

  baseQuery: fetchBaseQuery({

    baseUrl: import.meta.env.VITE_API_URL,

    prepareHeaders: (headers) => {

      const token = getLocalStorage("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    }

  }),

  tagTypes: ["Wishlist"],

  endpoints: (builder) => ({

    getWishlist: builder.query({

      query: () => "/wishlist",

      providesTags: ["Wishlist"]

    }),

    addWishlist: builder.mutation({

      query: (product) => ({

        url: "/wishlist",

        method: "POST",

        body: product

      }),

      invalidatesTags: ["Wishlist"]

    }),

    removeWishlist: builder.mutation({

      query: (id) => ({

        url: `/wishlist/${id}`,

        method: "DELETE"

      }),

      invalidatesTags: ["Wishlist"]

    }),

    clearWishlist: builder.mutation({

      query: () => ({

        url: "/wishlist",

        method: "DELETE"

      }),

      invalidatesTags: ["Wishlist"]

    })

  })

})

export const {

  useGetWishlistQuery,
  useAddWishlistMutation,
  useRemoveWishlistMutation,
  useClearWishlistMutation

} = wishlistApi;