import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useAddToCartMutation } from "../Pages/Cart/cartAPI";

const ButtonComp = ({ children, width, product }) => {
  const isLogin = useSelector((state) => state.auth.isLogin);

  const [addToCart, { isLoading }] = useAddToCartMutation();

  async function handleCart() {
    if (!isLogin) {
      toast.error("Please login first");
      return;
    }

    try {
      await addToCart(product._id).unwrap();

      toast.success("Item added", {
        position: "bottom-right",
        duration: 1000,
        style: {
          marginTop: "80px",
        },
      });
    } catch (error) {
      toast.error(error?.data?.message || "Unable to add item");
    }
  }

  return (
    <button
      className={`${width} bg-black text-sm text-white flex items-center justify-evenly rounded-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed`}
      onClick={handleCart}
      disabled={isLoading}
    >
      {isLoading ? "Adding..." : children}
    </button>
  );
};

export default ButtonComp;