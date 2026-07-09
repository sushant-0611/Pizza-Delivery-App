import axios from "axios";


// =============================
// AXIOS INSTANCE
// =============================

const api = axios.create({

  baseURL: "http://localhost:5000/api",

  headers: {

    "Content-Type": "application/json",

  },

  withCredentials: true,

});





// =============================
// JWT TOKEN INTERCEPTOR
// =============================

api.interceptors.request.use(

(config)=>{


  const token = localStorage.getItem("token");


  if(token){

    config.headers.Authorization =
      `Bearer ${token}`;

  }


  return config;


},


(error)=>{

  return Promise.reject(error);

}

);






// =============================
// RESPONSE INTERCEPTOR
// =============================

api.interceptors.response.use(


(response)=>{


  return response;


},



(error)=>{


  if(error.response){


    console.log(
      "API ERROR:",
      error.response.status,
      error.response.data
    );



    // Token expired / unauthorized

    if(error.response.status === 401){

      localStorage.removeItem("token");

      localStorage.removeItem("user");

      window.location.href="/login";

    }


  }

  else{


    console.log(
      "Network Error:",
      error.message
    );


  }



  return Promise.reject(error);


}

);



export default api;