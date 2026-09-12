import { div, p } from 'framer-motion/client';
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

// ACTIONS
// import { clearCart } from './CartSlice';
// import { addOrder } from '../Order/orderSlice';

// SERVICE
import { createOrder, getOrders } from '../Order/orderService';
import { useGetCartQuery, useClearCartMutation } from './cartAPI';

import { setOrders } from "../Order/orderSlice";



// Toast Message
import toast from 'react-hot-toast';

const CartBill = ({ setLoader }) => {

    const { data: cart = [] } = useGetCartQuery();

    const isLogin = useSelector((state) => state.auth.isLogin);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [clearCart] = useClearCartMutation();



    const total = useMemo(() => {
        return calculateTotal(cart);

    }, [cart])



    async function handleOrder() {

        if (!isLogin) {
            toast("Please login first");
            return;
        }

        try {

            setLoader(true);

            const orderProducts = cart.map((item) => ({
                productId: item.product._id,
                title: item.product.title,
                price: item.price,
                quantity: item.quantity,
            }));

            const orderData = {
                products: orderProducts,
                totalAmount: total + 50,
            };

            // Create Order
            await createOrder(orderData);

            // Clear Cart
            await clearCart().unwrap();

            // Fetch Updated Orders
            const response = await getOrders();

            // Store Orders in Redux
            dispatch(setOrders(response.data));

            // Navigate
            navigate("/orders");

        } catch (error) {

            console.log(error);
            toast.error("Failed to place order");

        } finally {

            setLoader(false);

        }

    }


    return (
        <section className='bg-white p-4 '>
            <h2 className='text-xl font-semibold mb-3'>Order Smmary</h2>


            <div className='p-0.5 md:p-2 '>

                {/* VOucher Container */}
                <div className='flex justify-between items-center gap-2 sm:gap-7 md:gap-10 lg:gap-6 mb-5 '>
                    <input type="text" placeholder='Discount voucher' className='flex-1 border p-1.5 lg:p-2.5 rounded-3xl uppercase' />
                    <button className='border rounded-3xl px-3.5 py-1.5 text-md font-light cursor-pointer hover:bg-black hover:text-white transition-colors duration-200 ease-in-out'>Apply</button>
                </div>

                {/* Price Details */}
                <div className="space-y-2 text-sm">


                    {/* Item Price */}
                    <div className='  '>
                        {cart.map((item) => (
                            <div
                                key={item.product._id}
                                className="flex justify-between space-y-2"
                            >
                                <span className="line-clamp-1 w-[70%]">
                                    {item.product.title}
                                </span>

                                <span>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        ))}

                    </div>


                    <hr className="my-4" />

                    {/* Sub-Total  */}
                    <div className='flex justify-between '>
                        <span>SUb-total</span>
                        <span>{(total).toFixed(2)}</span>

                    </div>

                    <div className="flex justify-between">
                        <span></span>
                        <span className="font-medium">{ }</span>
                    </div>



                    <div className="flex justify-between">
                        <span>Delivery fee</span>
                        <span>$50</span>
                    </div>

                </div>

                {/* Divider */}
                <hr className="my-4" />

                {/* Total */}
                <div className="flex justify-between text-lg font-semibold mb-4">
                    <span>Total</span>
                    <span>${(total + 50).toFixed(2)}</span>
                </div>

                {/* Checkout & Shoping Btn */}
                <div className='space-y-3 mt-10'>
                    <button className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-900  " onClick={handleOrder}>Checkout Now</button>
                    <button className="w-full bg-gray-50 border text-black py-3 rounded-full " onClick={() => navigate("/products")}>Continue shopping</button>
                </div>


            </div>
        </section>
    )
}


function calculateTotal(cart) {
    let total = cart.reduce((acc, crr) => {
        return acc + crr.price * crr.quantity
    }, 0)

    return total;

}

export default CartBill
