const jwt = require("jsonwebtoken");
const User = require("../models/User");




// =====================================
// PROTECT MIDDLEWARE
// =====================================

const protect = async (req, res, next) => {

  try {


    let token;



    // ==============================
    // GET TOKEN FROM HEADER
    // ==============================

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {

      token =
        req.headers.authorization.split(" ")[1];

    }




    // ==============================
    // CHECK TOKEN
    // ==============================

    if (!token) {

      return res.status(401).json({

        success:false,

        message:
        "Access denied. No token provided."

      });

    }






    // ==============================
    // VERIFY TOKEN
    // ==============================

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );






    // ==============================
    // FIND USER
    // ==============================

    const user =
      await User.findById(decoded.id)
      .select("-password");






    if(!user){

      return res.status(401).json({

        success:false,

        message:"User not found."

      });

    }







    // ==============================
    // ATTACH USER
    // ==============================

    req.user = user;



    next();



  }

  catch(error){


    console.log(
      "Auth Middleware Error:",
      error
    );





    if(
      error.name === "TokenExpiredError"
    ){

      return res.status(401).json({

        success:false,

        message:
        "Token expired. Please login again."

      });

    }






    if(
      error.name === "JsonWebTokenError"
    ){

      return res.status(401).json({

        success:false,

        message:"Invalid token."

      });

    }






    return res.status(500).json({

      success:false,

      message:
      "Authentication failed."

    });



  }


};









// =====================================
// ADMIN ONLY MIDDLEWARE
// =====================================

const adminOnly = (
  req,
  res,
  next
)=>{


  try{


    if(!req.user){

      return res.status(401).json({

        success:false,

        message:"Unauthorized."

      });

    }






    if(
      req.user.role !== "admin"
    ){

      return res.status(403).json({

        success:false,

        message:
        "Access denied. Admin only."

      });

    }






    next();



  }

  catch(error){


    console.log(
      "Admin Middleware Error:",
      error
    );


    return res.status(500).json({

      success:false,

      message:
      "Admin verification failed."

    });


  }


};







// =====================================
// EXPORTS
// =====================================

module.exports = protect;

module.exports.adminOnly = adminOnly;