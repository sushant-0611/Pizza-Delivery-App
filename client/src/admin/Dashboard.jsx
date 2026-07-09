import { useEffect, useState } from "react";

import api from "../services/api";

import { getInventory } from "../services/inventoryService";

import { toast } from "react-toastify";

import Loader from "../components/Loader";



function Dashboard() {


  const [loading,setLoading]=useState(true);


  const [inventory,setInventory]=useState([]);



  const [data,setData]=useState({

    totalPizzas:0,

    totalUsers:0,

    totalOrders:0,

    totalRevenue:0,

    latestPizzas:[],

    recentOrders:[],


  });





useEffect(()=>{


 fetchDashboard();

 fetchInventory();


},[]);







// =========================
// Dashboard API
// =========================


const fetchDashboard=async()=>{


try{


setLoading(true);



const res=await api.get("/dashboard");



setData(res.data);



}

catch(error){


console.log(error);


toast.error(

error.response?.data?.message ||

"Failed to load dashboard"

);


}

finally{


setLoading(false);


}


};







// =========================
// Inventory API
// =========================


const fetchInventory=async()=>{


try{


const res=await getInventory();


setInventory(res.inventory);



}

catch(error){


console.log(error);


toast.error(
"Failed to load inventory"
);


}


};








// =========================
// Inventory Stats
// =========================


const totalInventory = inventory.length;



const lowStock = inventory.filter(

(item)=>

item.stock <= item.threshold

).length;




const outOfStock = inventory.filter(

(item)=>

item.stock === 0

).length;





if(loading){


return (

<Loader text="Loading Dashboard..." />

);


}





return (

<div className="container-fluid">



<h2 className="mb-4">

📊 Admin Dashboard

</h2>





<div className="row g-4">



{/* Total Pizzas */}


<div className="col-md-3">

<div className="card shadow border-0 bg-warning text-dark">


<div className="card-body text-center">


<h1>
{data.totalPizzas}
</h1>


<h5>
Total Pizzas
</h5>


</div>


</div>


</div>






{/* Users */}


<div className="col-md-3">


<div className="card shadow border-0 bg-primary text-white">


<div className="card-body text-center">


<h1>
{data.totalUsers}
</h1>


<h5>
Total Users
</h5>


</div>


</div>


</div>







{/* Orders */}


<div className="col-md-3">


<div className="card shadow border-0 bg-success text-white">


<div className="card-body text-center">


<h1>
{data.totalOrders}
</h1>


<h5>
Total Orders
</h5>


</div>


</div>


</div>







{/* Revenue */}


<div className="col-md-3">


<div className="card shadow border-0 bg-danger text-white">


<div className="card-body text-center">


<h1>
₹ {data.totalRevenue}
</h1>


<h5>
Total Revenue
</h5>


</div>


</div>


</div>



</div>






{/* =========================
 Inventory Cards
========================= */}



<div className="row g-4 mt-3">





<div className="col-md-4">


<div className="card shadow border-info">


<div className="card-body text-center">


<h1 className="text-info">

{totalInventory}

</h1>


<h5>

Total Inventory Items

</h5>


</div>


</div>


</div>







<div className="col-md-4">


<div className="card shadow border-danger">


<div className="card-body text-center">


<h1 className="text-danger">

{lowStock}

</h1>


<h5>

Low Stock Items 🔴

</h5>


</div>


</div>


</div>







<div className="col-md-4">


<div className="card shadow border-dark">


<div className="card-body text-center">


<h1>

{outOfStock}

</h1>


<h5>

Out Of Stock

</h5>


</div>


</div>


</div>






</div>





{/* =========================
 Latest Pizzas + Recent Orders
========================= */}



<div className="row mt-5">



{/* Latest Pizzas */}


<div className="col-lg-6 mb-4">


<div className="card shadow h-100">



<div className="card-header bg-dark text-white">

🍕 Latest Pizzas

</div>




<div className="card-body">



{

data.latestPizzas.length === 0 ?


(


<div className="text-center text-muted py-5">


No Pizzas Found


</div>


)


:


(


<table className="table table-hover align-middle">


<thead>


<tr>

<th>
Image
</th>


<th>
Name
</th>


<th>
Category
</th>


</tr>


</thead>





<tbody>


{

data.latestPizzas.map((pizza)=>(



<tr key={pizza._id}>


<td>


<img

src={
pizza.image?.url ||
"https://via.placeholder.com/60"
}

alt={pizza.name}

width="60"

height="60"

style={{

objectFit:"cover",

borderRadius:"10px"

}}


/>


</td>




<td>

{pizza.name}

</td>




<td>

{pizza.category}

</td>



</tr>


))


}



</tbody>



</table>


)


}



</div>


</div>



</div>







{/* Recent Orders */}



<div className="col-lg-6 mb-4">



<div className="card shadow h-100">



<div className="card-header bg-dark text-white">

📦 Recent Orders

</div>




<div className="card-body">



{


data.recentOrders.length === 0 ?


(


<div className="text-center text-muted py-5">


No Orders Yet 🍕


</div>


)



:


(


<table className="table table-hover align-middle">



<thead>


<tr>

<th>
Customer
</th>


<th>
Total
</th>


<th>
Status
</th>


</tr>



</thead>




<tbody>



{


data.recentOrders.map((order)=>(



<tr key={order._id}>


<td>


{
order.user?.name ||
"Guest"
}


</td>




<td>

₹ {order.totalPrice}


</td>




<td>


<span className="badge bg-primary">


{
order.orderStatus
}


</span>


</td>



</tr>


))



}



</tbody>



</table>


)


}



</div>



</div>



</div>




</div>




</div>


);


}



export default Dashboard;