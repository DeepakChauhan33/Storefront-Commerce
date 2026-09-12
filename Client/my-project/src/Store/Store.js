import { configureStore } from "@reduxjs/toolkit";

import { ProductApi } from "../Pages/Product/ProductApi";
import authReducer from "../Pages/Login/authSlice";
import orderReducer from "../Pages/Order/orderSlice";

import { wishlistApi } from "../Pages/Wishlist/wishlistAPI";
import { cartApi } from "../Pages/Cart/cartAPI";

const Store = configureStore({
    reducer: {
        [ProductApi.reducerPath]: ProductApi.reducer,
        [wishlistApi.reducerPath]: wishlistApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,

        auth: authReducer,
        orders: orderReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            ProductApi.middleware,
            wishlistApi.middleware,
            cartApi.middleware
        ),
});

export default Store;