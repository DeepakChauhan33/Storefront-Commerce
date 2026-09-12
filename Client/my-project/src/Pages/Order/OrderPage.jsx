

// React Icons
import { LuBox } from "react-icons/lu";
import { FaBox } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa6";
import { FaBoxOpen } from "react-icons/fa";
import { FiBox } from 'react-icons/fi';


import toast from "react-hot-toast";


// Action
import { clearOrder, setOrders } from './orderSlice';


// Motion 
import { motion } from 'framer-motion';

// Hooks
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";



// Service
import { getOrders } from "./orderService";






const OrderPage = () => {

  const isLogin = useSelector((state) => state.auth.isLogin);

  const orders = useSelector((state) => state.orders.orders);


  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {


    console.log("Fetching orders...");

    const fetchOrders = async () => {

      try {

        const response = await getOrders();
        dispatch(setOrders(response.data));

      } catch (error) {
        toast.error("Failed to load orders");
      }

    };

    fetchOrders();

  }, []);

  return (


    <main className=' w-full md:p-3 space-y-4'>

      {/* ================= ORDERS PAGE HEADER  ================= */}

      <motion.div
        className='m-1 py-3 px-1.5 md:px-2 md:py-3 space-y-1.5 md:space-y-2 '

        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className='text-2xl lg:text-4xl font-black lg:font-semibold ' > <FiBox className='inline text-4xl  md:text-6xl text-slate-700' /> My Orders</h1>
        <p className='pl-3 text-md lg:text-xl font-normal inline'>You have {orders.length} order</p>
        {!isLogin && <span className="text-red-500 ml-4 font-semibold"> (login first)</span>}
      </motion.div>





      <motion.div className=' bg-gray-100 m-1.5 rounded-sm  p-2'

        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {orders.length === 0 || !isLogin ?
          (


            <motion.section
              className='h-120 flex justify-center items-center  '

              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5 }}

            >
              {/* ================= EMPTY ODER PAGE ================= */}

              <div className='flex flex-col justify-center items-center gap-4'>
                <FaBoxOpen className="text-7xl lg:text-8xl text-gray-400" />

                <p className="text-lg md:text-xl lg:text-3xl text-center font-normal">
                  No orders here—why not start shopping?
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
            </motion.section>
          )
          :
          (
            <div className='h-auto flex flex-col gap-4 mt-6 lg:mt-10 p-1 '>

              {/* =================  ODER PRODUCT SUMMARY ================= */}

              {orders.map((order) => (
                <div key={order._id} className="bg-gray-50 rounded-lg overflow-hidden border border-slate-300"  >

                  <div className='flex justify-between bg-slate-200/60 px-1.5 py-2 lg:px-6 lg:py-2.5 text-sm  md:text-md lg:text-lg'>
                    {/* Order ID */}
                    <div className='flex flex-col justify-center items-center lg:items-start gap-3 p-2 lg:p-3'>
                      <FaBox />
                      <p>ID : {order._id}</p>
                    </div>

                    {/* Order Date */}
                    <div className='flex flex-col justify-center items-center lg:items-start gap-3 p-2 lg:p-3'>
                      <FaRegCalendarAlt />
                      <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>

                    <div className='flex flex-col justify-center items-center lg:items-start gap-3 p-2 lg:p-3' title='Total amount'>
                      {/* Order Total */}
                      <FaDollarSign />
                      <p className='font-bold'>{order.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className='p-3'>
                    <p className='text-md font-semibold mb-3'>Order items</p>
                    {order.products.map((item) => (
                      <div key={item.productId} className='flex justify-between space-y-4'>
                        <div className='w-[70%] '>
                          <p className='text-sm'>{item.title}</p>
                          <p className='text-sm font-medium text-gray-600'>Qty : {item.quantity}</p>

                        </div>

                        <div className='text-end'>
                          <p className='text-sm'>${item.price.toFixed(2)}</p>
                          <p className='text-sm font-normal text-gray-600'>sub total : {(item.price * item.quantity).toFixed(2)}</p>

                        </div>

                      </div>
                    ))}
                  </div>

                  <div className='flex justify-between p-2 lg:p-3.5 lg:px-5 bg-slate-200/60 '>
                    <span className=' p-2 hover:underline'>View Details</span>
                    <button
                      className='shadow-md rounded-md px-2 lg:px-3 py-1 text-sm  bg-white cursor-pointer transition-transform hover:scale-101'
                      onClick={() => (navigate("/products"))}>order again</button>
                  </div>

                </div>

              ))}



              {/* Clear orders button */}

              <div className=' flex justify-center items-center mt-5'>
                <button className=' bg-black text-sm text-white px-2 py-3 lg:px-4 lg:py-3 rounded-sm hover:bg-gray-800' onClick={() => dispatch(clearOrder())}>Clear order</button>
              </div>


            </div>


          )

        }

      </motion.div>
    </main>
  )
}

export default OrderPage
