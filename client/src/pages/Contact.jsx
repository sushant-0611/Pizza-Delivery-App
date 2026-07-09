import {
FaPhone,
FaEnvelope,
FaMapMarkerAlt
} from "react-icons/fa";


function Contact(){


return (

<div className="container py-5">


<div className="text-center mb-5">


<h1 className="fw-bold text-warning">
📞 Contact Us
</h1>


<p className="text-muted">
We are always happy to help you.
</p>


</div>





<div className="row g-4">



<div className="col-md-5">


<div className="card shadow border-0 h-100">


<div className="card-body p-4">


<h3 className="fw-bold mb-4">
Get In Touch
</h3>



<p>

<FaPhone className="text-warning me-2"/>

+91 9876543210

</p>




<p>

<FaEnvelope className="text-warning me-2"/>

support@pizzaapp.com

</p>




<p>

<FaMapMarkerAlt className="text-warning me-2"/>

Pune, Maharashtra, India

</p>



</div>


</div>


</div>








<div className="col-md-7">


<div className="card shadow border-0">


<div className="card-body p-4">



<h3 className="fw-bold mb-4">
Send Message
</h3>




<form>


<div className="mb-3">

<input

type="text"

className="form-control"

placeholder="Your Name"

/>

</div>





<div className="mb-3">


<input

type="email"

className="form-control"

placeholder="Your Email"

/>


</div>





<div className="mb-3">


<textarea

rows="5"

className="form-control"

placeholder="Your Message"

></textarea>


</div>





<button

className="btn btn-warning w-100 fw-bold"

>

Send Message

</button>




</form>



</div>


</div>


</div>





</div>


</div>

);


}


export default Contact;