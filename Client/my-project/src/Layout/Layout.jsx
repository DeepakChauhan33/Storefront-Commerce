import React from 'react'

import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <Navbar />

            <div className='pt-17'>
                <Outlet />
            </div>

            <Footer />
        </>
    )
}

export default Layout
