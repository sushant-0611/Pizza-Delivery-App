const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Inventory = require("../models/Inventory");

const {
  getIO
} = require("../socket");

const Razorpay = require("razorpay");
const crypto = require("crypto");




// =======================================
// RAZORPAY INSTANCE
// =======================================

const razorpay = new Razorpay({

  key_id: process.env.RAZORPAY_KEY_ID,

  key_secret: process.env.RAZORPAY_KEY_SECRET,

});







// =======================================
// AUTO DEDUCT INVENTORY
// =======================================

const deductInventory = async (items)=>{


try{


for(const item of items){



// Only custom pizza

if(
!item.custom ||
!item.builder
){

continue;

}





// ================= Base =================


if(item.builder.base){


await Inventory.findOneAndUpdate(

{

type:"Base",

name:item.builder.base

},

{

$inc:{

stock:-item.quantity

}

}

);


}








// ================= Sauce =================


if(item.builder.sauce){


await Inventory.findOneAndUpdate(

{

type:"Sauce",

name:item.builder.sauce

},

{

$inc:{

stock:-item.quantity

}

}

);


}









// ================= Cheese =================


if(item.builder.cheese){


let cheeseList =

Array.isArray(
item.builder.cheese
)

?

item.builder.cheese

:

item.builder.cheese
.split(",")
.map(
c=>c.trim()
);




for(const cheese of cheeseList){


await Inventory.findOneAndUpdate(

{

type:"Cheese",

name:cheese

},

{

$inc:{

stock:-item.quantity

}

}

);


}



}









// ================= Vegetables =================


if(

item.builder.vegetables &&

item.builder.vegetables.length

){



for(const veg of item.builder.vegetables){



await Inventory.findOneAndUpdate(

{

type:"Vegetable",

name:veg

},

{

$inc:{

stock:-item.quantity

}

}

);



}


}




}




console.log(
"✅ Inventory Updated"
);



}

catch(error){


console.log(
"Inventory Error:",
error
);


}



};









// =======================================
// CREATE RAZORPAY PAYMENT ORDER
// =======================================


exports.createPaymentOrder = async(req,res)=>{


try{


const {
totalPrice
}=req.body;



if(!totalPrice){


return res.status(400).json({

success:false,

message:"Total Price Required"

});


}





const options={


amount:
Math.round(
totalPrice * 100
),


currency:"INR",


receipt:
`pizza_${Date.now()}`


};





const razorpayOrder =

await razorpay.orders.create(
options
);






res.status(200).json({

success:true,

razorpayOrder

});





}
catch(error){


res.status(500).json({

success:false,

message:error.message

});


}



};











// =======================================
// VERIFY RAZORPAY PAYMENT
// =======================================


exports.verifyPayment = async(req,res)=>{


try{


const {

razorpay_order_id,

razorpay_payment_id,

razorpay_signature,

shippingAddress,

items,

totalPrice


}=req.body;







const body =

razorpay_order_id
+
"|"
+
razorpay_payment_id;






const generatedSignature =

crypto
.createHmac(

"sha256",

process.env.RAZORPAY_KEY_SECRET

)

.update(body)

.digest("hex");







if(
generatedSignature !== razorpay_signature
){


return res.status(400).json({

success:false,

message:"Payment Verification Failed"

});


}







const order =

await Order.create({



user:req.user.id,


items,


shippingAddress,



payment:{


method:"Razorpay",


status:"Paid",


razorpayOrderId:
razorpay_order_id,


razorpayPaymentId:
razorpay_payment_id,


razorpaySignature:
razorpay_signature


},




totalPrice,


orderStatus:"Pending"



});







await deductInventory(items);







await Cart.findOneAndUpdate(

{

user:req.user.id

},

{

items:[]

}

);







res.status(201).json({

success:true,

message:"Payment Successful",

order

});






}
catch(error){


console.log(error);


res.status(500).json({

success:false,

message:error.message

});


}



};
// =======================================
// PLACE COD ORDER
// =======================================

exports.placeOrder = async(req,res)=>{


try{


const {

items,

shippingAddress,

totalPrice

}=req.body;






const order =

await Order.create({



user:req.user.id,


items,


shippingAddress,



payment:{


method:"COD",


status:"Pending"


},




totalPrice,



orderStatus:"Pending"



});







// Deduct Inventory

await deductInventory(items);







// Clear Cart

await Cart.findOneAndUpdate(

{

user:req.user.id

},

{

items:[]

}

);







res.status(201).json({

success:true,

message:"COD Order Placed Successfully",

order

});






}
catch(error){


console.log(
"COD Order Error:",
error
);



res.status(500).json({

success:false,

message:error.message

});


}


};











// =======================================
// GET MY ORDERS
// =======================================


exports.getMyOrders = async(req,res)=>{


try{


const orders =

await Order.find({

user:req.user.id

})

.populate(
"items.pizza"
)

.sort({

createdAt:-1

});






res.status(200).json({

success:true,

orders

});






}
catch(error){


console.log(
"Get My Orders Error:",
error
);



res.status(500).json({

success:false,

message:error.message

});


}



};









// =======================================
// GET ALL ORDERS ADMIN
// =======================================


exports.getAllOrders = async(req,res)=>{


try{


const orders =

await Order.find()

.populate(
"user",
"name email"
)

.populate(
"items.pizza"
)

.sort({

createdAt:-1

});







res.status(200).json({

success:true,

orders

});






}
catch(error){


console.log(
"Get All Orders Error:",
error
);



res.status(500).json({

success:false,

message:error.message

});


}



};











// =======================================
// GET SINGLE ORDER
// =======================================


exports.getOrderById = async(req,res)=>{


try{


const order =

await Order.findById(
req.params.id
)

.populate(
"user",
"name email"
)

.populate(
"items.pizza"
);






if(!order){


return res.status(404).json({

success:false,

message:"Order not found"

});


}







res.status(200).json({

success:true,

order

});






}
catch(error){


console.log(
"Single Order Error:",
error
);



res.status(500).json({

success:false,

message:error.message

});


}


};











// =======================================
// UPDATE ORDER STATUS ADMIN
// =======================================


exports.updateOrderStatus = async(req,res)=>{


try{


const {

orderStatus

}=req.body;






const allowedStatus=[


"Pending",

"Preparing",

"Out for Delivery",

"Delivered",

"Cancelled"


];






if(
!allowedStatus.includes(orderStatus)
){


return res.status(400).json({

success:false,

message:"Invalid Order Status"

});


}








const order =

await Order.findById(
req.params.id
);






if(!order){


return res.status(404).json({

success:false,

message:"Order not found"

});


}







order.orderStatus =

orderStatus;



await order.save();









// ==========================
// SOCKET USER UPDATE
// ==========================


const io = getIO();





io.to(

order.user.toString()

)

.emit(

"orderStatusUpdated",

{


orderId:order._id,


status:order.orderStatus,


payment:order.payment



}


);








res.status(200).json({

success:true,

message:"Order Status Updated",

order

});






}
catch(error){


console.log(

"Update Status Error:",

error

);



res.status(500).json({

success:false,

message:error.message

});


}


};












// =======================================
// DELETE ORDER
// =======================================


exports.deleteOrder = async(req,res)=>{


try{


const order =

await Order.findById(
req.params.id
);






if(!order){


return res.status(404).json({

success:false,

message:"Order not found"

});


}







await order.deleteOne();








res.status(200).json({

success:true,

message:"Order Deleted Successfully"

});






}
catch(error){


console.log(

"Delete Order Error:",

error

);



res.status(500).json({

success:false,

message:error.message

});


}



};