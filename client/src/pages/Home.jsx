import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaStar, FaClock, FaUtensils } from "react-icons/fa";

import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import PizzaCard from "../components/PizzaCard";

import { getAllPizzas } from "../services/pizzaService";

function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllPizzas();

      // safety check (important)
      if (data && data.pizzas) {
        setPizzas(data.pizzas);
      } else {
        setPizzas([]);
      }
    } catch (error) {
      console.error("Error fetching pizzas:", error);
      setError("Failed to load pizzas. Please try again later.");
      setPizzas([]); // fallback
    } finally {
      setLoading(false);
    }
  };

  // Get top 4 pizzas for featured section
  const featuredPizzas = pizzas.slice(0, 4);

  return (
    <>
      <Hero />
      <SearchBar />

      {/* Popular Pizzas Section */}
      <section className="container py-5">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold text-dark mb-1">
              <FaStar className="text-warning me-2" />
              Popular Pizzas
            </h3>
            <p className="text-dark-50">Our most loved and ordered pizzas</p>
          </div>
          <Link to="/menu" className="text-dark btn btn-outline-warning">
            View All <FaArrowRight className="text-dark ms-2" />
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-white-50 mt-3">Loading delicious pizzas...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="alert alert-danger text-center py-4" role="alert">
            <FaUtensils className="me-2" />
            {error}
            <button 
              className="btn btn-outline-danger ms-3"
              onClick={fetchPizzas}
            >
              Retry
            </button>
          </div>
        )}

        {/* Pizzas Grid */}
        {!loading && !error && (
          <>
            {pizzas.length > 0 ? (
              <div className="row g-4">
                {featuredPizzas.map((pizza) => (
                  <PizzaCard key={pizza._id} pizza={pizza} />
                ))}
              </div>
            ) : (
              <div className="text-center py-5">
                <FaUtensils className="text-warning" size={48} />
                <h4 className="text-white mt-3">No pizzas available</h4>
                <p className="text-white-50">Check back later for our delicious offerings!</p>
              </div>
            )}
          </>
        )}
      </section>

      {/* Features Section */}
      <section className="container py-4 mb-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card bg-dark border-secondary h-100 text-center p-4">
              <FaUtensils className="text-warning mx-auto mb-3" size={36} />
              <h5 className="text-white">Fresh Ingredients</h5>
              <p className="text-white-50 small">
                Made with 100% fresh, high-quality ingredients daily
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-dark border-secondary h-100 text-center p-4">
              <FaClock className="text-warning mx-auto mb-3" size={36} />
              <h5 className="text-white">Fast Delivery</h5>
              <p className="text-white-50 small">
                Hot and fresh pizza delivered to your door in 30 minutes
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-dark border-secondary h-100 text-center p-4">
              <FaStar className="text-warning mx-auto mb-3" size={36} />
              <h5 className="text-white">Best Quality</h5>
              <p className="text-white-50 small">
                Award-winning recipes and exceptional taste guaranteed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="container mb-5">
      <div className="card bg-warning bg-opacity-10 border-warning border-opacity-25 p-5 text-center">

        <h3 className="text-dark fw-bold mb-3">
          Craving Something Delicious?
        </h3>

        <p className="text-dark mb-4">
          Browse our full menu and order your favorite pizza today!
        </p>

        <div>
          <Link 
            to="/menu" 
            className="btn btn-warning btn-lg px-5 fw-bold"
          >
            Order Now <FaArrowRight className="ms-2" />
          </Link>
        </div>

      </div>
    </section>
      <style>{`
        .card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: default;
        }
        
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(255, 193, 7, 0.1);
        }
        
        .btn-outline-warning:hover {
          color: #212529;
        }
        
        .bg-opacity-10 {
          --bs-bg-opacity: 0.1;
        }
        
        .border-opacity-25 {
          --bs-border-opacity: 0.25;
        }
        
        .spinner-border {
          width: 3rem;
          height: 3rem;
        }
        
        .alert {
          background-color: rgba(220, 53, 69, 0.1);
          border-color: rgba(220, 53, 69, 0.3);
          color: #ff6b6b;
        }
        
        .alert .btn-outline-danger {
          color: #ff6b6b;
          border-color: #ff6b6b;
        }
        
        .alert .btn-outline-danger:hover {
          background-color: #dc3545;
          color: #fff;
        }
      `}</style>
    </>
  );
}

export default Home;