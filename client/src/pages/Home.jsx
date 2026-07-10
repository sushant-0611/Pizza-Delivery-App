import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaStar,
  FaClock,
  FaUtensils,
} from "react-icons/fa";

import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import PizzaCard from "../components/PizzaCard";

import { getAllPizzas } from "../services/pizzaService";

function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [filteredPizzas, setFilteredPizzas] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPizzas();
  }, []);

  useEffect(() => {
    filterPizzas();
  }, [search, pizzas]);

  const fetchPizzas = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getAllPizzas();

      if (data.success) {
        setPizzas(data.pizzas);
        setFilteredPizzas(data.pizzas);
      } else {
        setPizzas([]);
        setFilteredPizzas([]);
      }
    } catch (error) {
      console.log(error);

      setError("Failed to load pizzas.");

      setPizzas([]);
      setFilteredPizzas([]);
    } finally {
      setLoading(false);
    }
  };

  const filterPizzas = () => {
    if (!search.trim()) {
      setFilteredPizzas(pizzas);
      return;
    }

    const filtered = pizzas.filter((pizza) =>
      pizza.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredPizzas(filtered);
  };

  const featuredPizzas = filteredPizzas.slice(0, 4);

  return (
    <>
      <Hero />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <section className="container py-5">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>

            <h3 className="fw-bold">

              <FaStar className="text-warning me-2" />

              Popular Pizzas

            </h3>

            <p className="text-muted">

              Our most loved pizzas

            </p>

          </div>

          <Link
            to="/menu"
            className="btn btn-outline-warning"
          >
            View All
            <FaArrowRight className="ms-2" />
          </Link>

        </div>
                {/* Loading */}

        {loading && (
          <div className="text-center py-5">

            <div
              className="spinner-border text-warning"
              role="status"
            >
              <span className="visually-hidden">
                Loading...
              </span>
            </div>

            <p className="mt-3">
              Loading pizzas...
            </p>

          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div className="alert alert-danger text-center">

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

        {/* Pizza Grid */}

        {!loading && !error && (

          <>
            {featuredPizzas.length > 0 ? (

              <div className="row">

                {featuredPizzas.map((pizza) => (

                  <PizzaCard
                    key={pizza._id}
                    pizza={pizza}
                  />

                ))}

              </div>

            ) : (

              <div className="text-center py-5">

                <FaUtensils
                  size={50}
                  className="text-warning"
                />

                <h4 className="mt-3">
                  No Pizza Found
                </h4>

                <p className="text-muted">
                  Try searching another pizza.
                </p>

              </div>

            )}
          </>

        )}

      </section>

      {/* Features */}

      <section className="container py-4 mb-5">

        <div className="row">

          <div className="col-md-4 mb-3">

            <div className="card h-100 shadow text-center p-4">

              <FaUtensils
                className="text-warning mx-auto mb-3"
                size={35}
              />

              <h5>Fresh Ingredients</h5>

              <p className="text-muted">

                Prepared using fresh vegetables,
                premium cheese and quality ingredients.

              </p>

            </div>

          </div>

          <div className="col-md-4 mb-3">

            <div className="card h-100 shadow text-center p-4">

              <FaClock
                className="text-warning mx-auto mb-3"
                size={35}
              />

              <h5>30 Min Delivery</h5>

              <p className="text-muted">

                Fast delivery with live order tracking.

              </p>

            </div>

          </div>

          <div className="col-md-4 mb-3">

            <div className="card h-100 shadow text-center p-4">

              <FaStar
                className="text-warning mx-auto mb-3"
                size={35}
              />

              <h5>Best Quality</h5>

              <p className="text-muted">

                Loved by hundreds of happy customers.

              </p>

            </div>

          </div>

        </div>

      </section>
            {/* CTA Section */}

      <section className="container mb-5">

        <div className="card border-warning shadow-lg p-5 text-center">

          <h2 className="fw-bold mb-3">
            Hungry?
          </h2>

          <p className="text-muted mb-4">
            Explore our delicious menu and order your
            favourite pizza now.
          </p>

          <div>

            <Link
              to="/menu"
              className="btn btn-warning btn-lg px-5 fw-bold"
            >
              Order Now

              <FaArrowRight className="ms-2" />

            </Link>

          </div>

        </div>

      </section>

      <style>{`

        .card{
          transition:0.3s;
        }

        .card:hover{
          transform:translateY(-5px);
        }

        .btn-outline-warning:hover{
          color:#fff;
        }

      `}</style>

    </>
  );

}

export default Home;