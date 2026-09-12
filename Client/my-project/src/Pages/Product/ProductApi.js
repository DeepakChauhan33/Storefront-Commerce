import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ProductApi = createApi({
    reducerPath: "api",

    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}/product/`,
    }),

    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: "products/",
                method: "GET",
            }),
        }),

        getDynamicProduct: builder.query({
            query: (id) => ({
                url: `product/${id}`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetDynamicProductQuery,
} = ProductApi;