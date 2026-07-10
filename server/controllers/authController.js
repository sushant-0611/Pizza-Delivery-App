const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const sendEmail = require("../utils/sendEmail");



// ===============================
// Generate JWT Token
// ===============================

const generateToken = (user)=>{


    return jwt.sign(

        {
            id:user._id,
            role:user.role,
        },

        process.env.JWT_SECRET,

        {
            expiresIn:"7d",
        }

    );


};








// ===============================
// REGISTER
// ===============================


exports.register = async(req,res)=>{


try{


const {


name,

email,

password,

phone,

address,

city,

pincode


}=req.body;





if(!name || !email || !password){


return res.status(400).json({

success:false,

message:"Please fill all required fields"

});


}







const existingUser =

await User.findOne({
email
});





if(existingUser){


return res.status(400).json({

success:false,

message:"User already exists"

});


}







const hashedPassword =

await bcrypt.hash(
password,
10
);








const verificationToken =

crypto.randomBytes(32)
.toString("hex");








const user =

await User.create({


name,

email,

password:hashedPassword,


phone:phone || "",


address:address || "",


city:city || "",


pincode:pincode || "",




paymentDetails:{


method:"COD",


status:"Pending"


},





isVerified:false,


verificationToken,


verificationTokenExpires:

Date.now()+

24*60*60*1000



});









const verifyURL =

`${process.env.CLIENT_URL}/verify-email/${verificationToken}`;








const html = `


<div style="font-family:Arial">


<h2>
🍕 Pizza Delivery
</h2>


<p>
Hello ${user.name}
</p>



<p>
Please verify your email.
</p>



<a href="${verifyURL}"

style="

background:#ff5722;

color:white;

padding:12px 25px;

text-decoration:none;

border-radius:5px;

">

Verify Email

</a>


<p>
Link expires in 24 hours.
</p>



</div>


`;








await sendEmail(

user.email,

"Verify Your Email",

html

);







const token =

generateToken(user);







res.status(201).json({


success:true,


message:

"Registration successful. Please verify email.",



token,



user:{


id:user._id,


name:user.name,


email:user.email,


role:user.role,


isVerified:user.isVerified,


phone:user.phone,


address:user.address,


city:user.city,


pincode:user.pincode,


paymentMethod:
user.paymentDetails.method,


paymentStatus:
user.paymentDetails.status



}



});





}
catch(error){



console.log(error);



res.status(500).json({

success:false,

message:"Server Error"

});


}



};












// ===============================
// VERIFY EMAIL
// ===============================


exports.verifyEmail = async(req,res)=>{


try{


const {token}=req.params;





const user =

await User.findOne({

verificationToken:token,

verificationTokenExpires:{
$gt:Date.now()
}

});







if(!user){


return res.status(400).json({

success:false,

message:"Invalid or expired verification link"

});


}







user.isVerified=true;

user.verificationToken=null;

user.verificationTokenExpires=null;



await user.save();








res.status(200).json({


success:true,

message:"Email verified successfully"


});





}
catch(error){


console.log(error);



res.status(500).json({

success:false,

message:"Server Error"

});


}



};
// ===============================
// LOGIN
// ===============================


exports.login = async(req,res)=>{


try{


const {

email,

password

}=req.body;






if(!email || !password){


return res.status(400).json({

success:false,

message:"Please enter email and password"

});


}








// password select:false असल्यामुळे +password आवश्यक

const user =

await User.findOne({

email

})
.select("+password");








if(!user){


return res.status(404).json({

success:false,

message:"User not found"

});


}








const isMatch =

await bcrypt.compare(

password,

user.password

);








if(!isMatch){


return res.status(401).json({

success:false,

message:"Invalid password"

});


}





// ===============================
// BLOCK ADMIN FROM USER LOGIN
// ===============================

if(user.role === "admin"){

 return res.status(403).json({

 success:false,

 message:
 "Admin please login from admin portal"

 });

}


// EMAIL VERIFY CHECK


if(!user.isVerified){


return res.status(403).json({

success:false,

message:"Please verify your email before login"

});


}








const token =

generateToken(user);








res.status(200).json({


success:true,


message:"Login Successful",



token,



user:{


id:user._id,


name:user.name,


email:user.email,


role:user.role,


isVerified:user.isVerified,


phone:user.phone,


address:user.address,


city:user.city,


pincode:user.pincode,



paymentMethod:

user.paymentDetails?.method || "COD",



paymentStatus:

user.paymentDetails?.status || "Pending"



}



});





}
catch(error){



console.log(error);



res.status(500).json({

success:false,

message:"Server Error"

});


}



};












// ===============================
// GET PROFILE
// ===============================


exports.getProfile = async(req,res)=>{


try{


const user =

await User.findById(

req.user.id

)

.select(

"-password -verificationToken -resetPasswordToken"

);







if(!user){


return res.status(404).json({

success:false,

message:"User not found"

});


}







res.status(200).json({


success:true,



user:{


id:user._id,


name:user.name,


email:user.email,


role:user.role,


isVerified:user.isVerified,


phone:user.phone,


address:user.address,


city:user.city,


pincode:user.pincode,



paymentMethod:

user.paymentDetails?.method || "COD",



paymentStatus:

user.paymentDetails?.status || "Pending",



createdAt:user.createdAt,


updatedAt:user.updatedAt



}



});





}
catch(error){



console.log(error);



res.status(500).json({

success:false,

message:"Server Error"

});


}



};












// ===============================
// UPDATE PROFILE
// ===============================


exports.updateProfile = async(req,res)=>{


try{


const {


name,

phone,

address,

city,

pincode,

paymentMethod


}=req.body;







const user =

await User.findById(

req.user.id

);







if(!user){


return res.status(404).json({

success:false,

message:"User not found"

});


}








if(name!==undefined)

user.name=name;





if(phone!==undefined)

user.phone=phone;





if(address!==undefined)

user.address=address;





if(city!==undefined)

user.city=city;





if(pincode!==undefined)

user.pincode=pincode;








// Payment Details

if(!user.paymentDetails){


user.paymentDetails={

method:"COD",

status:"Pending"

};


}







if(paymentMethod!==undefined){


user.paymentDetails.method =

paymentMethod;


}








await user.save();








res.status(200).json({


success:true,


message:"Profile Updated Successfully",




user:{


id:user._id,


name:user.name,


email:user.email,


role:user.role,


phone:user.phone,


address:user.address,


city:user.city,


pincode:user.pincode,



paymentMethod:

user.paymentDetails.method,



paymentStatus:

user.paymentDetails.status



}



});





}
catch(error){



console.log(error);



res.status(500).json({

success:false,

message:"Server Error"

});


}



};
// ===============================
// FORGOT PASSWORD
// ===============================


exports.forgotPassword = async(req,res)=>{


try{


const {

email

}=req.body;






if(!email){


return res.status(400).json({

success:false,

message:"Email is required"

});


}







const user =

await User.findOne({

email

});







// Security purpose

if(!user){


return res.status(200).json({

success:true,

message:"If account exists, reset link sent"

});


}








const resetToken =

crypto.randomBytes(32)

.toString("hex");








user.resetPasswordToken =

resetToken;



user.resetPasswordExpires =

Date.now()+

60*60*1000;







await user.save();








const resetURL =

`${process.env.CLIENT_URL}/reset-password/${resetToken}`;








const html = `


<div style="font-family:Arial">


<h2>
🍕 Pizza Delivery
</h2>


<p>
Hello ${user.name}
</p>



<p>
You requested password reset.
</p>



<a href="${resetURL}"

style="

background:#ff5722;

color:white;

padding:12px 25px;

text-decoration:none;

border-radius:5px;

">


Reset Password


</a>




<p>
Link expires in 1 hour.
</p>



</div>


`;







await sendEmail(

user.email,

"Reset Password",

html

);








res.status(200).json({

success:true,

message:"If account exists, reset link sent"

});







}
catch(error){



console.log(error);



res.status(500).json({

success:false,

message:"Server Error"

});


}



};












// ===============================
// RESET PASSWORD
// ===============================


exports.resetPassword = async(req,res)=>{


try{


const {

token

}=req.params;





const {

password

}=req.body;








if(!password){


return res.status(400).json({

success:false,

message:"Password is required"

});


}








const user =

await User.findOne({


resetPasswordToken:token,



resetPasswordExpires:{

$gt:Date.now()

}



});







if(!user){


return res.status(400).json({

success:false,

message:"Invalid or expired reset link"

});


}







const hashedPassword =

await bcrypt.hash(

password,

10

);








user.password =

hashedPassword;





user.resetPasswordToken=null;


user.resetPasswordExpires=null;







await user.save();








res.status(200).json({


success:true,


message:"Password reset successful. Please login."



});







}
catch(error){



console.log(error);



res.status(500).json({

success:false,

message:"Server Error"

});


}



};