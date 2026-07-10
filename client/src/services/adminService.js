import api from "./api";


// ==========================
// ADMIN LOGIN
// ==========================

export const adminLogin = async (data) => {

  const response = await api.post(
    "/admin/login",
    data
  );

  return response.data;

};