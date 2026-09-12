import { createSlice } from "@reduxjs/toolkit";


// Function
import { setLocalStorage, getLocalStorage, removeLocalStorage } from "../../Utils/localStorage";

const initState = {
    cart: getLocalStorage("cart") || [],
}


const cartSlice = createSlice({


    name: "cart",
    initialState: initState,

    reducers: {

        addToCart: (state, action) => {

            const product = action.payload;

            const existing = state.cart.find((item) => item._id === product._id);

            if (existing) {
                existing.quantity += 1;
            } else {
                state.cart.push({ ...product, quantity: 1 }) //Here I add our own quantity property 
            }

            setLocalStorage("cart", state.cart);
        },

        removeFromCart: (state, action) => {

            const productID = action.payload;

            state.cart = state.cart.filter((item) => item.id !== action.payload)

            setLocalStorage("cart", state.cart);
        },


        clearCart: (state, action) => {
            state.cart = [];
            setLocalStorage("cart", state.cart);
        },


        increaseQuantity: (state, action) => {

            const product = state.cart.find((item) => item.id === action.payload);

            if (product) {
                product.quantity += 1;
            } else {

            }

            setLocalStorage("cart", state.cart);
        },


        decreaseQunatity: (state, action) => {

            const product = state.cart.find((item) => item.id === action.payload);

            if (product && product.quantity > 1) {  // Here it decrease only if quantity is greater than 1
                product.quantity -= 1;
            } else {

            }

            setLocalStorage("cart", state.cart);
        }



    }
})



export const { addToCart, clearCart, removeFromCart, increaseQuantity, decreaseQunatity } = cartSlice.actions;
export default cartSlice.reducer;