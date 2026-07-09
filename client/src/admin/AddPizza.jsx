import { useState } from "react";
import { addPizza } from "../services/pizzaService";
import { toast } from "react-toastify";
import ButtonLoader from "../components/ButtonLoader";

function AddPizza() {
  const [loading, setLoading] = useState(false);

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

  const [preview, setPreview] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

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

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      return toast.warning("Please select a pizza image.");
    }

    try {
      setLoading(true);

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

      toast.success(
        res.message || "🍕 Pizza Added Successfully"
      );

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

      setPreview("");

      document.getElementById("pizzaImage").value = "";

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to Add Pizza"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">

      <div className="card shadow-lg border-0">

        <div className="card-header bg-warning">

          <h3 className="mb-0 fw-bold text-center">
            🍕 Add New Pizza
          </h3>

        </div>

        <div className="card-body p-4">

          <form onSubmit={handleSubmit}>

            {/* Pizza Name */}

            <div className="mb-3">

              <label className="form-label fw-semibold">
                Pizza Name
              </label>

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

              <label className="form-label fw-semibold">
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

              <label className="form-label fw-semibold">
                Category
              </label>

              <select
                className="form-select"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Category
                </option>

                <option value="Veg">
                  Veg
                </option>

                <option value="Non-Veg">
                  Non-Veg
                </option>

              </select>

            </div>

            {/* Prices */}

            <div className="row">

              <div className="col-md-4 mb-3">

                <label className="form-label fw-semibold">
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

                <label className="form-label fw-semibold">
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

                <label className="form-label fw-semibold">
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

              <label className="form-label fw-semibold">
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

            {/* Preview */}

            {preview && (

              <div className="text-center mb-4">

                <img
                  src={preview}
                  alt="Preview"
                  width="220"
                  className="img-thumbnail shadow"
                  style={{
                    borderRadius: "15px",
                    objectFit: "cover",
                  }}
                />

              </div>

            )}

            {/* Veg */}

            <div className="form-check mb-4">

              <input
                className="form-check-input"
                type="checkbox"
                name="isVeg"
                checked={formData.isVeg}
                onChange={handleChange}
              />

              <label className="form-check-label fw-semibold">
                Veg Pizza
              </label>

            </div>

            <button
              type="submit"
              className="btn btn-warning w-100 fw-bold"
              disabled={loading}
            >
              {loading ? (
                <ButtonLoader text="Adding Pizza..." />
              ) : (
                "🍕 Add Pizza"
              )}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AddPizza;