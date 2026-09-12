import reducer, { increaseQuantity } from "../Pages/Cart/CartSlice";

test(" increase quantity", () => {
    const initialState = {
        cart: [{ id: 1, quantity: 1 }],
    };

    const newState = reducer(initialState, increaseQuantity(1));

    expect(newState.cart[0].quantity).toBe(2);
});