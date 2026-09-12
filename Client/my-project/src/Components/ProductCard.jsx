import React from 'react'


// Motion
import { motion } from 'framer-motion';

// React Icons
import { IoCartOutline } from "react-icons/io5";





// Component
import ButtonComp from './ButtonComp';
import { NavLink } from 'react-router-dom';
import WishlistBtn from './WishlistBtn';


const ProductCard = React.memo(({ product }) => {



    // FUNCTION RETURN STARS BASED ON PRODUCT RATING
    function handleRating(rate) {
        let rateStar = "";

        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rate)) {
                rateStar += "★ ";
            } else {
                rateStar += "☆ ";
            }
        }
        return rateStar;



    }




    return (

        <motion.div

            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.4 }}

            className='flex flex-col justify-between rounded-lg border shadow-md border-gray-400/30 min-h-[450px] p-2 pb-4 space-y-2.5 overflow-hidden bg-white'
            id={product._id}>



            {/* Image Div */}

            <div className='relative h-70 w-full rounded-lg overflow-hidden mb-5 '>
                <NavLink to={`/product/${product._id}`}>
                    <img src={product.image} alt={product.title} className='h-full w-full bg-gray-200 p-3 object-contain ' />
                </NavLink>

                <WishlistBtn product={product} position={'absolute'} />

            </div>




            {/* Product Name */}

            <h2 className='text-lg text-gray-800 font-extrabold line-clamp-3 cursor-pointer'>
                <NavLink to={`/product/${product._id}`}>
                    {product.title}
                </NavLink>
            </h2>


            {/* Product Rating*/}
            <div className='flex justify-between items-center  text-sm text-gray-700 font-[700]'>
                <span>{`Rating : ${handleRating(product.rating.rate)} `}</span>
                <span>{`Reviews : ${product.rating.count}`}</span>
            </div>

            {/* Product Description */}
            <div className='text-sm'>
                <p className='line-clamp-3'>{product.description}</p>
            </div>


            {/* Div contain product price and button */}
            <div className='flex  justify-between mt-2 '>

                {/* Product Price */}
                <p className='text-2xl lg:text-[2vw]  font-extrabold'>${product.price}</p>


                {/*Add to Cart Button */}
                <ButtonComp width={"w-[50%] px-2 py-2.5 lg:px-4 lg:py-3 "} product={product}><IoCartOutline className='inline ' /> Add to cart</ButtonComp>


            </div>


        </motion.div >
    )
})

export default ProductCard
