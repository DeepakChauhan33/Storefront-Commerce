
// Hooks
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";


// Reac Icons
import { FiHeart, FiShoppingCart, FiMenu } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";



// LOGO
import logo from "../Images/STORE FRONT.png";


// Motion
import { motion } from "framer-motion";


// Wishlist Service 
import { useGetWishlistQuery } from "../Pages/Wishlist/wishlistAPI";


// Cart Service
import { useGetCartQuery } from "../Pages/Cart/cartAPI";


const Navbar = () => {

    const isLogin = useSelector((state) => state.auth.isLogin);

    const { data: wishlist = [] } = useGetWishlistQuery(undefined, {
        skip: !isLogin,
    });

    const wishlistCount = wishlist.length;


    const { data: cart = [] } = useGetCartQuery(undefined, {
        skip: !isLogin,
    });

    const cartCount = cart.length;

    return (
        <header className="w-full bg-white  opacity-90 shadow-purple-900  drop-shadow-lg  fixed top-0 left-0 z-50 ">
            <nav className=" mx-auto px-2 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-18">


                    {/* Logo */}
                    <motion.div
                        className="flex items-center cursor-pointer  "

                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <NavLink to="/">
                            <img src={logo} alt="logo" className='h-16 object-cover   ' />
                        </NavLink>
                    </motion.div>


                    {/* Navigation Link */}
                    <div className="hidden h-full  lg:flex space-x-12 text-lg font-sans text-black font-bold">

                        {/* Home */}
                        <NavLink to="/" className="h-full flex justify-center px-2 items-center border-b-3 border-transparent  hover:border-b-3 hover:border-purple-700  hover:text-purple-700 transition transform hover:scale-100  ease-in-out duration-400">
                            Home
                        </NavLink>

                        {/* Products */}
                        <NavLink to="/products" className="h-full flex justify-center px-2 items-center border-b-3 border-transparent  hover:border-b-3 hover:border-purple-700  hover:text-purple-700 transition transform hover:scale-100  ease-in-out duration-400">
                            Products
                        </NavLink>

                        {/* Orders */}
                        <NavLink to="/orders" className="h-full flex justify-center px-2 items-center border-b-3 border-transparent  hover:border-b-3 hover:border-purple-700  hover:text-purple-700 transition transform hover:scale-100  ease-in-out duration-400">
                            Orders
                        </NavLink>

                        {/* Cart */}
                        <NavLink to="/cart" className="relative h-full flex justify-center px-2 items-center border-b-3 border-transparent  hover:border-b-3 hover:border-purple-700  hover:text-purple-700 transition transform hover:scale-100  ease-in-out duration-400">
                            <span className=' min-w-19'>Cart({cartCount})</span>

                        </NavLink>



                    </div>


                    {/* Right Side Icon Link */}
                    <div className="flex items-center gap space-x-4 md:xl:space-x-6">


                        {/* Search Icon */}
                        <NavLink to="/search">
                            <div className="cursor-pointer p-2 hover:bg-black hover:text-white rounded-lg  transition transform hover:scale-110 ease-in-out duration-300" >
                                <BsSearch size={20} />
                            </div>
                        </NavLink>



                        {/* Wishlist Icon */}
                        <NavLink to="/wishlist">
                            <div className="relative cursor-pointer p-2 hover:bg-black hover:text-white rounded-lg  transition transform hover:scale-110 ease-in-out duration-300" title="Wishlist" >

                                <FiHeart size={20} />
                                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1.5 text-xs font-normal leading-none text-white bg-red-600 rounded-full">{wishlistCount}</span>
                            </div>
                        </NavLink>



                        {/* Profile Icon */}
                        <div className={`hidden lg:block relative cursor-pointer p-2  }`} title="Profile">
                            <NavLink to="/login">
                                <CgProfile size={26} className={`${isLogin ? 'text-purple-600' : 'text-gray-900'}`} />
                            </NavLink>
                        </div>


                    </div>
                </div>
            </nav>



        </header>
    );
};

export default Navbar;