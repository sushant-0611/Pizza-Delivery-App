const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Razorpay = require("razorpay");
const crypto = require("crypto");


// ===============================
// Razorpay Instance
// ===============================

const razorpay = new Razorpay({

    key_id: process.env.RAZORPAY_KEY_ID,

    key_secret: process.env.RAZORPAY_KEY_SECRET,

});




// ===============================
// CREATE RAZORPAY ORDER
// ===============================

exports.createPaymentOrder = async (req,res)=>{

try{


const {
    totalPrice
}=req.body;


if(!totalPrice){

return res.status(400).json({

success:false,

message:"Total price required"

});

}



const options={

amount: Math.round(totalPrice * 100),

currency:"INR",

receipt:`pizza_${Date.now()}`

};



const razorpayOrder =
await razorpay.orders.create(options);



res.status(200).json({

success:true,

razorpayOrder

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






// ===============================
// VERIFY RAZORPAY PAYMENT
// ===============================

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
razorpay_order_id +
"|" +
razorpay_payment_id;



const generatedSignature =
crypto
.createHmac(
"sha256",
process.env.RAZORPAY_KEY_SECRET
)
.update(body)
.digest("hex");




if(generatedSignature !== razorpay_signature){


return res.status(400).json({

success:false,

message:"Payment verification failed"

});


}





const order = await Order.create({


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


orderStatus:"Order Received"


});





// clear cart

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

message:"Payment successful",

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








// ===============================
// COD ORDER
// ===============================


exports.placeOrder = async(req,res)=>{


try{


const {


items,

shippingAddress,

totalPrice


}=req.body;




const order = await Order.create({


user:req.user.id,


items,


shippingAddress,



payment:{


method:"COD",


status:"Pending"


},



totalPrice,


orderStatus:"Order Received"


});






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

console.log(error);


res.status(500).json({

success:false,

message:error.message

});


}


};









// ===============================
// USER ORDERS
// ===============================

exports.getMyOrders = async(req,res)=>{


try{


const orders =
await Order.find({

user:req.user.id

})

.populate("items.pizza")

.sort({

createdAt:-1

});




res.json({

success:true,

orders

});


}
catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};









// ===============================
// ADMIN ALL ORDERS
// ===============================

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



res.json({

success:true,

orders

});


}
catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};









// ===============================
// SINGLE ORDER
// ===============================

exports.getOrderById = async(req,res)=>{


try{


const order =
await Order.findById(req.params.id)

.populate("user")

.populate("items.pizza");



if(!order){

return res.status(404).json({

success:false,

message:"Order not found"

});

}



res.json({

success:true,

order

});


}
catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};









// ===============================
// UPDATE STATUS
// ===============================

exports.updateOrderStatus = async(req,res)=>{


try{


const order =
await Order.findById(req.params.id);



if(!order){

return res.status(404).json({

success:false,

message:"Order not found"

});

}



order.orderStatus =
req.body.orderStatus;



await order.save();



res.json({

success:true,

message:"Order Status Updated",

order

});


}
catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};









// ===============================
// DELETE ORDER
// ===============================

exports.deleteOrder = async(req,res)=>{


try{


const order =
await Order.findById(req.params.id);



if(!order){

return res.status(404).json({

success:false,

message:"Order not found"

});

}



await order.deleteOne();



res.json({

success:true,

message:"Order Deleted"

});


}
catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};