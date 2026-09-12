import { createSlice } from "@reduxjs/toolkit";


// Function
import { setLocalStorage, getLocalStorage, removeLocalStorage } from "../../Utils/localStorage";

const initState = {
    wishlist: getLocalStorage("wishlist") || []  //If value1 is truthy → use value1 and If value1 is falsy → use value2
    // wishlist : []
}


const wishlistSlice = createSlice({

    name: "wishlist",
    initialState: initState,

    reducers: {


        toggleWishlist: (state, action) => {


            const product = action.payload;

            const exist = state.wishlist.find((item) => item.id === product.id);

            if (exist) {
                state.wishlist = state.wishlist.filter((item) => item.id !== product.id)
            } else {
                state.wishlist.push(product)
                setLocalStorage(action.payload.id,);
            }

            // Save updated wishlist
            setLocalStorage("wishlist", state.wishlist);   //Here we storre updated wislist in local storage
        },

        removeFromWishlist: (state, action) => {

            state.wishlist = state.wishlist.filter((item) => item.id !== action.payload);
            setLocalStorage("wishlist", state.wishlist);
        }
    }
})



export const { addToWishlist, removeFromWishlist, toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;