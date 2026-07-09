import { useState } from "react";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";


function PizzaCard({ pizza }) {


  const { addToCart } = useCart();


  const [selectedSize, setSelectedSize] = useState("Medium");



  const selectedPrice =
    pizza?.sizes?.find(
      item => item.size === selectedSize
    )?.price || 0;





  const handleAddToCart = async()=>{


    const token = localStorage.getItem("token");


    if(!token){

      toast.error("Please login first");

      return;

    }



    try{


      await addToCart(

        pizza._id,

        selectedSize,

        1

      );



      toast.success(
        `${pizza.name} Added (${selectedSize})`
      );



    }catch(error){

      console.log(error);

    }


  };






return (


<div className="col-12 col-sm-6 col-lg-3 mb-4">



<div

className="card h-100 shadow border-dark pizza-card"

style={{

borderRadius:"18px",

overflow:"hidden"

}}

>





{/* Image */}


<div className="position-relative">


<img

src={

pizza?.image?.url ||

pizza?.image ||

"https://via.placeholder.com/400x300?text=Pizza"

}

alt={pizza?.name}

className="card-img-top"

style={{

height:"220px",

objectFit:"cover"

}}

/>



<span

className="position-absolute top-0 end-0 badge bg-white text-dark border border-dark m-3 shadow-sm"

>

⭐ 4.8

</span>



</div>








<div className="card-body d-flex flex-column">





<h5 className="fw-bold text-dark">

{pizza?.name}

</h5>







<p className="text-muted small flex-grow-1">

{pizza?.description}

</p>







<label className="fw-bold mb-2">

Select Size

</label>






<select

className="form-select mb-3 border-dark"

value={selectedSize}

onChange={(e)=>

setSelectedSize(e.target.value)

}

>



{

pizza?.sizes?.map((item)=>(


<option

key={item.size}

value={item.size}

>


{item.size} - ₹{item.price}


</option>


))


}



</select>









<div className="d-flex justify-content-between align-items-center mb-3">


<h3 className="fw-bold text-danger mb-0">

₹{selectedPrice}

</h3>




<span className="badge bg-dark">

Fresh

</span>



</div>








<button

type="button"

onClick={handleAddToCart}

className="btn btn-warning fw-bold w-100 mb-2"

>


🛒 Add To Cart


</button>

</div>


</div>








<style>{`

.pizza-card{

transition:all .3s ease;

background:white;

}



.pizza-card:hover{

transform:translateY(-8px);

box-shadow:0 12px 30px rgba(0,0,0,0.25)!important;

}



.pizza-card img{

transition:.3s ease;

}



.pizza-card:hover img{

transform:scale(1.05);

}



.btn-warning{

border-radius:10px;

}



.btn-outline-dark{

border-radius:10px;

}



@media(max-width:576px){

.pizza-card img{

height:200px!important;

}

}


`}</style>




</div>


);


}


export default PizzaCard;