import { useEffect, useState } from "react";
import axios from "axios";
import PizzaCard from "../components/PizzaCard";


function Menu() {


  const [pizzas, setPizzas] = useState([]);

  const [filteredPizzas, setFilteredPizzas] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  // Default Low To High
  const [sort, setSort] = useState("low");

  const [loading, setLoading] = useState(true);





  // Fetch Pizza Data
  const fetchPizzas = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/pizzas"
      );


      console.log("Pizza Data:", res.data.pizzas);


      setPizzas(res.data.pizzas || []);

      setFilteredPizzas(res.data.pizzas || []);


    } catch(error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };





  useEffect(()=>{

    fetchPizzas();

  },[]);









  // Search + Filter + Sort

  useEffect(()=>{


    let result = [...pizzas];





    // Search

    if(search.trim() !== ""){


      result = result.filter((pizza)=>

        pizza.name
        .toLowerCase()
        .includes(search.toLowerCase())

      );


    }





    // Category

    if(category !== "All"){


      result = result.filter((pizza)=>

        pizza.category === category

      );


    }






    // Price Sort

    result.sort((a,b)=>{


      const priceA =
        a.sizes?.find(
          item => item.size === "Small"
        )?.price || 0;



      const priceB =
        b.sizes?.find(
          item => item.size === "Small"
        )?.price || 0;





      if(sort === "low"){

        return priceA - priceB;

      }


      if(sort === "high"){

        return priceB - priceA;

      }


      return 0;


    });





    setFilteredPizzas(result);



  },[
    search,
    category,
    sort,
    pizzas
  ]);







  if(loading){

    return (

      <div className="text-center mt-5">

        <h3>
          Loading Pizza Menu
        </h3>

      </div>

    );

  }








  return (

    <div className="container mt-5">





      <h2 className="text-center fw-bold mb-4">

        Pizza Menu

      </h2>








      {/* Filters */}

      <div className="row mb-4">





        {/* Search */}

        <div className="col-md-5 mb-2">


          <input

            type="text"

            className="form-control"

            placeholder="Search pizza..."

            value={search}

            onChange={(e)=>

              setSearch(e.target.value)

            }

          />


        </div>








        {/* Category */}

        <div className="col-md-3 mb-2">


          <select

            className="form-select"

            value={category}

            onChange={(e)=>

              setCategory(e.target.value)

            }

          >


            <option value="All">
              All Category
            </option>


            <option value="Veg">
              Veg
            </option>


            <option value="Non-Veg">
              Non Veg
            </option>


          </select>


        </div>









        {/* Sort */}

        <div className="col-md-4 mb-2">


          <select

            className="form-select"

            value={sort}

            onChange={(e)=>

              setSort(e.target.value)

            }

          >


            <option value="low">

              Price: Low → High

            </option>



            <option value="high">

              Price: High → Low

            </option>


          </select>


        </div>






      </div>










      {/* Pizza Cards */}


      <div className="row">


        {

          filteredPizzas.length > 0 ?


          filteredPizzas.map((pizza)=>(


            <PizzaCard

              key={pizza._id}

              pizza={pizza}

            />


          ))



          :


          (

            <h4 className="text-center">

              No Pizza Found 😔

            </h4>

          )


        }


      </div>






    </div>

  );

}


export default Menu;