import { createSlice } from "@reduxjs/toolkit";

// Functions
// import { setLocalStorage, getLocalStorage } from "../../Utils/localStorage";

const initState = {
    orders: [],
    loading: false,
    error: null
};

const orderSlice = createSlice({
    name: "orders",
    initialState: initState,

    reducers: {


        // addOrder: (state, action) => {
        //     state.orders.push(action.payload);

        //     setLocalStorage("order", state.orders);
        // },


        setOrders: (state, action) => {
            state.orders = action.payload;
        },

        clearOrder: (state, action) => {
            state.orders = [];

        }
    }
});

export const { setOrders, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;