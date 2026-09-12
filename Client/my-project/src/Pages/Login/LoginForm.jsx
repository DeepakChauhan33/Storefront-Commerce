// // HOOKS
// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';



// // ACTIONS
// import { login, logout, userDetails } from './authSlice';

// // AUTH SERVICE
// import { loginUser } from './authService';

// // Functions
// import { setLocalStorage, getLocalStorage } from '../../Utils/localStorage';



// // TOAST MESSAGE LIBRARY
// import toast from 'react-hot-toast';
// import { pattern } from 'framer-motion/client';

// const LoginForm = () => {


//     const isLogin = useSelector((state) => state.auth.isLogin);

//     const navigate = useNavigate();

//     const dispatch = useDispatch();




//     // NAME
//     const [name, setName] = useState("");

//     // EMAIL
//     const [email, setEmail] = useState("");

//     // PASSWORD
//     const [password, setPassword] = useState("");

//     // ERROR MESSAGE
//     const [errMsg, setErrMsg] = useState({
//         emailError: " ",
//         passwordError: " ",
//         nameError: " "
//     })

//     //
//     const [formValid, setFormValid] = useState(false);


//     // CHECK EMAIL VALIDATION USING REGEX
//     const validateEmail = (email) => {

//         let emailError = errMsg.emailError;
//         let isValid = formValid;
//         let pattern = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

//         if (!pattern.test(email.trim())) {
//             emailError = "Enter a valid email"
//             isValid = false;
//         } else {
//             emailError = " ";
//             isValid = true;
//         }

//         setEmail(email.trim());
//         setErrMsg({ ...errMsg, emailError });
//         return isValid;
//     }



//     // CHECK PASSWORD VALIDATION USING REGEX

//     const validatePassword = (password) => {

//         let passwordError = errMsg.passwordError;
//         let isValid = formValid;
//         let pattern = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;


//         if (!pattern.test(password.trim())) {
//             passwordError = "Password have minimum 8 characters, uppercase letter, digit(0-1) and special character";
//             isValid = false;
//         } else {
//             passwordError = " ",
//                 isValid = true;
//         }


//         setPassword(password.trim());
//         setErrMsg({ ...errMsg, passwordError });
//         return isValid;
//     }


//     // VALIDATE NAME

//     const validateName = (name) => {

//         let nameError = errMsg.nameError;
//         let pattern = /^[a-zA-Z\s]+$/;
//         let isValid = formValid;

//         if (name.trim().length < 3) {
//             nameError = "Please enter atleast three words";
//             isValid = false;
//         } else if (!pattern.test(name.trim())) {
//             nameError = "enter only letters and spaces ";
//             isValid = false;
//         } else {
//             nameError = " ",
//                 isValid = true;
//         }

//         setName(name);
//         setErrMsg({ ...errMsg, nameError })
//         return isValid;
//     }





//     const handleChange = (e) => {

//         if (e.target.id === "email") {
//             validateEmail(e.target.value);
//         }

//         else if (e.target.id === "name") {
//             validateName(e.target.value);
//         }

//         else if (e.target.id === "password") {
//             validatePassword(e.target.value);
//         }
//     }


//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         if (validateName(name) && validateEmail(email) && validatePassword(password))


//             try {
//                 const response = await loginUser({

//                     email,

//                     password

//                 });

//                 setLocalStorage(
//                     "token",
//                     response.data.token
//                 );

//                 dispatch(login({

//                     user: response.data.user,

//                     token: response.data.token

//                 }));

//                 toast.success('Login Successfuly')
//                 navigate('/');


//             } catch (error) {
//                 toast.error(error.response.data.message);

//             }
//     }

//     return (
//         <div className='w-full lg:w-[50%] p-4 bg-white rounded-xl shadow-xl  '>

//             <div className='space-y-2 md:space-y-4 mb-4 md:mb-6 lg:mb-7 px-2'>
//                 <h2 className='text-xl md:text-2xl lg:text-4xl font-bold'>Welcome back</h2>
//                 <p className='text-sm md:text-lg lg:text-xl '>Welcome back! Please enter your details</p>
//             </div>


//             <form className='w-full rounded-xl p-2 lg:p-4 space-y-6'
//                 onSubmit={handleSubmit}
//             >

//                 <div className='flex flex-col space-y-2'>
//                     <label htmlFor="name" className='font-bold'>Name</label>
//                     <input
//                         type="text"
//                         id='name'
//                         name='name'
//                         value={name}
//                         required
//                         autoFocus
//                         onChange={handleChange}
//                         className='px-2 py-3 border border-gray-500 rounded-md' />
//                     <p className='text-sm font-normal text-red-500'>{errMsg.nameError}</p>
//                 </div>


//                 <div className='flex flex-col space-y-2'>
//                     <label htmlFor="email" className='font-bold'>Email</label>
//                     <input
//                         type="email"
//                         id='email'
//                         name='email'
//                         value={email}
//                         required 
//                         onChange={handleChange}
//                         className='px-2 py-3 border border-gray-500 rounded-md' />
//                     <p className='text-sm font-normal text-red-500'>{errMsg.emailError}</p>
//                 </div>

//                 <div className='flex flex-col space-y-2'>

//                     <label htmlFor="password" className='font-bold'>Password</label>
//                     <input
//                         type="password"
//                         id='password'
//                         name='password'
//                         value={password}
//                         required
//                         onChange={handleChange}
//                         className='px-2 py-3 border border-gray-500 rounded-md' />

//                     <p className='text-sm font-normal text-red-500'>{errMsg.passwordError}</p>
//                 </div>



//                 <button
//                     className=' w-full py-2.5 rounded-md mt-5 transition-colors bg-linear-to-r from-violet-600/60 to-purple-600/60 hover:bg-purple-700 hover:text-white  duration-400 ease-in-out cursor-pointer'

//                     data-testid="formSubmit"
//                 >
//                     Submit
//                 </button>
//             </form>


//         </div>
//     )
// }

// export default LoginForm
