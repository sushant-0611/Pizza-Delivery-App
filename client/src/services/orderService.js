import api from "./api";



// =============================
// CREATE RAZORPAY PAYMENT ORDER
// =============================

export const createPaymentOrder = async (data) => {

  const response = await api.post(
    "/orders/create-payment",
    data
  );

  return response.data;

};





// =============================
// VERIFY RAZORPAY PAYMENT
// =============================

export const verifyPayment = async (data) => {

  const response = await api.post(
    "/orders/verify-payment",
    data
  );

  return response.data;

};






// =============================
// PLACE COD ORDER
// =============================

export const placeOrder = async (data) => {

  const response = await api.post(
    "/orders/place",
    data
  );

  return response.data;

};







// =============================
// USER - GET MY ORDERS
// =============================

export const getMyOrders = async () => {

  const response = await api.get(
    "/orders/my-orders"
  );

  return response.data;

};








// =============================
// USER - GET SINGLE ORDER
// =============================

export const getOrderById = async (id) => {

  const response = await api.get(
    `/orders/${id}`
  );

  return response.data;

};








// =============================
// ADMIN - GET ALL ORDERS
// =============================

export const getAllOrders = async () => {

  const response = await api.get(
    "/orders"
  );

  return response.data;

};








// =============================
// ADMIN - UPDATE ORDER STATUS
// =============================

export const updateOrderStatus = async (
  id,
  status
) => {

  const response = await api.put(
    `/orders/${id}`,
    {
      orderStatus: status,
    }
  );

  return response.data;

};








// =============================
// ADMIN - DELETE ORDER
// =============================

export const deleteOrder = async (id) => {

  const response = await api.delete(
    `/orders/${id}`
  );

  return response.data;

};