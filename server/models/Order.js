const mongoose = require("mongoose");


// =============================
// Order Item Schema
// =============================

const orderItemSchema = new mongoose.Schema(
{
    pizza: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pizza",
        default: null,
    },


    name: {
        type: String,
        required: true,
    },


    image: {
        type: String,
        default: "",
    },


    size: {
        type: String,
        required: true,
    },


    quantity: {
        type: Number,
        required: true,
        min:1,
    },


    price:{
        type:Number,
        required:true,
    },



    // =============================
    // Custom Pizza
    // =============================

    custom:{
        type:Boolean,
        default:false,
    },



    builder:{


        base:{
            type:String,
            default:"",
        },


        sauce:{
            type:String,
            default:"",
        },


        cheese:[

            {
                type:String
            }

        ],



        vegetables:[

            {
                type:String
            }

        ]

    }


},
{
    _id:true
});









// =============================
// Order Schema
// =============================


const orderSchema = new mongoose.Schema(
{


// User

user:{


type:mongoose.Schema.Types.ObjectId,

ref:"User",

required:true


},







// Cart Items

items:[

orderItemSchema

],







// Delivery Address

shippingAddress:{


fullName:{


type:String,

required:true


},



phone:{


type:String,

required:true


},



address:{


type:String,

required:true


},



city:{


type:String,

default:""


},



pincode:{


type:String,

default:""


}



},







// =============================
// Payment
// =============================


payment:{



method:{


type:String,


enum:[

"COD",

"Razorpay"

],


default:"COD"


},





status:{


type:String,


enum:[

"Pending",

"Paid",

"Failed"

],


default:"Pending"


},






razorpayOrderId:{


type:String,


default:""


},





razorpayPaymentId:{


type:String,


default:""


},





razorpaySignature:{


type:String,


default:""


}





},







// =============================
// COD Charges
// =============================


codCharge:{


type:Number,


default:0


},







// =============================
// Order Status
// =============================


orderStatus:{


type:String,


enum:[


"Order Received",


"In Kitchen",


"Sent to Delivery",


"Delivered",


"Cancelled"


],



default:"Order Received"


},







// =============================
// Total Amount
// =============================


totalPrice:{


type:Number,


required:true


}





},
{

timestamps:true

}

);







// =============================
// Index
// =============================


orderSchema.index({

user:1,

createdAt:-1

});





module.exports =
mongoose.model(
"Order",
orderSchema
);