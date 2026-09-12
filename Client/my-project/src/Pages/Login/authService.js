import axios from "axios";

export const loginUser = async (userData) => {

  return await axios.post(
    "http://localhost:8000/user/login", userData
  );
}


export const getCurrentUser = async (token) => {

  return await axios.get(

    "http://localhost:8000/user/me",

    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

}




export const registerUser = async (userData) => {

  const response = await axios.post(
    "http://localhost:8000/user/register",
    userData
  );

  return response;
};



