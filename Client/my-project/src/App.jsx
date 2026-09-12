
// Hooks
import { Routes, Route } from 'react-router-dom';


import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { login } from "./Pages/Login/authSlice";
import { getLocalStorage } from './Utils/localStorage';
import { getCurrentUser } from './Pages/Login/authService';


// Importing Pages
import Home from './Pages/Home/Home';
import Products from './Pages/Product/Products';
import OrderPage from './Pages/Order/OrderPage';
import Wishlist from './Pages/Wishlist/Wishlist';
import ProductPage from './Pages/ProductPage/ProductPage';
import Search from './Pages/Search/Search';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import LoginPage from './Pages/Login/LoginPage';
import CartPage from './Pages/Cart/CartPage';
import SigninForm from './Pages/Login/SigninForm';
import RegisterForm from './Pages/Login/RegisterForm';




// Importing Layout Component
import Layout from './Layout/Layout';


// Importing Components
import BottomNavbar from './Components/BottomNavbar';
import Loader from './Components/Loader';

// Toast Message Library
import { Toaster } from "react-hot-toast";




function App() {


  const dispatch = useDispatch();


  useEffect(() => {

    const restoreSession = async () => {

      const token = getLocalStorage("token");

      if (!token) return;

      try {

        const response = await getCurrentUser(token);

        dispatch(login({
          user: response.data,
          token: token
        }));

      }

      catch (error) {
        console.log(error);
        localStorage.removeItem("token");
      }

    };

    restoreSession();

  }, []);


  return (
    <>

      {/* Hot-toast library for toast msgs */}
      <Toaster position="bottom-right" reverseOrder={false} />


      {/* Routes */}
      <Routes>

        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />}></Route>
          <Route path='/products' element={<Products />}></Route>
          <Route path='/cart' element={<CartPage />}></Route>
          <Route path='/wishlist' element={<Wishlist />}></Route>
          <Route path="/product/:id" element={<ProductPage />}></Route>
          <Route path='/orders' element={<OrderPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signin" element={<SigninForm />}></Route>
          <Route path="/register" element={<RegisterForm />}></Route>

        </Route>



        {/* These pages don't show navbar and footer */}
        <Route path="/search" element={<Search />}></Route>
        <Route path='*' element={<ErrorPage />}></Route>

      </Routes>

      {/* Bottom navbar for mobile  */}
      <div className='lg:hidden fixed bottom-0 left-0 w-full z-50'>
        <BottomNavbar />
      </div>
    </>
  )
}

export default App
