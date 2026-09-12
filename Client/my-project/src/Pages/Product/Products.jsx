
// Hooks
import { useState, useMemo, useEffect } from 'react';


// Icons
import { BsHandbag } from "react-icons/bs";


// Components
import ProductCard from '../../Components/ProductCard';
import CategoryAccordion from './CategoryAccordion';


// Content Loader
import ContentLoader from 'react-content-loader'

// Motion
import { motion } from 'framer-motion';

// API Actions
import { useGetProductsQuery } from '../Product/ProductApi';  







const ProductPage = ({ ...rest }) => {
    

    const { data: Products, isLoading, error } = useGetProductsQuery();


    const [selected, setSelected] = useState("All Products");



    if (isLoading) {
        return <ContentLoader height="500" style={{ width: "100%" }} viewBox="0 0 275 240" {...rest}>
            <rect x="15" y="15" rx="4" ry="4" width="25" height="25" />
            <rect x="15" y="50" rx="2" ry="2" width="350" height="150" />
            <rect x="15" y="230" rx="2" ry="2" width="170" height="20" />
            <rect x="60" y="230" rx="2" ry="2" width="170" height="20" />
        </ContentLoader>
    } else if (error) {
        return (
            <section className='h-[70vh] flex flex-col items-center justify-center gap-y-5'>
                <p className='text-md lg:text-xl font-semibold'>We're having trouble reaching our servers!</p>
                {/* Added onClick to trigger the reload */}
                <button
                    onClick={() => window.location.reload()}
                    className='border py-1 px-8 rounded-xl hover:bg-gray-100 transition-colors text-red-500'
                >
                    Try Again
                </button>
            </section>
        );
    }



    let msg = "";


    if (selected === "All Products") {
        msg = "Explore our full collection—something for everyone!"
    } else if (selected === "electronics") {
        msg = "Latest gadgets and smart tech to power your life."
    } else if (selected === "jewelery") {
        msg = "Elegant designs that shine with every occasion."
    } else if (selected === "men's clothing") {
        msg = "Stylish fits and everyday essentials for him."
    } else if (selected === "women's clothing") {
        msg = "Trendy outfits and timeless fashion for her."
    } else {
        msg = "See Products"
    }




    // Filter products based on selected category
    const filterProducts = useMemo(() => {
        if (!Products) return [];

        return selected === "All Products"
            ? Products
            : Products.filter(item => item.category === selected);
    }, [Products, selected]);



    return (
        <main className='w-full p-2 md:p-3'>

            {/* ================= PRODUCT PAGE HEADER ================= */}

            <motion.div

                className=' px-2 py-3 space-y-2 '

                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}>
                <h1 className='text-2xl lg:text-4xl font-bold lg:font-semibold '> <BsHandbag className='inline text-4xl  md:text-6xl text-slate-700' /> See Products</h1>
                <p className='text-sm lg:text-xl font-normal'>{msg}</p>
            </motion.div>


            {/* ================= CONTAINER ================= */}

            <div className=' flex flex-col md:flex-row justify-start items-start py-6 space-x-0 md:space-x-10 space-y-5 md:space-y-0 md:p-3 mt-2 lg:mt-5 '>


                {/* ================= CATEGORY ACCORDION ================= */}

                <motion.div
                    className='w-full md:w-[20%] border border-gray-300  rounded-lg md:sticky top-24  '

                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}>

                    <CategoryAccordion selected={selected} setSelected={setSelected} />

                </motion.div>




                {/* ================= PRODUCTS CONTAINER ================= */}

                <section className='w-full md:w-[80%]'>

                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 '>

                        {filterProducts?.map((item) =>
                            <ProductCard key={item.id} product={item} />)
                        }

                    </div>
                </section>
            </div>
        </main >
    )
}

export default ProductPage
