import axios from "axios";

import { getLocalStorage } from "../../Utils/localStorage";


export const getOrders = async () => {

  const token = getLocalStorage("token");

  return axios.get(
    "http://localhost:8000/order/orders",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}




export const createOrder = async (orderData) => {

  const token = getLocalStorage("token");

  console.log("Token:", token);

  return await axios.post(
    "http://localhost:8000/order/createOrder",
    orderData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};