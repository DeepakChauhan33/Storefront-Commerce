import React, { useEffect } from 'react'

// Components
import ButtonComp from '../../Components/ButtonComp';

// Hooks
// import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';


// Wishlist Service 
import { useGetWishlistQuery, useRemoveWishlistMutation } from "../../Pages/Wishlist/wishlistAPI";


// import {
//   useGetWishlistQuery,
//   useRemoveWishlistMutation
// } from "../../Pages/Wishlist/wishlistAPI";



// Motion
import { motion } from 'framer-motion';

// React Icons
import { LuBox } from "react-icons/lu";
import { IoIosClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { PiCalendarHeartLight } from "react-icons/pi";
import { TbShoppingBagHeart } from "react-icons/tb";



// Action
import { removeFromWishlist } from './WishlistSlice';



const Wishlist = () => {

  const navigate = useNavigate();

  const {
    data: wishlist = [],
    isLoading,
    isError
  } = useGetWishlistQuery();

  const [removeWishlist] = useRemoveWishlistMutation();

  if (isLoading) {

    return <h2>Loading...</h2>

  }


  return (
    <main className=' w-full   md:p-3 space-y-4'>

      {/* ================= HEADER SECTION ================= */}

      <motion.div className=' m-1 py-3 px-1.5 md:px-2 md:py-3 space-y-1.5 md:space-y-2  '

        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className='text-2xl lg:text-4xl font-bold lg:font-semibold ' ><TbShoppingBagHeart className='inline text-4xl  md:text-6xl text-slate-700' /> My Wishlist</h1>
        {wishlist.length === 0 ? (<p className='pl-3 text-md lg:text-xl font-normal'>No items in your wishlist</p>) : (<p className='pl-2 md:pl-3 text-sm lg:text-xl font-normal'>You have {wishlist.length} items in your wishlist</p>)}

      </motion.div>



      <section className=' m-1.5 rounded-xl  md:p-2.5'>

        {wishlist.length === 0 ? (
          <motion.section
            className='h-120 flex justify-center items-center '

            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}

          >
            <div className='flex flex-col justify-center items-center gap-4'>
              <PiCalendarHeartLight className="text-7xl lg:text-9xl  text-gray-400" />

              <p className="text-lg md:text-xl lg:text-3xl text-center font-normal">
                Add your favorite products to come back to them later
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
        ) : (



          <>

            {/* ================= WISHLIST ON MOBILE VIEW  ================= */}


            <section className="block sm:hidden space-y-4 pt-5">

              {wishlist.map((item) => (
                <div className=' flex shadow-sm bg-white gap-1.5 border  border-stone-400/40  rounded-sm overflow-hidden' key={item._id}>
                  {/* Image */}
                  <div className='relative h-33 w-40  p-2 bg-gray-200  ' title="product details">

                    <NavLink to={`/product/${item._id}`} >
                      <img src={item.image} alt={item.category} className='h-full w-full object-contain ' />
                    </NavLink>

                  </div>

                  {/* Details */}
                  <div className='relative w-full flex flex-col justify-evenly p-1 gap-1'>

                    {/* Product Title & Price */}
                    <p className='text-md font-semibold line-clamp-2'>{item.title}</p>

                    <p className='text-xl font-extrabold py-1'>$ {item.price.toFixed(2)}</p>


                    <div className='flex gap-4'>
                      <ButtonComp width={"w-full cursor-pointer  py-1.5"} product={item} >Add to cart</ButtonComp>

                      <button
                        className="bg-white px-1.5"
                        onClick={async () => {
                          try {
                            await removeWishlist(item._id).unwrap();
                          } catch (error) {
                            console.error("Remove wishlist error:", error);
                          }
                        }}
                      >
                        <MdDelete className="text-2xl text-red-400/90" />
                      </button>

                    </div>


                  </div>
                </div>
              ))}

            </section>



            {/* ================= WISHLIST ON LARGE SCREEN VIEW  ================= */}

            <section className="hidden sm:block p-3">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">

                <thead className="bg-gray-300 text-gray-700 text-sm uppercase py-2">
                  <tr>
                    <th className="text-left px-6 py-3">Product</th>
                    <th className="text-left px-6 py-3">Price</th>
                    <th className="hidden md:block text-left px-6 py-3">Stock Status</th>
                    <th className="text-left px-6 py-3">Action</th>
                    <th className="text-left px-6 py-3">Remove</th>
                  </tr>
                </thead>

                <tbody className="text-gray-700">

                  {wishlist.map((item) =>
                  (
                    <tr key={item._id}
                      className="shadow-[0_2px_4px_rgba(0,0,0,0.1)]  hover:bg-gray-100/60 transition-colors duration-200">

                      <td className="w-[40%] group  px-6 py-4 font-medium cursor-pointer" title="product details">
                        <NavLink to={`/product/${item._id}`} >
                          {<div className='flex justify-start gap-2 items-center'>

                            <img src={item.image} alt={item.category} className='h-20 w-20 object-contain transition-transform duration-300 group-hover:scale-108' />
                            <span>{item.title}</span>

                          </div>}
                        </NavLink>
                      </td>

                      <td className="px-6 py-4">
                        ${item.price.toFixed(2)}
                      </td>

                      <td className="hidden md:block px-6 py-4  ">
                        <span className="text-green-600 font-normal">
                          In Stock
                        </span>
                      </td>

                      <td>
                        <ButtonComp
                          width={"w-32 cursor-pointer py-2"}
                          product={item}
                        >
                          Add to Cart
                        </ButtonComp>
                      </td>


                      <td className="px-6 py-4">
                        <button
                          title="remove"
                          className="hover:bg-red-200 rounded-full transition-colors duration-200"
                          onClick={() => removeWishlist(item._id)}
                        >
                          <IoIosClose className="text-3xl text-gray-400 hover:text-red-500 hover:scale-110 transition-transform duration-200" />
                        </button>
                      </td>


                    </tr>
                  ))}

                </tbody>

              </table>


            </section>

            <div className='text-center mt-7 py-4'

              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <button
                onClick={() => navigate("/products")}
                className='bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200'>
                Shop more
              </button>
            </div>

          </>
        )}


      </section>
    </main>
  )
}

export default Wishlist
