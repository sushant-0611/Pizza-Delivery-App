const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const http = require("http");


dotenv.config();



const connectDB = require("./config/db");

connectDB();




const app = express();

const server =
http.createServer(app);





// ==============================
// SOCKET
// ==============================

const {
  initSocket
}=require("./socket");


initSocket(server);






// ==============================
// MIDDLEWARE
// ==============================


app.use(

cors({

origin:
process.env.CLIENT_URL ||
"http://localhost:5173",

credentials:true,

})

);



app.use(
express.json()
);


app.use(
express.urlencoded({
extended:true
})
);


app.use(
cookieParser()
);






// ==============================
// ROUTES
// ==============================


app.use(
"/api/auth",
require("./routes/authRoutes")
);


app.use(
"/api/pizzas",
require("./routes/pizzaRoutes")
);


app.use(
"/api/dashboard",
require("./routes/dashboardRoutes")
);


app.use(
"/api/orders",
require("./routes/orderRoutes")
);


app.use(
"/api/cart",
require("./routes/cartRoutes")
);


app.use(
"/api/inventory",
require("./routes/inventoryRoutes")
);


app.use(
"/api/admin",
require("./routes/adminRoutes")
);



// ==============================
// ROOT
// ==============================


app.get(
"/",
(req,res)=>{


res.json({

success:true,

message:
"🍕 Pizza Delivery API Running"

});


});






// ==============================
// 404
// ==============================


app.use(
(req,res)=>{


res.status(404).json({

success:false,

message:
"API Route Not Found"

});


});







// ==============================
// ERROR
// ==============================


app.use(
(err,req,res,next)=>{


console.log(err);


res.status(
err.status || 500
)
.json({

success:false,

message:
err.message ||
"Internal Server Error"

});


});







// ==============================
// SERVER START
// ==============================


const PORT =
process.env.PORT || 5000;



server.listen(
PORT,
()=>{


console.log(
"================================"
);


console.log(
`🚀 Server Running : ${PORT}`
);


console.log(
"⚡ Socket.IO Ready"
);


console.log(
"================================"
);


}
);