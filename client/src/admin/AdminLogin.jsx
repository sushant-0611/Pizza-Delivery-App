import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { adminLogin } from "../services/adminService";

import { useAuth } from "../context/AuthContext";


function AdminLogin(){


const [email,setEmail] = useState("");

const [password,setPassword] = useState("");

const [loading,setLoading] = useState(false);


const navigate = useNavigate();

const { login } = useAuth();




// ==========================
// SUBMIT
// ==========================

const handleSubmit = async(e)=>{

e.preventDefault();


try{


setLoading(true);


const data = await adminLogin({

email,

password

});



if(data.success){


login(
data.token,
data.user
);



toast.success(
"Admin Login Successful"
);



navigate("/admin");


}



}
catch(error){


console.log(error);


toast.error(

error.response?.data?.message ||
"Admin Login Failed"

);


}
finally{


setLoading(false);


}



};





return (

<div className="container py-5">


<div className="row justify-content-center">


<div className="col-md-5">


<div className="card shadow">


<div className="card-header bg-dark text-white text-center">

<h3>
🍕 Admin Login
</h3>

</div>



<div className="card-body">



<form onSubmit={handleSubmit}>


<div className="mb-3">


<label>
Email
</label>


<input

type="email"

className="form-control"

value={email}

onChange={(e)=>setEmail(e.target.value)}

required

/>

</div>





<div className="mb-3">


<label>
Password
</label>


<input

type="password"

className="form-control"

value={password}

onChange={(e)=>setPassword(e.target.value)}

required

/>

</div>





<button

className="btn btn-warning w-100"

disabled={loading}

>


{
loading
?
"Logging in..."
:
"Login"
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


export default AdminLogin;