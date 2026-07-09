import { useState } from "react";
import { forgotPassword } from "../services/authService";
import { toast } from "react-toastify";

function ForgotPassword() {

  const [email,setEmail]=useState("");
  const [loading,setLoading]=useState(false);

  const handleSubmit=async(e)=>{

    e.preventDefault();

    try{

      setLoading(true);

      const data=await forgotPassword(email);

      toast.success(data.message);

      setEmail("");

    }catch(error){

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
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

Forgot Password

</h3>

<form onSubmit={handleSubmit}>

<input

type="email"

className="form-control mb-3"

placeholder="Enter Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

required

/>

<button

className="btn btn-warning w-100"

disabled={loading}

>

{

loading ?

"Sending..."

:

"Send Reset Link"

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

export default ForgotPassword;