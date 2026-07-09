import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllPizzas,
  deletePizza,
} from "../services/pizzaService";
import { toast } from "react-toastify";

import Loader from "../components/Loader";
import ButtonLoader from "../components/ButtonLoader";

function ManagePizzas() {

  const [pizzas, setPizzas] = useState([]);

  const [loading, setLoading] = useState(true);

  const [deleteLoading, setDeleteLoading] =
    useState(null);

  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [availabilityFilter, setAvailabilityFilter] =
    useState("All");

  useEffect(() => {
    fetchPizzas();
  }, []);

  // Fetch All Pizzas

  const fetchPizzas = async () => {

    setLoading(true);

    try {

      const res = await getAllPizzas();

      setPizzas(res.pizzas);

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load pizzas"
      );

    } finally {

      setLoading(false);

    }

  };

  // Delete Pizza

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this pizza?"
    );

    if (!confirmDelete) return;

    setDeleteLoading(id);

    try {

      const res = await deletePizza(id);

      toast.success(
        res.message ||
          "Pizza Deleted Successfully"
      );

      fetchPizzas();

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Delete Failed"
      );

    } finally {

      setDeleteLoading(null);

    }

  };

  // Filters

  const filteredPizzas = pizzas.filter((pizza) => {

    const matchSearch = pizza.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      categoryFilter === "All" ||
      pizza.category === categoryFilter;

    const matchAvailability =
      availabilityFilter === "All" ||
      (availabilityFilter === "Available" &&
        pizza.available) ||
      (availabilityFilter === "Unavailable" &&
        !pizza.available);

    return (
      matchSearch &&
      matchCategory &&
      matchAvailability
    );

  });

  // Loader

  if (loading) {

    return (
      <Loader text="Loading Pizzas..." />
    );

  }

  return (

    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>🍕 Manage Pizzas</h2>

        <Link
          to="/admin/add-pizza"
          className="btn btn-success"
        >
          ➕ Add Pizza
        </Link>

      </div>

      {/* Filters */}

      <div className="row g-3 mb-4">

        <div className="col-md-4">

          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search Pizza..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <div className="col-md-4">

          <select
            className="form-select"
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value)
            }
          >

            <option value="All">
              All Categories
            </option>

            <option value="Veg">
              Veg
            </option>

            <option value="Non-Veg">
              Non-Veg
            </option>

          </select>

        </div>

        <div className="col-md-4">

          <select
            className="form-select"
            value={availabilityFilter}
            onChange={(e) =>
              setAvailabilityFilter(
                e.target.value
              )
            }
          >

            <option value="All">
              All Availability
            </option>

            <option value="Available">
              Available
            </option>

            <option value="Unavailable">
              Unavailable
            </option>

          </select>

        </div>

      </div>

      {/* Table */}

      <div className="table-responsive">

        <table className="table table-bordered table-hover align-middle">

          <thead className="table-dark text-center">

            <tr>

              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Small</th>
              <th>Medium</th>
              <th>Large</th>
              <th>Type</th>
              <th>Status</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredPizzas.length > 0 ? (

              filteredPizzas.map((pizza) => (

                <tr key={pizza._id}>

                  <td className="text-center">

                    <img
                      src={pizza.image.url}
                      alt={pizza.name}
                      width="80"
                      height="80"
                      style={{
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />

                  </td>

                  <td>{pizza.name}</td>

                  <td>{pizza.category}</td>

                  <td>
                    ₹
                    {
                      pizza.sizes.find(
                        (s) =>
                          s.size === "Small"
                      )?.price
                    }
                  </td>

                  <td>
                    ₹
                    {
                      pizza.sizes.find(
                        (s) =>
                          s.size === "Medium"
                      )?.price
                    }
                  </td>

                  <td>
                    ₹
                    {
                      pizza.sizes.find(
                        (s) =>
                          s.size === "Large"
                      )?.price
                    }
                  </td>

                  <td>

                    {pizza.isVeg ? (

                      <span className="badge bg-success">
                        🟢 Veg
                      </span>

                    ) : (

                      <span className="badge bg-danger">
                        🔴 Non-Veg
                      </span>

                    )}

                  </td>

                  <td>

                    {pizza.available ? (

                      <span className="badge bg-primary">
                        Available
                      </span>

                    ) : (

                      <span className="badge bg-secondary">
                        Unavailable
                      </span>

                    )}

                  </td>

                  <td>

                    <Link
                      to={`/admin/edit-pizza/${pizza._id}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      ✏ Edit
                    </Link>

                    <button
                      className="btn btn-danger btn-sm"
                      disabled={
                        deleteLoading === pizza._id
                      }
                      onClick={() =>
                        handleDelete(
                          pizza._id
                        )
                      }
                    >

                      {deleteLoading ===
                      pizza._id ? (
                        <ButtonLoader text="Deleting..." />
                      ) : (
                        "🗑 Delete"
                      )}

                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="9"
                  className="text-center py-5"
                >
                  🍕 No Pizza Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default ManagePizzas;