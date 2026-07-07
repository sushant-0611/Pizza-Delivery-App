import { useState } from "react";
import { addPizza } from "../services/pizzaService";
import { toast } from "react-toastify";

function AddPizza() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    isVeg: true,
    smallPrice: "",
    mediumPrice: "",
    largePrice: "",
    image: null,
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    }));
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("isVeg", formData.isVeg);

      data.append("smallPrice", formData.smallPrice);
      data.append("mediumPrice", formData.mediumPrice);
      data.append("largePrice", formData.largePrice);

      data.append("image", formData.image);

      const res = await addPizza(data);

      toast.success(res.message);

      // Reset Form
      setFormData({
        name: "",
        description: "",
        category: "",
        isVeg: true,
        smallPrice: "",
        mediumPrice: "",
        largePrice: "",
        image: null,
      });

      // Reset file input
      document.getElementById("pizzaImage").value = "";

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to Add Pizza"
      );
    }
  };

  return (
    <div className="container mt-4">

      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          🍕 Add New Pizza
        </h2>

        <form onSubmit={handleSubmit}>

          {/* Pizza Name */}

          <div className="mb-3">
            <label className="form-label">Pizza Name</label>

            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}

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

          {/* Category */}

          <div className="mb-3">

            <label className="form-label">
              Category
            </label>

            <select
              className="form-select"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>

          </div>

          {/* Prices */}

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

          {/* Image */}

          <div className="mb-3">

            <label className="form-label">
              Pizza Image
            </label>

            <input
              id="pizzaImage"
              type="file"
              className="form-control"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
            />

          </div>

          {/* Veg */}

          <div className="form-check mb-3">

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

          <button
            type="submit"
            className="btn btn-warning w-100 fw-bold"
          >
            Add Pizza
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddPizza;
