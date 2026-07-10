import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function AdminProtected({children}){


const {user, loading}=useAuth();



if(loading){

return <h3>Loading...</h3>;

}



if(!user){

return <Navigate to="/admin/login" />;

}



if(user.role !== "admin"){

return <Navigate to="/" />;

}



return children;


}


export default AdminProtected;