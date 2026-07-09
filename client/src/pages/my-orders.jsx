import { useEffect, useState } from "react";
import { getMyOrders } from "../services/orderService";
import { toast } from "react-toastify";


function Orders(){


const [orders,setOrders] = useState([]);



useEffect(()=>{

loadOrders();

},[]);





const loadOrders = async()=>{

try{


const data = await getMyOrders();



if(data.success){

setOrders(data.orders);

}



}
catch(error){

console.log(
"Orders Error:",
error
);


toast.error(
"Failed to load orders"
);


}


};





return (

<div className="container py-5">


<h2 className="fw-bold mb-4">
My Orders
</h2>




{
orders.length === 0 ?


<h5>
No Orders Found
</h5>


:


orders.map(order=>(


<div
className="card shadow mb-3"
key={order._id}
>


<div className="card-body">



<h5>
Order ID :
{order._id}
</h5>




<p>
Status :

<span className="badge bg-warning ms-2">

{order.orderStatus}

</span>

</p>





<p>
Payment Method :
<b>
{" "}
{order.payment?.method}
</b>

</p>





<p>
Payment Status :
<b>
{" "}
{order.payment?.status}
</b>

</p>





<h5 className="text-danger">

Total ₹{order.totalPrice}

</h5>




<hr/>


<h6>
Items
</h6>



{
order.items.map(item=>(


<div 
key={item._id}
className="d-flex align-items-center mb-2"
>


<img

src={
item.image ||
"https://via.placeholder.com/70"
}

width="70"

height="70"

className="rounded me-3"

alt={item.name}

/>



<div>

<b>
{item.name}
</b>


<p className="mb-0">

Size: {item.size}

</p>


<p className="mb-0">

Qty: {item.quantity}

</p>


</div>



</div>


))

}




</div>


</div>


))

}



</div>

);


}


export default Orders;