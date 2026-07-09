import axios from "axios";

const API = "http://localhost:5000/api/cart";

const getToken = () => localStorage.getItem("token");

const config = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// =============================
// GET CART
// =============================
export const getCart = async () => {
  const { data } = await axios.get(API, config());
  return data;
};

// =============================
// ADD NORMAL PIZZA
// =============================
export const addToCart = async (cartData) => {
  const { data } = await axios.post(
    `${API}/add`,
    cartData,
    config()
  );
  return data;
};

// =============================
// ADD CUSTOM PIZZA
// =============================
export const addCustomPizza = async (pizzaData) => {
  const { data } = await axios.post(
    `${API}/add-custom`,
    pizzaData,
    config()
  );
  return data;
};

// =============================
// UPDATE QUANTITY
// =============================
export const updateCart = async (itemId, quantity) => {
  const { data } = await axios.put(
    `${API}/update`,
    {
      itemId,
      quantity,
    },
    config()
  );
  return data;
};

// =============================
// UPDATE SIZE
// =============================
export const updateCartSize = async (cartData) => {
  const { data } = await axios.put(
    `${API}/update-size`,
    cartData,
    config()
  );
  return data;
};

// =============================
// REMOVE ITEM
// =============================
export const removeItem = async (id) => {
  const { data } = await axios.delete(
    `${API}/remove/${id}`,
    config()
  );
  return data;
};

// =============================
// CLEAR CART
// =============================
export const clearCart = async () => {
  const { data } = await axios.delete(
    `${API}/clear`,
    config()
  );
  return data;
};