import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";


import {
  joinSocketRoom
} from "../socket";



const AuthContext = createContext();





export function AuthProvider({ children }) {


  const [user, setUser] = useState(null);

  const [token, setToken] = useState(null);

  const [loading, setLoading] = useState(true);







  // ==========================
  // LOAD USER FROM LOCAL STORAGE
  // ==========================


  useEffect(() => {


    try {


      const savedToken =
        localStorage.getItem("token");


      const savedUser =
        localStorage.getItem("user");





      if(
        savedToken &&
        savedUser
      ){


        const parsedUser =
          JSON.parse(savedUser);



        setToken(savedToken);


        setUser(parsedUser);




        // ==========================
        // JOIN SOCKET ROOM
        // ==========================


        if(parsedUser?._id){

          joinSocketRoom(
            parsedUser._id
          );

        }



      }


    }
    catch(error){


      console.error(
        "Auth Restore Error:",
        error
      );



      localStorage.removeItem("token");

      localStorage.removeItem("user");


    }
    finally{


      setLoading(false);


    }



  }, []);









  // ==========================
  // LOGIN
  // ==========================


  const login = (
    jwtToken,
    userData
  ) => {



    localStorage.setItem(
      "token",
      jwtToken
    );


    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );




    setToken(jwtToken);


    setUser(userData);





    // ==========================
    // JOIN SOCKET ROOM AFTER LOGIN
    // ==========================


    if(userData?._id){

      joinSocketRoom(
        userData._id
      );

    }


  };









  // ==========================
  // UPDATE USER
  // ==========================


  const updateUser = (
    updatedUser
  ) => {


    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );


    setUser(updatedUser);




  };









  // ==========================
  // LOGOUT
  // ==========================


  const logout = () => {


    localStorage.removeItem(
      "token"
    );


    localStorage.removeItem(
      "user"
    );



    setToken(null);


    setUser(null);



  };









  return (


    <AuthContext.Provider


      value={

        {

          user,

          token,

          loading,


          login,

          logout,

          updateUser,


          isAuthenticated:
          !!token,


        }

      }


    >


      {children}


    </AuthContext.Provider>


  );


}








export function useAuth(){


  return useContext(
    AuthContext
  );


}