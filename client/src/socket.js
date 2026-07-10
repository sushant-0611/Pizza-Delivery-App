import { io } from "socket.io-client";



const socket = io(
  "http://localhost:5000",
  {
    withCredentials: true,

    transports: [
      "websocket",
    ],

    autoConnect: true,

  }
);





// ==============================
// SOCKET CONNECT EVENT
// ==============================

socket.on(
  "connect",
  () => {

    console.log(
      "🟢 Socket Connected:",
      socket.id
    );

  }
);






// ==============================
// SOCKET ERROR
// ==============================

socket.on(
  "connect_error",
  (error)=>{

    console.log(
      "Socket Error:",
      error.message
    );

  }
);






// ==============================
// JOIN USER ROOM
// ==============================

export const joinSocketRoom = (userId)=>{


  if(!userId)
    return;



  if(socket.connected){


    socket.emit(
      "joinRoom",
      userId
    );


    console.log(
      "Joined Socket Room:",
      userId
    );


  }
  else{


    socket.on(
      "connect",
      ()=>{


        socket.emit(
          "joinRoom",
          userId
        );


      }
    );


  }


};






// ==============================
// DISCONNECT
// ==============================

export const disconnectSocket = ()=>{

  if(socket.connected){

    socket.disconnect();

  }

};






export default socket;