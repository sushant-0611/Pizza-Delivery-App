import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getPizzaById,
  updatePizza,
} from "../services/pizzaService";
import { toast } from "react-toastify";

import Loader from "../components/Loader";
import ButtonLoader from "../components/ButtonLoader";

function EditPizza() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    isVeg: true,
    available: true,
    smallPrice: "",
    mediumPrice: "",
    largePrice: "",
    image: null,
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetchPizza();
  }, []);

  const fetchPizza = async () => {
    try {
      setLoading(true);

      const res = await getPizzaById(id);

      const pizza = res.pizza;

      setFormData({
        name: pizza.name,
        description: pizza.description,
        category: pizza.category,
        isVeg: pizza.isVeg,
        available: pizza.available,
        smallPrice:
          pizza.sizes.find((s) => s.size === "Small")?.price || "",
        mediumPrice:
          pizza.sizes.find((s) => s.size === "Medium")?.price || "",
        largePrice:
          pizza.sizes.find((s) => s.size === "Large")?.price || "",
        image: null,
      });

      setPreview(pizza.image.url);

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load pizza"
      );

    } finally {

      setLoading(false);

    }
  };

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
      files,
    } = e.target;

    if (type === "file") {

      const file = files[0];

      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      if (file) {
        setPreview(URL.createObjectURL(file));
      }

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setUpdateLoading(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("isVeg", formData.isVeg);
      data.append("available", formData.available);

      data.append("smallPrice", formData.smallPrice);
      data.append("mediumPrice", formData.mediumPrice);
      data.append("largePrice", formData.largePrice);

      if (formData.image) {
        data.append("image", formData.image);
      }

      const res = await updatePizza(id, data);

      toast.success(
        res.message || "Pizza Updated Successfully"
      );

      navigate("/admin/manage-pizzas");

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update pizza"
      );

    } finally {

      setUpdateLoading(false);

    }
  };

  if (loading) {
    return (
      <Loader text="Loading Pizza..." />
    );
  }

  return (
    <div className="container mt-4">

      <div className="card shadow-lg border-0 p-4">

        <h2 className="mb-4 text-center">
          ✏ Edit Pizza
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <label className="form-label">
              Pizza Name
            </label>

            <input
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              Description
            </label>

            <textarea
              className="form-control"
              rows="3"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              Category
            </label>

            <select
              className="form-select"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >

              <option value="Veg">
                Veg
              </option>

              <option value="Non-Veg">
                Non-Veg
              </option>

            </select>

          </div>

          <div className="row">

            <div className="col-md-4 mb-3">

              <label className="form-label">
                Small Price
              </label>

              <input
                type="number"
                className="form-control"
                name="smallPrice"
                value={formData.smallPrice}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-4 mb-3">

              <label className="form-label">
                Medium Price
              </label>

              <input
                type="number"
                className="form-control"
                name="mediumPrice"
                value={formData.mediumPrice}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-4 mb-3">

              <label className="form-label">
                Large Price
              </label>

              <input
                type="number"
                className="form-control"
                name="largePrice"
                value={formData.largePrice}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          <div className="form-check">

            <input
              className="form-check-input"
              type="checkbox"
              name="isVeg"
              checked={formData.isVeg}
              onChange={handleChange}
            />

            <label className="form-check-label">
              Veg Pizza
            </label>

          </div>

          <div className="form-check mt-2">

            <input
              className="form-check-input"
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
            />

            <label className="form-check-label">
              Available
            </label>

          </div>

          <div className="mt-4">

            <label className="form-label">
              Current / New Image
            </label>

            <div className="mb-3">

              <img
                src={preview}
                alt="Pizza Preview"
                width="200"
                className="img-thumbnail shadow"
              />

            </div>

            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleChange}
            />

          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mt-4"
            disabled={updateLoading}
          >

            {updateLoading ? (
              <ButtonLoader text="Updating Pizza..." />
            ) : (
              "💾 Update Pizza"
            )}

          </button>

        </form>

      </div>

    </div>
  );
}

export default EditPizza;