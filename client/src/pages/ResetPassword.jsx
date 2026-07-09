import { useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { resetPassword } from "../services/authService";
import { toast } from "react-toastify";

function ResetPassword(){

const {token}=useParams();

const navigate=useNavigate();

const [password,setPassword]=useState("");

const [loading,setLoading]=useState(false);

const handleSubmit=async(e)=>{

e.preventDefault();

try{

setLoading(true);

const data=await resetPassword(token,password);

toast.success(data.message);

navigate("/login");

}catch(error){

toast.error(

error.response?.data?.message ||

"Reset Failed"

);

}finally{

setLoading(false);

}

};

return(

<div className="container py-5">

<div className="row justify-content-center">

<div className="col-md-5">

<div className="card shadow">

<div className="card-body">

<h3 className="text-center mb-4">

Reset Password

</h3>

<form onSubmit={handleSubmit}>

<input

type="password"

className="form-control mb-3"

placeholder="New Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

required

minLength={6}

/>

<button

className="btn btn-warning w-100"

disabled={loading}

>

{

loading ?

"Updating..."

:

"Reset Password"

}

</button>

</form>

</div>

</div>

</div>

</div>

</div>

);

}

export default ResetPassword;