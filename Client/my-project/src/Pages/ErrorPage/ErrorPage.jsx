import React from 'react'


// IMAGE
import ErrorImg from "../../Images/ErrorImg.svg"


// HOOKS
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {

    const navigate = useNavigate();
    return (
        <section
            className="h-[85dvh] md:h-screen pt-5 text-center bg-no-repeat bg-center bg-contain flex flex-col justify-end items-center p-5"
            style={{ backgroundImage: `url(${ErrorImg})`, position: 'center' }}
        >

            <button className='w-[80%] md:w-1/2 text-lg md:text-2xl py-2  border-2  border-red-600 bg-red-400 cursor-pointer rounded-xl lg:mb-10 transition-transform hover:scale-101'
                onClick={() => navigate('/')}>
                Go to Home
            </button>

        </section>
    )
}

export default ErrorPage