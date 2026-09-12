// HOOKS
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


// // TOAST MESSAGE LIBRARY
import toast from 'react-hot-toast';



// ACTIONS
import { login, logout, userDetails } from './authSlice';

// AUTH SERVICE
import { loginUser } from './authService';

// Functions
import { setLocalStorage, getLocalStorage } from '../../Utils/localStorage';

// Store Front Logo
import logo from "../../Images/STORE FRONT.png";


const SigninForm = () => {

  const isLogin = useSelector((state) => state.auth.isLogin);

  const navigate = useNavigate();

  const dispatch = useDispatch();




  // NAME
  const [name, setName] = useState("");

  // EMAIL
  const [email, setEmail] = useState("");

  // PASSWORD
  const [password, setPassword] = useState("");

  // ERROR MESSAGE
  const [errMsg, setErrMsg] = useState({
    emailError: " ",
    passwordError: " ",
    nameError: " "
  })

  // 
  const [formValid, setFormValid] = useState(false);



  // CHECK EMAIL VALIDATION USING REGEX 
  const validateEmail = (email) => {

    let emailError = errMsg.emailError;
    let isValid = formValid;
    let pattern = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

    if (!pattern.test(email.trim())) {
      emailError = "Enter a valid email"
      isValid = false;
    } else {
      emailError = " ";
      isValid = true;
    }

    setEmail(email.trim());
    setErrMsg({ ...errMsg, emailError });
    return isValid;
  }



  // CHECK PASSWORD VALIDATION USING REGEX 

  const validatePassword = (password) => {

    let passwordError = errMsg.passwordError;
    let isValid = formValid;
    let pattern = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;


    if (!pattern.test(password.trim())) {
      passwordError = "Password have minimum 8 characters, uppercase letter, digit(0-1) and special character";
      isValid = false;
    } else {
      passwordError = " ",
        isValid = true;
    }


    setPassword(password.trim());
    setErrMsg({ ...errMsg, passwordError });
    return isValid;
  }


  // VALIDATE NAME

  const validateName = (name) => {

    let nameError = errMsg.nameError;
    let pattern = /^[a-zA-Z\s]+$/;
    let isValid = formValid;

    if (name.trim().length < 3) {
      nameError = "Please enter atleast three words";
      isValid = false;
    } else if (!pattern.test(name.trim())) {
      nameError = "enter only letters and spaces ";
      isValid = false;
    } else {
      nameError = " ",
        isValid = true;
    }

    setName(name);
    setErrMsg({ ...errMsg, nameError })
    return isValid;
  }





  const handleChange = (e) => {

    if (e.target.id === "email") {
      validateEmail(e.target.value);
    }

    else if (e.target.id === "name") {
      validateName(e.target.value);
    }

    else if (e.target.id === "password") {
      validatePassword(e.target.value);
    }
  }


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (validateName(name) && validateEmail(email) && validatePassword(password))


      try {
        const response = await loginUser({

          email,

          password

        });

        setLocalStorage(
          "token",
          response.data.token
        );

        dispatch(login({

          user: response.data.user,

          token: response.data.token

        }));

        toast.success('Login Successfuly')
        navigate('/');


      } catch (error) {
        toast.error(error.response.data.message);

      }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">

      <div className="w-full max-w-md  md:min-w-lg bg-white rounded-lg shadow-md p-6  sm:p-8 ">

        <div className='flex justify-center mb-2 sm:mb-5'>
          <img src={logo} alt="store front" className='h-18 object-cover' />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>

        <p className="text-sm sm:text-md lg:text-lg text-center text-gray-600 mb-10">
          Sign in to continue to your account.
        </p>

        <form className='w-full rounded-xl p-2 lg:p-4 space-y-6'
          onSubmit={handleSubmit}
        >
          {/* Name */}
          <div className="mb-4">
            <label htmlFor='name' className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              id='name'
              name='name'
              value={name}
              required
              autoFocus
              onChange={handleChange}
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
            />
            <p className='text-sm font-normal text-red-500'>{errMsg.nameError}</p>
          </div>



          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              id='email'
              name='email'
              value={email}
              required
              onChange={handleChange}
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
            />
            <p className='text-sm font-normal text-red-500'>{errMsg.emailError}</p>

          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              name='password'
              id='password'
              value={password}
              required
              onChange={handleChange}
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
            />
            <p className='text-sm font-normal text-red-500'>{errMsg.passwordError}</p>

          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="mr-2" />
              Remember Me
            </label>
            <a className="text-sm text-purple-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            ata-testid="formSubmit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition text-sm sm:text-base"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-xs sm:text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>


        {/* Register Link */}
        <p className="text-sm sm:text-md text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <span
            className='text-purple-600 hover:underline cursor-pointer'
            onClick={() => navigate('/register')}
          >
            Register
          </span>


        </p>
      </div>
    </div>
  );
};



export default SigninForm
