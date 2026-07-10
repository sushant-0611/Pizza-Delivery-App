const mongoose = require("mongoose");



const userSchema = new mongoose.Schema(

  {


    // =========================
    // Basic Information
    // =========================


    name: {

      type: String,

      required: true,

      trim: true,

    },




    email: {

      type: String,

      required: true,

      unique: true,

      lowercase: true,

      trim: true,

    },




    password: {

      type: String,

      required: true,

      minlength: 6,

      select: false,

    },




    phone: {

      type: String,

      default: "",

    },




    address: {

      type: String,

      default: "",

    },




    city: {

      type: String,

      default: "",

    },




    pincode: {

      type: String,

      default: "",

    },







    // =========================
    // Payment Details
    // =========================


    paymentDetails: {


      method: {

        type: String,

        enum: [

          "UPI",

          "COD",

          "CARD"

        ],

        default: "COD",

      },



      status: {

        type: String,

        enum: [

          "Pending",

          "Paid",

          "Failed"

        ],

        default: "Pending",

      },


    },








    // =========================
    // Email Verification
    // =========================


    isVerified: {


      type:Boolean,

      default:false,


    },




    verificationToken:{


      type:String,

      default:null,


    },




    verificationTokenExpires:{


      type:Date,

      default:null,


    },









    // =========================
    // Forgot Password
    // =========================


    resetPasswordToken:{


      type:String,

      default:null,


    },




    resetPasswordExpires:{


      type:Date,

      default:null,


    },









    // =========================
    // Role Management
    // =========================


    role:{


      type:String,


      enum:[

        "user",

        "admin"

      ],


      default:"user",


    },





  },


  {


    timestamps:true,


  }


);






// =========================
// Hide Password JSON Response
// =========================


userSchema.methods.toJSON = function(){


  const user = this.toObject();


  delete user.password;


  return user;


};






module.exports =
mongoose.model(
  "User",
  userSchema
);