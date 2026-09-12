

import React from "react";
import toast from "react-hot-toast";

// RTK Query
import { useUpdateQuantityMutation } from "../Pages/Cart/cartAPI";

const QuantityBtn = ({ id, quantity }) => {

    const [updateQuantity, { isLoading }] = useUpdateQuantityMutation();

    async function handleDecrease() {

        // Don't allow quantity below 1
        if (quantity <= 1) return;

        try {

            await updateQuantity({
                productId: id,
                quantity: quantity - 1
            }).unwrap();

        } catch (error) {

            toast.error(error.data?.message || "Failed to update quantity");

        }
    }

    async function handleIncrease() {

        try {

            await updateQuantity({
                productId: id,
                quantity: quantity + 1
            }).unwrap();

        } catch (error) {

            toast.error(error.data?.message || "Failed to update quantity");

        }
    }

    return (
        <div
            className="border border-gray-200 inline-block p-0 text-sm"
            title="Add quantity"
        >
            <button
                className="px-2 bg-gray-300 hover:bg-gray-400 transition-colors duration-300"
                onClick={handleDecrease}
            >
                -
            </button>

            <span className="inline-block py-0 px-3 bg-gray-100">
                {quantity}
            </span>

            <button
                disabled={isLoading}
                className="px-2 bg-gray-300 hover:bg-gray-400 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleIncrease}
            >
                +
            </button>
        </div>
    );
};

export default QuantityBtn;