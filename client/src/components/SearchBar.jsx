import { FaSearch, FaTimes } from "react-icons/fa";

function SearchBar({ search, setSearch }) {

  return (

    <section className="py-5 bg-light">

      <div className="container">

        <h2 className="fw-bold mb-4 text-center">
          Find Your Favorite Pizza
        </h2>

        <div className="position-relative">

          <FaSearch
            className="position-absolute"
            style={{
              left: "18px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#888",
            }}
          />

          <input
            type="text"
            className="form-control form-control-lg ps-5 pe-5"
            placeholder="Search pizzas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (

            <button
              type="button"
              className="btn btn-link position-absolute"
              style={{
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                textDecoration: "none",
              }}
              onClick={() => setSearch("")}
            >
              <FaTimes className="text-danger" />
            </button>

          )}

        </div>

      </div>

    </section>

  );

}

export default SearchBar; 