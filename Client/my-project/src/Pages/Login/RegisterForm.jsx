import React from 'react'


// Hooks
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


import { registerUser } from "./authService";


// Toast Message
import toast from "react-hot-toast";



const registerForm = () => {

  const navigate = useNavigate();


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errMsg, setErrMsg] = useState({
    nameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  });



  // NAME VALIDATION

  const validateName = (value) => {

    let nameError = "";

    const pattern = /^[A-Za-z\s]+$/;

    if (value.trim().length < 3) {
      nameError = "Name must contain at least 3 characters.";
    }

    else if (!pattern.test(value.trim())) {
      nameError = "Only letters and spaces are allowed.";
    }

    setName(value);

    setErrMsg(prev => ({
      ...prev,
      nameError
    }));

    return nameError === "";
  };


  // E-MAIL VALIDATION

  const validateEmail = (value) => {

    let emailError = "";

    const pattern =
      /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

    if (!pattern.test(value.trim())) {
      emailError = "Enter a valid email.";
    }

    setEmail(value);

    setErrMsg(prev => ({
      ...prev,
      emailError
    }));

    return emailError === "";
  };



  // PASSWORD VALIDATION

  const validatePassword = (value) => {

    let passwordError = "";

    const pattern =
      /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    if (!pattern.test(value.trim())) {

      passwordError =
        "Password must contain at least 8 characters, one uppercase letter, one digit and one special character.";

    }

    setPassword(value);

    setErrMsg(prev => ({
      ...prev,
      passwordError
    }));

    return passwordError === "";
  };




  // CONFIRM PASWORD VALIDATION

  const validateConfirmPassword = (value) => {

    let confirmPasswordError = "";

    if (value !== password) {
      confirmPasswordError = "Passwords do not match.";
    }

    setConfirmPassword(value);

    setErrMsg(prev => ({
      ...prev,
      confirmPasswordError
    }));

    return confirmPasswordError === "";
  };





  // HANDLING CHANGE

  const handleChange = (e) => {

    const { id, value } = e.target;

    switch (id) {

      case "name":
        validateName(value);
        break;

      case "email":
        validateEmail(value);
        break;

      case "password":
        validatePassword(value);
        break;

      case "confirmPassword":
        validateConfirmPassword(value);
        break;

      default:
        break;
    }
  };



  // HANDLING SUBMIT

  const handleSubmit = async (e) => {

    e.preventDefault();

    const isValid =
      validateName(name) &&
      validateEmail(email) &&
      validatePassword(password) &&
      validateConfirmPassword(confirmPassword);

    if (!isValid) return;

    try {

      // API Call

      const data = {
        name,
        email,
        password,
      };

      const response = await registerUser({

        name,
        email,
        password,

      });

      toast.success("Registration Successful");

      // console.log(response.data);

      navigate("/signin");

    } catch (error) {
      console.log(error);
    }

  };



  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl bg-white rounded-[35px] shadow-xl overflow-hidden">

        <div className="grid lg:grid-cols-2">

          {/* Left Section */}

          <div className="bg-[#8B8CF7] relative flex flex-col justify-between p-8 lg:p-14 text-white">

            <div>
              <h2 className="text-2xl font-serif mb-14">
                Norothy
              </h2>

              <h1 className="text-5xl font-serif mb-6 leading-tight">
                Design Academy
              </h1>

              <p className="text-white/80 max-w-md">
                Excepteur est Lorem laborum irure labore sunt ex in
                consectetur eu labore dolor exercitation. Sit pariatur
                reprehenderit irure qui ut.
              </p>
            </div>

          </div>

          {/* Right Section */}

          <div className="bg-white rounded-l-[80px] px-6 py-10 lg:px-16 lg:py-14">

            <h1 className="text-4xl font-serif">
              Welcome to StoreFront.
            </h1>

            <p className="text-gray-500 mt-2">
              Let's help you get started.
            </p>

            <p className="mt-10 text-gray-600">
              Already have an account?
              <span
                onClick={() => navigate('/signin')}
                className="text-[#8B8CF7] ml-2 hover:underline cursor-pointer"
              >
                sign in
              </span>
            </p>



            {/* Form */}

            <form
              className="mt-8 space-y-5"
              onSubmit={handleSubmit}
            >

              <div className="grid sm:grid-cols-2 gap-5">


                {/* NAME */}
                <div>
                  <input
                    id="name"
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={handleChange}
                    className="border rounded-lg p-3 outline-none focus:border-[#8B8CF7]"
                  />

                  <p className="text-red-500 text-sm">
                    {errMsg.nameError}
                  </p>
                </div>



                {/* E-MAIL */}
                <div>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleChange}
                    className="border rounded-lg p-3 outline-none focus:border-[#8B8CF7]"
                  />

                  <p className="text-red-500 text-sm">
                    {errMsg.emailError}
                  </p>
                </div>



                {/* PASSWORD */}
                <div>
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChange}
                    className="border rounded-lg p-3 outline-none focus:border-[#8B8CF7]"
                  />

                  <p className="text-red-500 text-sm">
                    {errMsg.passwordError}
                  </p>
                </div>




                {/* CONFIRM PASSWORD */}
                <div>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={handleChange}
                    className="border rounded-lg p-3 outline-none focus:border-[#8B8CF7]"
                  />

                  <p className="text-red-500 text-sm">
                    {errMsg.confirmPasswordError}
                  </p>
                </div>



              </div>



              <button
                type="submit"
                className="w-full sm:w-72 h-14 bg-[#8B8CF7] text-white rounded-lg text-xl hover:bg-[#7778ef] transition"
              >
                Sign Up
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  )
}

export default registerForm
