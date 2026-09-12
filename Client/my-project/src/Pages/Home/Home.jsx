
// Hooks
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



// Custom Hook
import { useGetProductsQuery } from '../Product/ProductApi'; 

// Components
import CategoryCard from './CategoryCard';
import ProductCard from '../../Components/ProductCard';

// Content Loader
import ContentLoader from 'react-content-loader'



// React ICons
import { TiArrowRight } from "react-icons/ti";
import { FiArrowRight } from "react-icons/fi";
import { PiRocketLaunchDuotone } from "react-icons/pi";
import { IoReloadCircleOutline } from "react-icons/io5";
import { MdOutlineDiscount } from "react-icons/md";
import { MdSupportAgent } from "react-icons/md";


// Import Framer Motion Library For Animation
import { motion } from 'framer-motion';


// Toast message Library
import toast from 'react-hot-toast';


import bannerImg from "../../Images/E-comm banner.jpg";




const Home = ({ ...rest }) => {



    const { data: Products, isLoading, error } = useGetProductsQuery(); 




    const isLogin = useSelector((state) => state.auth.isLogin);

    const navigate = useNavigate();



    // Filter product based on category
    const filterProduct = (category) => {
        return Products?.filter((item) => item.category === category);
    }


    const handleClick = () => {
        navigate("/products");
    }


    // Appeal user for login 
    useEffect(() => {
        if (!isLogin) {
            toast("Please login first", {
                icon: "➜",
                position: "top-right",
                duration: 2000,
                style: { marginTop: "80px" }
            });
        }
    }, [isLogin]);


    return (


        <main>


            {/* ================= HERO SECTION ================= */}

            <section
                className='h-[85dvh] md:h-screen w-full flex justify-start items-center drop-shadow-xl shadow-stone-500 bg-[#5134211a]
                         bg-cover bg-no-repeat bg-center lg:bg-top'

                style={{ backgroundImage: `url(${bannerImg})` }}>

                <motion.div
                    className='h-[60%]  md:h-full flex flex-col justify-center items-center md:items-start space-y-6 lg:space-y-8   rounded-lg p-4 md:p-6   '

                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.9 }}

                >

                    <motion.h1 className="text-3xl md:text-5xl xl:text-7xl bg-linear-to-r from-slate-800 to-slate-100 bg-clip-text text-transparent font-black text-center md:mt-30"
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Welcome to StoreFront
                    </motion.h1>

                    <div className='text-start '>
                        <motion.p
                            className={`text-md md:text-lg lg:text-2xl font-semibold md:font-normal bg-linear-to-r from-gray-800 via-stone-500 to-slate-50 bg-clip-text text-transparent text-center md:text-start`}
                            initial={{ opacity: 0, y: -40 }}
                            animate={{ opacity: 1, y: 20 }}
                            transition={{ duration: 1 }}
                        >
                            Discover an amazing collection of products at unbeatable prices. <br className='hidden md:block' />
                            Shop your favorite categories and enjoy fast, reliable delivery.
                        </motion.p>
                    </div>


                    <div className='flex gap-5 mt-8'>
                        <button className='p-2 px-5 bg-black text-sm md:text-lg lg:text-xl text-white rounded-md hover:text-black hover:bg-white transition transform hover:scale-105 duration-300'
                            onClick={handleClick}
                        >
                            Shop Now <TiArrowRight size={22} className='inline' />
                        </button>

                        <button

                            className='p-2 px-5 bg-white/50  md:bg-black/30 backdrop:blur-lg border-2 border-white/20 r-gray-400 text-sm md:text-lg lg:text-xl text-gray-700 rounded-md hover:shadow-lg '

                            onClick={() => {
                                document.getElementById("about").scrollIntoView({
                                    behavior: "smooth",

                                });
                            }}
                        >

                            Learn More
                        </button>
                    </div>

                </motion.div>


            </section>



            {/* ================= SHOP BY CATEGORY ================= */}

            <motion.section

                className='py-14 lg:py-20 px-4 md:px-10 space-y-8 sm:space-y-10 lg:space-y-12 bg-linear-to-r from-neutral-300/20 to-stone-400/20'

            >

                {/* Title and Description */}
                <div className=' '>

                    <motion.h2

                        className='text-2xl lg:text-4xl font-black  mb-1 md:mb-2 lg:mb-3 ' //Styling

                        initial={{ opacity: 0, x: -40 }} // Animation
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, amount: 0.4 }}
                    >
                        Shop by Category
                    </motion.h2>

                    <motion.p

                        className='text-gray-500 text-lg  lg:text-2xl font-normal'//Styling

                        initial={{ opacity: 0, x: -40 }} // Animation
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, amount: 0.4 }}
                    >
                        Explore our diverse product categories
                    </ motion.p>
                </div>




                <ul className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-7 '>

                    <li className='py-4 px-3 rounded-md bg-linear-to-r from-fuchsia-50/50 to-purple-50/60 shadow-md hover:shadow-lg hover:scale-103 transition-transform duration-400 ease-in-out'>

                        <CategoryCard product={filterProduct("women's clothing")} heading={"Women's Wear"} isLoading={isLoading} />
                    </li>

                    <li className='py-4 px-3 rounded-md bg-linear-to-r from-amber-200/10 to-yellow-100/10 shadow-md hover:shadow-lg hover:scale-103 transition-transform duration-400 ease-in-out'>
                        <CategoryCard product={filterProduct("jewelery")} heading={"Jewelry"} isLoading={isLoading} />
                    </li>

                    <li className='py-4 px-3 rounded-md bg-linear-to-r from-stone-400/10 to-zinc-700/10 shadow-md hover:shadow-lg hover:scale-103 transition-transform duration-400 ease-in-out'>
                        <CategoryCard product={filterProduct("men's clothing")} heading={"Men's Wear"} isLoading={isLoading} />
                    </li>

                    <li className='py-4 px-3 rounded-md bg-linear-to-r from-slate-500/20 to-gray-600/20 shadow-md hover:shadow-lg hover:scale-103 transition-transform duration-400 ease-in-out'>
                        <CategoryCard product={filterProduct("electronics")} heading={"Electronics"} isLoading={isLoading} />
                    </li>


                </ul>
            </motion.section>



            {/* ================= FEATURE PRODUCTS SECTION ================= */}

            <section className='py-14 lg:py-20 px-2  lg:px-10 space-y-8 sm:space-y-10 lg:space-y-8 '>

                <div className='space-y-1'>                        <motion.h2

                    className='text-2xl lg:text-4xl font-black  mb-1 md:mb-2 lg:mb-3 ' //Styling

                    initial={{ opacity: 0, x: -40 }} // Animation
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, amount: 0.4 }}
                >
                    Featured Products
                </motion.h2>

                    <p className='text-gray-500 text-lg lg:text-2xl font-normal'>Check out our carefully curated selection</p>
                </div>



                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                    {isLoading || error
                        ? Array.from({ length: 4 }).map((_, index) => (
                            <ContentLoader height="500" style={{ width: "100%" }} viewBox="0 0 275 240" {...rest}>
                                <rect x="15" y="15" rx="4" ry="4" width="25" height="25" />
                                <rect x="15" y="50" rx="2" ry="2" width="350" height="150" />
                                <rect x="15" y="230" rx="2" ry="2" width="170" height="20" />
                                <rect x="60" y="230" rx="2" ry="2" width="170" height="20" />
                            </ContentLoader>
                        ))
                        : Products?.slice(2, 6).map((item) => (
                            <ProductCard key={item.id} product={item} />
                        ))
                    }
                </div>
            </section>



            {/* ================= READAY TO SHOP ================= */}

            <section className=' py-10 lg:py-20 border-t border-stone-200 bg-linear-to-r from-zinc-300/20 via-slate-50 to-zinc-300/10  drop-shadow-sm'>

                <div className=' flex flex-col justify-center items-center mb-12 rounded-md  gap-y-6 py-9 '>

                    <div className='text-center space-y-3 md:space-y-4'>
                        <h3 className='text-3xl sm:text-4xl lg:text-5xl font-black '>Ready to shop?</h3>
                        <p className='p-2 lg:px-2 text-center text-sm md:text-lg font-normal '>Explore an extensive collection of products across all categories,<br className='hidden md:block' /> and find the perfect items that match your style, preferences, and everyday needs.</p>
                    </div>

                    <div className=''>
                        <button
                            className='inline-block cursor-pointer text-white bg-stone-800 px-8 py-2 rounded-sm shadow-sm shadow-gray-50/50 transition-transform hover:scale-102 duration-500 ease-in-out hover:text-md'
                            onClick={() => navigate('/products')}>
                            Browse All Products <FiArrowRight className='inline' />
                        </button>
                    </div>

                </div>


            </section>



            {/* ================= ABOUT SECTION ================= */}

            <section id='about' className=" py-22 px-4 md:px-10 lg:px-20 scroll-mt-10 bg-linear-to-r from-[#e4e3e3a5] to-[#eae6ec]">

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">


                    <div

                        initial={{ opacity: 0, x: -40 }} // Animation
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, amount: 0.4 }}
                    >
                        <p className="text-xl  font-bold text-purple-700 mb-3">
                            OUR STORY
                        </p>

                        <motion.h1 className="text-2xl lg:text-4xl font-black  mb-6 text-gray-600 "
                            initial={{ opacity: 0, x: -40 }} // Animation
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true, amount: 0.4 }}
                        >
                            Quality Over Quantity
                        </motion.h1>

                        <motion.p className="text-gray-500 mb-4 text-sm md:text-lg"
                            initial={{ opacity: 0, x: -40 }} // Animation
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.9 }}
                            viewport={{ once: true, amount: 0.4 }}
                        >

                            StoreFront was founded with a simple mission: to bring curated,
                            high-quality products directly to customers who value excellence.
                            In a world of mass-produced goods and endless choices, we stand as a
                            beacon for those who believe in intentionality.
                        </motion.p>

                        <motion.p className="text-gray-500 mb-8 text-sm md:text-lg"
                            initial={{ opacity: 0, x: -40 }} // Animation
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.9 }}
                            viewport={{ once: true, amount: 0.4 }}>

                            Our approach is different. We carefully select every product in our
                            catalog, ensuring authenticity, durability, and value. We don’t
                            chase trends—we create experiences that matter and build lasting
                            relationships with our customers.
                        </motion.p>

                        <motion.div className="grid grid-cols-3 sm:grid-cols-3 gap-6"

                            initial={{ opacity: 0, x: -40 }} // Animation
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.9 }}
                            viewport={{ once: true, amount: 0.4 }}
                        >


                            <div className='text-center md:text-start space-y-2'>
                                <h2 className="text-2xl font-bold text-purple-700">01</h2>
                                <p className="text-black text-sm md:text-lg font-medium md:font-semibold lg:font-extrabold">QUALITY FIRST</p>
                                <p className="text-xs font-light md:text-lg text-gray-700">
                                    Rigorous selection process for every item
                                </p>
                            </div>

                            <div className='text-center md:text-start space-y-2'>
                                <h2 className="text-2xl font-bold text-purple-700">02</h2>
                                <p className="text-black text-sm md:text-lg font-medium md:font-semibold lg:font-extrabold">TRANSPARENCY</p>
                                <p className="text-xs font-light md:text-lg text-gray-700">
                                    Open communication with our community
                                </p>
                            </div>

                            <div className='text-center md:text-start space-y-2'>
                                <h2 className="text-2xl font-bold text-purple-700">03</h2>
                                <p className="text-black text-sm md:text-lg font-medium md:font-semibold lg:font-extrabold">RELIABILITY</p>
                                <p className="text-xs font-light md:text-lg text-gray-700">
                                    Consistent service you can trust
                                </p>
                            </div>

                        </motion.div>
                    </div>


                    <motion.div className="bg-white overflow-hidden "

                        initial={{ opacity: 0, y: -60 }} // Animation
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true, amount: 0.4 }}

                    >

                        <div className="rounded-2xl overflow-hidden shadow-lg p-4">

                            <img
                                src="https://images.pexels.com/photos/3538028/pexels-photo-3538028.jpeg"
                                alt="About"
                                className="w-full h-[350px]  lg:h-160 object-contain md:object-top lg:object-cover rounded-xl overflow-hidden"
                            />

                        </div>

                    </motion.div>

                </div>
            </section>




            {/* ================= WHAT WE BELIEVE SECTION ================= */}

            <section className='w-full py-10 px-4 md:px-10 lg:px-18'>

                <div className='max-w-8xl flex flex-col justify-center items-center mb-12 rounded-md py-10  lg:py-18 lg:px-7 gap-y-15 lg:gap-y-25'>

                    <div className='w-full px-3 text-center'>
                        <h3 className='text-3xl lg:text-5xl font-black '>What we believe</h3>
                    </div>

                    <ul className='grid gird-cols-1 md:grid-cols-2 lg:grid-cols-4  justify-items-center items-start gap-x-5 space-y-10 w-full p-2'>

                        <li className=' flex items-center gap-x-3 w-full transition-transform hover:scale-103 duration-300 ease-in-out '>
                            <div className='text-4xl'>
                                <PiRocketLaunchDuotone />
                            </div>

                            <div>
                                <p className='text-lg lg:text-xl font-bold'>Free Shipping</p>
                                <span className='text-md lg:text-lg font-normal text-gray-500'>Orders $50 or moree</span>
                            </div>
                        </li>

                        <li className='flex items-center gap-x-3 w-full transition-transform hover:scale-103 duration-300 ease-in-out'>
                            <div className='text-4xl'>
                                <IoReloadCircleOutline />
                            </div>

                            <div>
                                <p className='text-lg lg:text-xl font-bold'>Free returns</p>
                                <span className='text-md lg:text-lg font-normal text-gray-500'>Within 30 days</span>
                            </div>
                        </li>

                        <li className='flex items-center gap-x-3 w-full transition-transform hover:scale-103 duration-300 ease-in-out'>
                            <div className='text-4xl'>
                                <MdOutlineDiscount />
                            </div>

                            <div>
                                <p className='text-lg lg:text-xl font-bold'>Get 10 to 20% off </p>
                                <span className='text-md lg:text-lg font-normal text-gray-500'>When you sign up</span>
                            </div>
                        </li>

                        <li className='flex items-center gap-x-3 w-full transition-transform hover:scale-103 duration-300 ease-in-out '>
                            <div className='text-4xl'>
                                <MdSupportAgent />
                            </div>

                            <div>
                                <p className='text-lg lg:text-xl font-bold'>We support</p>
                                <span className='text-md lg:text-lg font-normal text-gray-500'>24/7 amazing service</span>
                            </div>
                        </li>
                    </ul>

                </div>

            </section>







        </main >
    )
}

export default Home
