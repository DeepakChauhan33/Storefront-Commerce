import axios from "axios";
import { getLocalStorage } from "../../Utils/localStorage";

const API_URL = import.meta.env.VITE_API_URL;

export const getOrders = async () => {
  const token = getLocalStorage("token");

  return axios.get(
    `${API_URL}/order/orders`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};

export const createOrder = async (orderData) => {
  const token = getLocalStorage("token");

  return await axios.post(
    `${API_URL}/order/createOrder`,
    orderData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};