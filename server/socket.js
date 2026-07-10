const socketIO = require("socket.io");


let io;



// ==============================
// Initialize Socket.IO
// ==============================

const initSocket = (server) => {


  io = socketIO(server, {

    cors: {

      origin:
        process.env.CLIENT_URL ||
        "http://localhost:5173",

      credentials:true,

    },

  });





  io.on(
    "connection",
    (socket)=>{


      console.log(
        "🟢 Socket Connected:",
        socket.id
      );





      // ==========================
      // JOIN USER ROOM
      // ==========================

      socket.on(
        "joinRoom",
        (userId)=>{


          socket.join(
            userId
          );


          console.log(
            `User Joined Room : ${userId}`
          );


        }
      );







      // ==========================
      // DISCONNECT
      // ==========================

      socket.on(
        "disconnect",
        ()=>{


          console.log(
            "🔴 Socket Disconnected:",
            socket.id
          );


        }
      );



    }
  );




  return io;

};








// ==============================
// GET IO INSTANCE
// ==============================

const getIO = ()=>{


  if(!io){

    throw new Error(
      "Socket.io not initialized"
    );

  }


  return io;


};







module.exports = {

  initSocket,

  getIO,

};