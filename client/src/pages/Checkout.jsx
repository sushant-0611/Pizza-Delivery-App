import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";

import { getProfile } from "../services/authService";

import {
  createPaymentOrder,
  verifyPayment,
  placeOrder,
} from "../services/orderService";

import { toast } from "react-toastify";



function Checkout(){


const navigate = useNavigate();



const {
  cart,
  totalPrice
}=useCart();




const deliveryCharge = 50;

const codCharge = 30;



const [paymentMethod,setPaymentMethod]=useState("COD");

const [loading,setLoading]=useState(false);




const [address,setAddress]=useState({

fullName:"",
phone:"",
address:"",
city:"",
pincode:""

});





const finalTotal =
paymentMethod==="COD"
?
totalPrice + deliveryCharge + codCharge
:
totalPrice + deliveryCharge;







// ===============================
// LOAD USER PROFILE
// ===============================


useEffect(()=>{


const loadProfile=async()=>{


try{


const data = await getProfile();



if(data.success){


const user=data.user;



setAddress({

fullName:user.name || "",

phone:user.phone || "",

address:user.address || "",

city:user.city || "",

pincode:user.pincode || ""

});


}


}
catch(error){

console.log(error);

}


};



loadProfile();



},[]);








// ===============================
// INPUT CHANGE
// ===============================


const handleChange=(e)=>{


setAddress({

...address,

[e.target.name]:e.target.value

});


};









// ===============================
// VALIDATION
// ===============================


const validateAddress=()=>{


if(
!address.fullName ||
!address.phone ||
!address.address ||
!address.city ||
!address.pincode
){


toast.error(
"Please fill delivery address"
);


return false;

}


return true;


};









// ===============================
// ORDER ITEMS
// ===============================


const getOrderItems=()=>{


return cart.map(item=>({


pizza:item.pizza?._id || null,


name:item.custom
?
item.name
:
item.pizza.name,



image:item.custom
?
item.image
:
item.pizza.image.url,



size:item.size,


quantity:item.quantity,


price:item.price,



custom:item.custom || false,



builder:item.custom
?
{

base:item.base?.name || "",

sauce:item.sauce?.name || "",

cheese:item.cheese
?.map(c=>c.name)
.join(", "),

vegetables:item.vegetables
?.map(v=>v.name)

}
:
null


}));


};










// ===============================
// COD ORDER
// ===============================


const codOrder=async()=>{


if(!validateAddress())
return;



try{


setLoading(true);



const orderData={


items:getOrderItems(),


shippingAddress:address,



payment:{


method:"COD",

status:"Pending"


},



totalPrice:finalTotal



};




const data =
await placeOrder(orderData);




if(data.success){


toast.success(
"Order Placed Successfully"
);


navigate("/my-orders");


}



}
catch(error){


console.log(error);


toast.error(
"Order Failed"
);


}
finally{

setLoading(false);

}


};









// ===============================
// RAZORPAY PAYMENT
// ===============================


const payNow=async()=>{
console.log(
  import.meta.env.VITE_RAZORPAY_KEY_ID
);

if(!validateAddress())
return;



try{


setLoading(true);



const orderData={


items:getOrderItems(),


shippingAddress:address,


totalPrice:
totalPrice + deliveryCharge


};






const data =
await createPaymentOrder({

totalPrice:
orderData.totalPrice

});






const options={



key:
import.meta.env.VITE_RAZORPAY_KEY_ID,



amount:
data.razorpayOrder.amount,



currency:"INR",



name:
"Pizza Delivery App",



description:
"Pizza Order",



order_id:
data.razorpayOrder.id,





handler:async(response)=>{


const verifyData =
await verifyPayment({

...response,


...orderData


});




if(verifyData.success){


toast.success(
"Payment Successful"
);


navigate("/my-orders");


}


},




prefill:{


name:address.fullName,


contact:address.phone


},




theme:{


color:"#ffc107"


}


};






const razor =
new window.Razorpay(options);



razor.open();



}
catch(error){


console.log(error);


toast.error(
"Payment Failed"
);


}
finally{

setLoading(false);

}


};









return (

<div className="container py-5">


<h2 className="fw-bold mb-4">
Checkout
</h2>



<div className="row g-4">



<div className="col-md-7">


<div className="card shadow p-4">


<h4>
Delivery Address
</h4>



<input
className="form-control mb-3"
name="fullName"
placeholder="Full Name"
value={address.fullName}
onChange={handleChange}
/>




<input
className="form-control mb-3"
name="phone"
placeholder="Phone"
value={address.phone}
onChange={handleChange}
/>





<textarea

className="form-control mb-3"

name="address"

placeholder="Address"

value={address.address}

onChange={handleChange}

/>




<input
className="form-control mb-3"
name="city"
placeholder="City"
value={address.city}
onChange={handleChange}
/>





<input
className="form-control mb-3"
name="pincode"
placeholder="Pincode"
value={address.pincode}
onChange={handleChange}
/>



</div>


</div>









<div className="col-md-5">


<div className="card shadow p-4">



<h3>
Order Summary
</h3>



<hr/>



<p>
Subtotal : ₹{totalPrice}
</p>



<p>
Delivery : ₹{deliveryCharge}
</p>



{
paymentMethod==="COD" &&

<p className="text-danger">
COD Charge : ₹{codCharge}
</p>

}



<hr/>



<h3>
Total : ₹{finalTotal}
</h3>





<h5 className="mt-4">
Choose Payment
</h5>




<div>

<input

type="radio"

checked={paymentMethod==="COD"}

onChange={()=>
setPaymentMethod("COD")
}

/>

{" "}Cash On Delivery

</div>





<div className="mt-2">


<input

type="radio"

checked={paymentMethod==="Razorpay"}

onChange={()=>
setPaymentMethod("Razorpay")
}

/>


{" "}Razorpay

</div>






{

paymentMethod==="COD"

?

<button

className="btn btn-warning w-100 mt-4 fw-bold"

onClick={codOrder}

disabled={loading}

>


{
loading
?
"Placing Order..."
:
"Place Order"
}


</button>


:


<button

className="btn btn-success w-100 mt-4 fw-bold"

onClick={payNow}

disabled={loading}

>


{
loading
?
"Processing..."
:
"Pay Now"
}



</button>


}




</div>


</div>



</div>


</div>

);


}



export default Checkout;