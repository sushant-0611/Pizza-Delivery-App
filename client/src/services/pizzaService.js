import api from "./api";

// Get All Pizzas
export const getAllPizzas = async () => {
  const response = await api.get("/pizzas");
  return response.data;
};

// Get Single Pizza
export const getPizzaById = async (id) => {
  const response = await api.get(`/pizzas/${id}`);
  return response.data;
};

// Add Pizza
export const addPizza = async (formData) => {
  const response = await api.post("/pizzas", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Update Pizza
export const updatePizza = async (id, formData) => {
  const response = await api.put(`/pizzas/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Delete Pizza
export const deletePizza = async (id) => {
  const response = await api.delete(`/pizzas/${id}`);
  return response.data;
};