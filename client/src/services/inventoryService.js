import axios from "axios";

const API = "http://localhost:5000/api/inventory";

// ==============================
// Common Headers
// ==============================
const getConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ==============================
// Get All Inventory
// ==============================
export const getInventory = async () => {
  const { data } = await axios.get(API, getConfig());
  return data;
};

// ==============================
// Get Inventory By Type
// Base / Sauce / Cheese / Vegetable
// ==============================
export const getInventoryByType = async (type) => {
  const { data } = await axios.get(
    `${API}/type/${type}`,
    getConfig()
  );

  return data.inventory;
};

// ==============================
// Pizza Builder Helpers
// ==============================
export const getBases = () => getInventoryByType("Base");

export const getSauces = () => getInventoryByType("Sauce");

export const getCheeses = () => getInventoryByType("Cheese");

export const getVegetables = () => getInventoryByType("Vegetable");

// ==============================
// Get Single Inventory Item
// ==============================
export const getInventoryById = async (id) => {
  const { data } = await axios.get(
    `${API}/${id}`,
    getConfig()
  );

  return data;
};

// ==============================
// Add Inventory
// ==============================
export const addInventory = async (item) => {
  const { data } = await axios.post(
    API,
    item,
    getConfig()
  );

  return data;
};

// ==============================
// Bulk Add Inventory
// ==============================
export const bulkAddInventory = async (items) => {
  const { data } = await axios.post(
    `${API}/bulk`,
    items,
    getConfig()
  );

  return data;
};

// ==============================
// Update Inventory
// ==============================
export const updateInventory = async (id, item) => {
  const { data } = await axios.put(
    `${API}/${id}`,
    item,
    getConfig()
  );

  return data;
};

// ==============================
// Delete Inventory
// ==============================
export const deleteInventory = async (id) => {
  const { data } = await axios.delete(
    `${API}/${id}`,
    getConfig()
  );

  return data;
};

export default {
  getInventory,
  getInventoryByType,
  getBases,
  getSauces,
  getCheeses,
  getVegetables,
  getInventoryById,
  addInventory,
  bulkAddInventory,
  updateInventory,
  deleteInventory,
};