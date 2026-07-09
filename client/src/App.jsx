
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

// ================= USER PAGES =================

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import PizzaBuilder from "./pages/PizzaBuilder";

import Login from "./pages/Login";
import Register from "./pages/Register";

import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

import About from "./pages/About";
import Contact from "./pages/Contact";

import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import UserOrders from "./pages/my-orders";

import NotFound from "./pages/NotFound";


// ================= COMPONENTS =================

import ProtectedRoute from "./components/ProtectedRoute";


// ================= ADMIN =================

import AdminLayout from "./admin/AdminLayout";

import Dashboard from "./admin/Dashboard";
import AddPizza from "./admin/AddPizza";
import ManagePizzas from "./admin/ManagePizzas";
import EditPizza from "./admin/EditPizza";
import AdminOrders from "./admin/Orders";
import Inventory from "./admin/Inventory";



function App() {


return (

<Routes>


{/* ================= USER ROUTES ================= */}


<Route element={<MainLayout />}>


<Route 
path="/" 
element={<Home />} 
/>


<Route 
path="/menu" 
element={<Menu />} 
/>



<Route
path="/build-pizza"
element={
<ProtectedRoute>
<PizzaBuilder />
</ProtectedRoute>
}
/>



<Route
path="/about"
element={<About />}
/>



<Route
path="/contact"
element={<Contact />}
/>



<Route
path="/login"
element={<Login />}
/>



<Route
path="/register"
element={<Register />}
/>



<Route
path="/verify-email/:token"
element={<VerifyEmail />}
/>



<Route
path="/forgot-password"
element={<ForgotPassword />}
/>



<Route
path="/reset-password/:token"
element={<ResetPassword />}
/>




<Route
path="/profile"
element={
<ProtectedRoute>
<Profile />
</ProtectedRoute>
}
/>



<Route
path="/edit-profile"
element={
<ProtectedRoute>
<EditProfile />
</ProtectedRoute>
}
/>




<Route
path="/cart"
element={
<ProtectedRoute>
<Cart />
</ProtectedRoute>
}
/>





<Route
path="/checkout"
element={
<ProtectedRoute>
<Checkout />
</ProtectedRoute>
}
/>




<Route
 path="/my-orders"
 element={
   <ProtectedRoute>
     <UserOrders />
   </ProtectedRoute>
 }
/>



</Route>







{/* ================= ADMIN ROUTES ================= */}



<Route
path="/admin"
element={
<ProtectedRoute>
<AdminLayout />
</ProtectedRoute>
}
>



<Route
index
element={<Dashboard />}
/>



<Route
path="inventory"
element={<Inventory />}
/>



<Route
path="add-pizza"
element={<AddPizza />}
/>



<Route
path="manage-pizzas"
element={<ManagePizzas />}
/>



<Route
path="edit-pizza/:id"
element={<EditPizza />}
/>



<Route
path="orders"
element={<AdminOrders />}
/>



</Route>







{/* ================= 404 ================= */}


<Route
path="*"
element={<NotFound />}
/>



</Routes>

);


}


export default App;
