import {
  FaPizzaSlice,
  FaTruck,
  FaLeaf,
  FaHeart
} from "react-icons/fa";


function About() {

  return (

    <div 
      className="container py-5 about-page"
      style={{color:"#000"}}
    >


      {/* Hero Section */}

      <div className="text-center mb-5">


        <h1
          className="fw-bold mb-3"
          style={{color:"#000"}}
        >
          About Our Pizza App
        </h1>



        <p
          className="lead"
          style={{color:"#000"}}
        >
          Fresh pizzas delivered hot and fast at your doorstep.
        </p>


      </div>






      {/* Main Cards */}

      <div className="row g-4">



        {/* Who We Are */}

        <div className="col-md-6">


          <div 
            className="card h-100 shadow border-dark"
            style={{
              background:"#fff",
              borderRadius:"15px"
            }}
          >


            <div className="card-body p-4">


              <h3 
                className="fw-bold"
                style={{color:"#000"}}
              >
                Who We Are?
              </h3>



              <p
                className="mt-3"
                style={{color:"#000"}}
              >

                We are a modern pizza delivery platform
                created to provide delicious, fresh and
                high-quality pizzas with a smooth online
                ordering experience.

                <br/><br/>

                Our mission is to deliver happiness with
                every slice.

              </p>



            </div>


          </div>


        </div>









        {/* Why Choose Us */}

        <div className="col-md-6">


          <div 
            className="card h-100 shadow border-dark"
            style={{
              background:"#fff",
              borderRadius:"15px"
            }}
          >


            <div className="card-body p-4">


              <h3
                className="fw-bold"
                style={{color:"#000"}}
              >
                Why Choose Us?
              </h3>




              <ul className=" mt-4">



                <li
                  className="mb-3"
                  style={{color:"#000"}}
                >

                  <FaPizzaSlice 
                    className="text-warning me-2"
                  />

                  Freshly Prepared Pizzas

                </li>





                <li
                  className="mb-3"
                  style={{color:"#000"}}
                >

                  <FaTruck 
                    className="text-warning me-2"
                  />

                  Fast & Reliable Delivery

                </li>





                <li
                  className="mb-3"
                  style={{color:"#000"}}
                >

                  <FaLeaf 
                    className="text-warning me-2"
                  />

                  Quality Ingredients

                </li>





                <li
                  className="mb-3"
                  style={{color:"#000"}}
                >

                  <FaHeart 
                    className="text-danger me-2"
                  />

                  Made With Love

                </li>



              </ul>



            </div>


          </div>


        </div>


      </div>









      {/* Statistics */}

      <div className="row text-center mt-5 g-4">



        <div className="col-md-4">

          <div
            className="card shadow border-dark p-4 h-100"
            style={{
              background:"#fff",
              borderRadius:"15px"
            }}
          >

            <h2 className="fw-bold text-warning">
              1000+
            </h2>


            <p 
              className="fw-semibold"
              style={{color:"#000"}}
            >
              Happy Customers
            </p>


          </div>

        </div>







        <div className="col-md-4">

          <div
            className="card shadow border-dark p-4 h-100"
            style={{
              background:"#fff",
              borderRadius:"15px"
            }}
          >

            <h2 className="fw-bold text-warning">
              50+
            </h2>


            <p
              className="fw-semibold"
              style={{color:"#000"}}
            >
              Pizza Varieties
            </p>


          </div>

        </div>







        <div className="col-md-4">

          <div
            className="card shadow border-dark p-4 h-100"
            style={{
              background:"#fff",
              borderRadius:"15px"
            }}
          >

            <h2 className="fw-bold text-warning">
              24/7
            </h2>


            <p
              className="fw-semibold"
              style={{color:"#000"}}
            >
              Customer Support
            </p>


          </div>

        </div>



      </div>






      <style>{`

        .about-page .card {

          transition:0.3s ease;

        }


        .about-page .card:hover {

          transform:translateY(-5px);

          box-shadow:0 10px 25px rgba(0,0,0,0.25)!important;

        }


      `}</style>




    </div>

  );

}


export default About;