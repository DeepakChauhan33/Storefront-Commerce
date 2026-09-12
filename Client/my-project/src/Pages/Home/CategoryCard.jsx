import { div } from 'framer-motion/client';
import React from 'react'

// Framer Motion Library
import { animate, motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import Loader from '../../Components/Loader';

const Categories = ({ product, heading, isLoading }) => {

    if (isLoading) {
        return <Loader />
    }

    return (

        <NavLink to="/products">


            <div className='text-center cursor-pointer'>


                {/* Displaying the category name here, which we get as props "heading" */}
                <motion.h2

                    className='text-xl font-extrabold mb-4' //Styling

                    initial={{ opacity: 0, x: -30 }} // Animation
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.1 }}
                    viewport={{ once: true, amount: 0.4 }}

                >
                    {heading}

                </motion.h2>


                <motion.div
                    className=' grid grid-cols-2 grid-rows-2 justify-items-center gap-4'

                    initial={{ opacity: 0, x: 30 }} // Animation
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.1 }}
                    viewport={{ once: true, amount: 0.4 }}
                >
                    {product?.slice(0, 4).map((item) => {
                        return <div id={product.id} className='h-auto bg-white rounded-2xl  '>
                            <div className='h-[45vw] w-auto   md:h-40 p-2 shadow-lg'>
                                <img src={item.image} alt={item.title} className='object-contain h-full w-full' />
                            </div>
                        </div>
                    })}
                </motion.div>
            </div>

        </NavLink>
    )
}

export default Categories
