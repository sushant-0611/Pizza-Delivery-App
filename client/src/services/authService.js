import api from "./api";


// =======================
// Register User
// =======================

export const registerUser = async (userData) => {

  const { data } = await api.post(
    "/auth/register",
    userData
  );

  return data;

};




// =======================
// Login User
// =======================

export const loginUser = async (userData) => {

  const { data } = await api.post(
    "/auth/login",
    userData
  );

  return data;

};




// =======================
// Verify Email
// =======================

export const verifyEmail = async (token) => {

  const { data } = await api.get(
    `/auth/verify-email/${token}`
  );

  return data;

};




// =======================
// Forgot Password
// =======================

export const forgotPassword = async (email) => {

  const { data } = await api.post(
    "/auth/forgot-password",
    {
      email,
    }
  );

  return data;

};




// =======================
// Reset Password
// =======================

export const resetPassword = async (
  token,
  password
) => {


  const { data } = await api.post(

    `/auth/reset-password/${token}`,

    {
      password,
    }

  );


  return data;

};




// =======================
// Get Logged-in User Profile
// =======================

export const getProfile = async () => {


  const { data } = await api.get(
    "/auth/profile"
  );


  return data;

};




// =======================
// Update Profile
// =======================

export const updateProfile = async (
  userData
) => {


  const { data } = await api.put(

    "/auth/profile",

    userData

  );


  return data;

};




// =======================
// Change Password
// =======================

export const changePassword = async (
  passwordData
)=>{


const {data}=await api.put(

"/auth/change-password",

passwordData

);


return data;


};




// =======================
// Logout User
// =======================

export const logoutUser = () => {


  localStorage.removeItem("token");

  localStorage.removeItem("user");


};