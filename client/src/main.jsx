import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import "react-toastify/dist/ReactToastify.css";

import "./index.css";


import App from "./App";


import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";


import { ToastContainer } from "react-toastify";



ReactDOM.createRoot(
  document.getElementById("root")
)
.render(


<React.StrictMode>


<BrowserRouter>


<AuthProvider>


<CartProvider>


<App />



<ToastContainer

position="top-right"

autoClose={3000}

hideProgressBar={false}

newestOnTop={true}

closeOnClick

pauseOnHover

draggable

theme="colored"

/>



</CartProvider>


</AuthProvider>


</BrowserRouter>


</React.StrictMode>


);