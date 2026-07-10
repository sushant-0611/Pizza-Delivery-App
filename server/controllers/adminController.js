const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const generateToken = (user)=>{

return jwt.sign(

{
 id:user._id,
 role:user.role
},

process.env.JWT_SECRET,

{
 expiresIn:"7d"
}

);

};




// =======================
// ADMIN LOGIN
// =======================


exports.adminLogin = async(req,res)=>{

try{


const {
email,
password
}=req.body;


const admin = await User.findOne({
  email
}).select("+password");



if(!admin){

return res.status(401).json({

success:false,

message:"Invalid Admin Credentials"

});

}





if(admin.role !== "admin"){


return res.status(403).json({

success:false,

message:"Access denied. Admin only"

});


}




const match =
await bcrypt.compare(
password,
admin.password
);



if(!match){


return res.status(401).json({

success:false,

message:"Invalid Password"

});


}





const token =
generateToken(admin);




res.json({

success:true,

token,


user:{


id:admin._id,

name:admin.name,

email:admin.email,

role:admin.role


}


});



}
catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};