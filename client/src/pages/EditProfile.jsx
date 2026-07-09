import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaUserCircle,
  FaSave,
  FaArrowLeft,
} from "react-icons/fa";

import { toast } from "react-toastify";

import { useAuth } from "../context/AuthContext";
import { updateProfile } from "../services/authService";


function EditProfile() {

  const navigate = useNavigate();

  const { user, login, token } = useAuth();


  const [loading, setLoading] = useState(false);



  const [formData, setFormData] = useState({

    name: user?.name || "",

    email: user?.email || "",

    role: user?.role || "user",


    phone: user?.phone || "",

    address: user?.address || "",

    city: user?.city || "",

    pincode: user?.pincode || "",


    paymentMethod:
      user?.paymentMethod || "COD"

  });





  const handleChange = (e)=>{

    setFormData({

      ...formData,

      [e.target.name]:e.target.value

    });

  };





  const handleSubmit = async(e)=>{

    e.preventDefault();


    try{


      setLoading(true);



      const data = await updateProfile(formData);



      if(data.success){


        login(

          data.token || token,

          data.user

        );



        toast.success(
          "Profile Updated Successfully"
        );



        navigate("/profile");


      }else{


        toast.error(data.message);


      }



    }catch(error){


      toast.error(

        error.response?.data?.message ||

        "Profile Update Failed"

      );


    }finally{


      setLoading(false);


    }


  };





return (

<div className="container py-5">

<div className="row justify-content-center">


<div className="col-lg-8">



<div className="card shadow border-0">



<div className="card-header bg-warning text-center py-4">


<FaUserCircle
size={90}
className="text-dark"
/>


<h3 className="fw-bold mt-3">
Edit Profile
</h3>


</div>





<form onSubmit={handleSubmit}>


<div className="card-body p-4">





{/* Account Details */}

<div className="card shadow-sm border-0 mb-4">


<div className="card-header bg-dark text-white">

<h5>
👤 Account Details
</h5>

</div>



<div className="card-body">



<label>Name</label>

<input

type="text"

name="name"

className="form-control mb-3"

value={formData.name}

onChange={handleChange}

/>





<label>Email</label>


<input

type="email"

className="form-control mb-3"

value={formData.email}

disabled

/>





<label>Role</label>


<input

className="form-control"

value={formData.role}

disabled

/>




</div>

</div>






{/* Delivery Details */}


<div className="card shadow-sm border-0 mb-4">


<div className="card-header bg-dark text-white">

<h5>
📍 Delivery Details
</h5>

</div>




<div className="card-body">


<label>
Phone
</label>


<input

type="text"

name="phone"

className="form-control mb-3"

value={formData.phone}

onChange={handleChange}

/>




<label>
Address
</label>


<textarea

rows="3"

name="address"

className="form-control mb-3"

value={formData.address}

onChange={handleChange}

/>





<label>
City
</label>


<input

type="text"

name="city"

className="form-control mb-3"

value={formData.city}

onChange={handleChange}

/>





<label>
Pincode
</label>


<input

type="text"

name="pincode"

className="form-control"

value={formData.pincode}

onChange={handleChange}

/>




</div>


</div>








{/* Payment Details */}


<div className="card shadow-sm border-0 mb-4">



<div className="card-header bg-dark text-white">

<h5>
💳 Payment Details
</h5>


</div>





<div className="card-body">


<label>
Payment Method
</label>



<select

name="paymentMethod"

className="form-select"

value={formData.paymentMethod}

onChange={handleChange}

>



<option value="COD">

Cash On Delivery

</option>



<option value="UPI">

UPI

</option>



<option value="CARD">

Card

</option>



</select>



</div>


</div>








<button

className="btn btn-warning w-100 fw-bold mb-3"

disabled={loading}

>


<FaSave className="me-2"/>


{
loading
?
"Updating..."
:
"Update Details"
}


</button>







<button

type="button"

className="btn btn-dark w-100"

onClick={()=>navigate("/profile")}

>


<FaArrowLeft className="me-2"/>


Back To Profile


</button>





</div>



</form>



</div>


</div>


</div>


</div>

);


}


export default EditProfile;