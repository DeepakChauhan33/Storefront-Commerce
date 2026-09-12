// Hooks
import React, { useState } from "react";
// import React, { useEffect, useState } from "react";

// import { useSelector, useDispatch } from "react-redux";
import { useSelector } from "react-redux";

// Components
import QuantityBtn from "../../Components/QuantityBtn";
import CartBill from "../Cart/CartBill";

// Actions
// import { removeFromCart } from "./CartSlice";

// React Icons
import { LuBox } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { CgShoppingCart } from "react-icons/cg";
import { FaLuggageCart } from "react-icons/fa";

// Service
import {
    useGetCartQuery,
    useRemoveFromCartMutation
} from "./cartAPI";

// Motion
import { motion } from "framer-motion";

import { NavLink, useNavigate } from "react-router-dom";

const CartPage = () => {

    const { data: cart = [], isLoading } = useGetCartQuery();
    // console.log(cart);

    const isLogin = useSelector((state) => state.auth.isLogin);

    // const dispatch = useDispatch();
    const [removeFromCart] = useRemoveFromCartMutation();

    const navigate = useNavigate();

    const [loader, setLoader] = useState(false);

    if (isLoading) {
        return <h2>Loading...</h2>;
    }



    if (loader) {
        return (
            <div className="flex justify-center items-center h-screen sticky top-0" >
                <div className="text-xl font-semibold animate-bounce">
                    Processing Order...
                </div>
            </div>
        );
    }


    return (
        <main className="w-full md:p-3 space-y-4 ">

            {/* ================= CART HEADER ================= */}

            <motion.div
                className="m-1 py-3 px-1.5 md:px-2 md:py-3 space-y-1.5 md:space-y-2 flex flex-col lg:flex-row justify-between"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="w-full lg:w-auto flex-col items-start  gap-2 ">
                    <h1 className='text-2xl lg:text-4xl font-bold lg:font-semibold ' >
                        <CgShoppingCart className='inline text-4xl  md:text-6xl text-slate-700' />
                        My Cart
                    </h1>
                    <p className='pl-3 text-md lg:text-xl font-normal'>Your cart has {cart.length} items</p>
                </div>

                {!isLogin && cart.length > 0 &&
                    (
                        <div className="w-full h-fit lg:w-auto border border-red-400 bg-red-100 rounded-4xl p-2 lg:px-3 lg:p-3 lg:mr-6 mt-5 lg:mt-0">
                            <p className="text-sm md:text-lg font-semibold">Please log in to proceed with checkout. <NavLink to="/login" className="text-purple-700 underline">Login</NavLink></p>
                        </div>
                    )}
            </motion.div>

            <motion.div
                className=" "
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5 }}
            >



                <section className="bg-stone-200/40 m-1.5 rounded-xl  p-2.5">

                    {cart.length === 0 ? (


                        <section className="h-120 flex justify-center items-center ">


                            {/* ================= CART  WHEN EMPTY ================= */}

                            <div className='flex flex-col justify-center items-center gap-4'>
                                <FaLuggageCart className="text-7xl lg:text-8xl text-gray-400" />

                                <p className="text-lg md:text-xl lg:text-3xl text-center font-normal">
                                    Nothing here yet—start shopping now!
                                </p>

                                <motion.button

                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.8 }}
                                    onClick={() => navigate("/products")}
                                    className="bg-gray-800 text-white text-sm lg:text-lg px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                                    Shop Now
                                </motion.button>
                            </div>


                        </section>
                    ) : (
                        <section className="flex flex-col lg:flex-row gap-8 md:mt-10 ">

                            {/* ================= CART ON MOBILE VIEW  ================= */}

                            <div className="block sm:hidden space-y-4 pt-5 ">
                                {cart.map((item) => (

                                    <div className="flex shadow-sm bg-white gap-1.5 border  border-gray-600/40  rounded-sm overflow-hidden">
                                        {/* Image Div */}
                                        <div className="h-auto w-25 md:w-25 p-2 bg-gray-400/40 ">
                                            <NavLink to={`/product/${item.product._id}`}>
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product.category}
                                                    className="h-full w-full object-contain"
                                                />
                                            </NavLink>
                                        </div>

                                        {/* Product NAme and Quantity */}
                                        <div className="flex flex-1 justify-between p-1.5 gap-1 ">
                                            {/* Name and Price */}
                                            <div className="space-y-3 flex flex-col justify-between ">
                                                <p className="line-clamp-2 md:line-clamp-3 text-md md:text-lg font-semibold ">
                                                    {item.product.title}
                                                </p>
                                                <span className="text-xl font-black">
                                                    $ {item.price}
                                                </span>
                                            </div>

                                            {/* Quantity & Delete Button */}
                                            <div className=" flex flex-col justify-between items-end gap-2  ">
                                                <div className="min-w-26 flex justify-end ">
                                                    <QuantityBtn
                                                        id={item.product._id}
                                                        quantity={item.quantity}
                                                    />
                                                </div>

                                                <div>
                                                    <p className="text-sm font-normal">sub total</p>
                                                    <span className="text-md font-extrabold">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </span>
                                                </div>

                                                <button
                                                    className="text-xl  text-red-400 hover:text-red-500 hover:scale-110 transition-transform duration-200 cursor-pointer"
                                                    onClick={async () => {
                                                        try {
                                                            await removeFromCart(item.product._id).unwrap();
                                                        } catch (error) {
                                                            console.error(error);
                                                        }
                                                    }}
                                                >
                                                    <MdDelete />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>


                            {/* ================= CART ON LARGE SCREEN VIEW  ================= */}

                            <section className="hidden sm:block p-3 bg-white w-full lg:w-[60%] h-fit border rounded-lg">
                                <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                                    <thead className="bg-gray-300 text-gray-700 text-sm uppercase py-2">
                                        <tr>
                                            <th className="text-left px-6 py-3">Product</th>
                                            <th className="text-left px-6 py-3">Quantity</th>
                                            <th className="text-left px-6 py-3">Price</th>
                                            <th className="text-left px-6 py-3">Total</th>
                                            <th className="text-left px-6 py-3 ">Remove</th>
                                        </tr>
                                    </thead>

                                    <tbody className="text-gray-700">
                                        {cart.map((item) => (
                                            <tr
                                                key={item._id}
                                                className="shadow-[0_2px_4px_rgba(0,0,0,0.1)]  hover:bg-gray-100/60 transition-colors duration-200"
                                            >
                                                <td
                                                    className="w-[35%] group  px-2 py-3 font-medium cursor-pointer"
                                                    title="product details"
                                                >
                                                    <NavLink to={`/product/${item.product._id}`}>
                                                        {
                                                            <div className="flex justify-start gap-2 items-center">
                                                                <img
                                                                    src={item.product.image}
                                                                    alt={item.product.category}
                                                                    className="h-20 w-20 object-contain transition-transform duration-300 group-hover:scale-108"
                                                                />
                                                                <span className="line-clamp-2">
                                                                    {item.product.title}
                                                                </span>
                                                            </div>
                                                        }
                                                    </NavLink>
                                                </td>

                                                <td className="px-4 py-3 ">
                                                    <span className=" inline-block min-w-27">
                                                        <QuantityBtn
                                                            id={item.product._id}
                                                            quantity={item.quantity}
                                                        />
                                                    </span>
                                                </td>

                                                <td className="px-3 py-4  ">{

                                                    <span className="inline">{`$ ${item.price}`}</span>


                                                }</td>


                                                <td className="px-2 py-3 ">
                                                    <p>$ {(item.price * item.quantity).toFixed(2)}</p>
                                                </td>

                                                <td className="px-2 py-3 text-center ">
                                                    <button
                                                        className="text-2xl  text-red-300 hover:text-red-500 hover:scale-110 transition-transform duration-200 cursor-pointer"
                                                        onClick={async () => {
                                                            try {
                                                                await removeFromCart(item.product._id).unwrap();
                                                            } catch (error) {
                                                                console.error(error);
                                                            }
                                                        }}
                                                    >
                                                        <MdDelete />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </section>


                            {/* ================= BILL SUMMARY ================= */}

                            <div className=" border overflow-hidden w-full lg:w-[40%] sticky top-38 h-fit  rounded-lg">
                                <CartBill setLoader={setLoader} />
                            </div>
                        </section>
                    )}
                </section>
            </motion.div>
        </main>
    );
};

export default CartPage;
