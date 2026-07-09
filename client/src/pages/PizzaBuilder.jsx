import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { getInventoryByType } from "../services/inventoryService";
import { useCart } from "../context/CartContext";

function PizzaBuilder() {
  const { addCustomPizza } = useCart();

  // ===========================
  // Inventory States
  // ===========================
  const [bases, setBases] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [cheeses, setCheeses] = useState([]);
  const [vegetables, setVegetables] = useState([]);

  // ===========================
  // Selected Ingredients
  // ===========================
  const [size, setSize] = useState("Medium");
  const [selectedBase, setSelectedBase] = useState(null);
  const [selectedSauce, setSelectedSauce] = useState(null);
  const [selectedCheese, setSelectedCheese] = useState([]);
  const [selectedVeggies, setSelectedVeggies] = useState([]);
  const [loading, setLoading] = useState(false);

  // ===========================
  // Load Inventory
  // ===========================
  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      setLoading(true);

      const [baseData, sauceData, cheeseData, vegData] = await Promise.all([
        getInventoryByType("Base"),
        getInventoryByType("Sauce"),
        getInventoryByType("Cheese"),
        getInventoryByType("Vegetable"),
      ]);

      setBases(baseData || []);
      setSauces(sauceData || []);
      setCheeses(cheeseData || []);
      setVegetables(vegData || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load ingredients");
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // Cheese Toggle
  // ===========================
  const toggleCheese = (item) => {
    const exists = selectedCheese.some((c) => c._id === item._id);

    if (exists) {
      setSelectedCheese(selectedCheese.filter((c) => c._id !== item._id));
    } else {
      setSelectedCheese([...selectedCheese, item]);
    }
  };

  // ===========================
  // Vegetable Toggle
  // ===========================
  const toggleVeg = (item) => {
    const exists = selectedVeggies.some((v) => v._id === item._id);

    if (exists) {
      setSelectedVeggies(selectedVeggies.filter((v) => v._id !== item._id));
    } else {
      setSelectedVeggies([...selectedVeggies, item]);
    }
  };

  // ===========================
  // Price Calculation
  // ===========================
  const totalPrice = useMemo(() => {
    let total = 0;

    if (selectedBase) {
      total += selectedBase.price || 120;
    }

    if (selectedSauce) {
      total += selectedSauce.price || 30;
    }

    selectedCheese.forEach((item) => {
      total += item.price || 40;
    });

    selectedVeggies.forEach((item) => {
      total += item.price || 20;
    });

    if (size === "Medium") total *= 1.2;
    if (size === "Large") total *= 1.5;

    return Math.round(total);
  }, [selectedBase, selectedSauce, selectedCheese, selectedVeggies, size]);

  // ===========================
  // Add Custom Pizza
  // ===========================
  const handleAddToCart = async () => {
    if (!selectedBase) {
      return toast.warning("Select Pizza Base");
    }

    if (!selectedSauce) {
      return toast.warning("Select Sauce");
    }

    try {
      const pizza = {
        custom: true,
        name: "Custom Pizza",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
        size,
        quantity: 1,
        price: totalPrice,
        base: {
          inventoryId: selectedBase._id,
          name: selectedBase.name,
          price: selectedBase.price,
        },
        sauce: {
          inventoryId: selectedSauce._id,
          name: selectedSauce.name,
          price: selectedSauce.price,
        },
        cheese: selectedCheese.map((item) => ({
          inventoryId: item._id,
          name: item.name,
          price: item.price,
        })),
        vegetables: selectedVeggies.map((item) => ({
          inventoryId: item._id,
          name: item.name,
          price: item.price,
        })),
      };

      await addCustomPizza(pizza);
      toast.success("🍕 Custom Pizza Added");
    } catch (error) {
      console.log(error);
      toast.error("Unable to add pizza");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <h3>Loading Ingredients 🍕</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">🍕 Build Your Own Pizza</h1>
        <p className="text-muted">Choose ingredients and create your perfect pizza</p>
      </div>

      <div className="row g-4">
        {/* LEFT SECTION */}
        <div className="col-lg-8">
          {/* SIZE */}
          <div className="card shadow-sm mb-4">
            <div className="card-header fw-bold">🍕 Select Size</div>
            <div className="card-body">
              <div className="row g-3">
                {["Small", "Medium", "Large"].map((item) => (
                  <div className="col-md-4" key={item}>
                    <div
                      className={`p-3 border rounded text-center ${
                        size === item ? "bg-warning fw-bold" : ""
                      }`}
                      onClick={() => setSize(item)}
                      style={{ cursor: "pointer" }}
                    >
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BASE */}
          <div className="card shadow-sm mb-4">
            <div className="card-header fw-bold">🍞 Choose Base</div>
            <div className="card-body">
              <div className="row g-3">
                {bases.map((item) => (
                  <div className="col-md-6" key={item._id}>
                    <div
                      className={`ingredient-card ${
                        selectedBase?._id === item._id ? "active" : ""
                      }`}
                      onClick={() => setSelectedBase(item)}
                    >
                      <h6>{item.name}</h6>
                      <span>₹{item.price || 120}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SAUCE */}
          <div className="card shadow-sm mb-4">
            <div className="card-header fw-bold">🍅 Choose Sauce</div>
            <div className="card-body">
              <div className="row g-3">
                {sauces.map((item) => (
                  <div className="col-md-6" key={item._id}>
                    <div
                      className={`ingredient-card ${
                        selectedSauce?._id === item._id ? "active" : ""
                      }`}
                      onClick={() => setSelectedSauce(item)}
                    >
                      <h6>{item.name}</h6>
                      <span>₹{item.price || 30}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CHEESE */}
          <div className="card shadow-sm mb-4">
            <div className="card-header fw-bold">🧀 Choose Cheese</div>
            <div className="card-body">
              <div className="row g-3">
                {cheeses.map((item) => (
                  <div className="col-md-6" key={item._id}>
                    <div
                      className={`ingredient-card ${
                        selectedCheese.some((c) => c._id === item._id)
                          ? "active"
                          : ""
                      }`}
                      onClick={() => toggleCheese(item)}
                    >
                      <div className="d-flex justify-content-between">
                        <h6>{item.name}</h6>
                        <span>₹{item.price || 40}</span>
                      </div>
                      {selectedCheese.some((c) => c._id === item._id) && (
                        <small className="text-success">✓ Added</small>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* VEGETABLES */}
          <div className="card shadow-sm mb-4">
            <div className="card-header fw-bold">🥦 Choose Vegetables</div>
            <div className="card-body">
              <div className="row g-3">
                {vegetables.map((item) => (
                  <div className="col-md-6" key={item._id}>
                    <div
                      className={`ingredient-card ${
                        selectedVeggies.some((v) => v._id === item._id)
                          ? "active"
                          : ""
                      }`}
                      onClick={() => toggleVeg(item)}
                    >
                      <div className="d-flex justify-content-between">
                        <h6>{item.name}</h6>
                        <span>₹{item.price || 20}</span>
                      </div>
                      {selectedVeggies.some((v) => v._id === item._id) && (
                        <small className="text-success">✓ Added</small>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE SUMMARY */}
        <div className="col-lg-4">
          <div
            className="card shadow sticky-top"
            style={{ top: "90px" }}
          >
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">🍕 Pizza Preview</h5>
            </div>

            <div className="card-body">
              {/* Pizza Image */}
              <div className="text-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591"
                  alt="pizza"
                  className="rounded-circle shadow"
                  style={{
                    width: "170px",
                    height: "170px",
                    objectFit: "cover",
                  }}
                />
              </div>

              <h4 className="text-center fw-bold">Custom Pizza</h4>

              <hr />

              {/* Size */}
              <div className="d-flex justify-content-between mb-2">
                <span>Size</span>
                <strong>{size}</strong>
              </div>

              {/* Base */}
              <div className="d-flex justify-content-between mb-2">
                <span>Base</span>
                <strong>{selectedBase?.name || "-"}</strong>
              </div>

              {/* Sauce */}
              <div className="d-flex justify-content-between mb-2">
                <span>Sauce</span>
                <strong>{selectedSauce?.name || "-"}</strong>
              </div>

              {/* Cheese */}
              <div className="mt-3">
                <strong>Cheese</strong>
                {selectedCheese.length === 0 ? (
                  <p className="text-muted">No cheese selected</p>
                ) : (
                  <ul>
                    {selectedCheese.map((item) => (
                      <li key={item._id}>{item.name}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Vegetables */}
              <div className="mt-3">
                <strong>Vegetables</strong>
                {selectedVeggies.length === 0 ? (
                  <p className="text-muted">No vegetables selected</p>
                ) : (
                  <ul>
                    {selectedVeggies.map((item) => (
                      <li key={item._id}>{item.name}</li>
                    ))}
                  </ul>
                )}
              </div>

              <hr />

              <div className="text-center">
                <small className="text-muted">Total Price</small>
                <h2 className="text-success fw-bold">₹ {totalPrice}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ADD TO CART BUTTON */}
      <div className="row mt-4">
        <div className="col-12">
          <button
            className="btn btn-success w-100 py-3 fw-bold"
            onClick={handleAddToCart}
          >
            🛒 Add Custom Pizza To Cart
          </button>
        </div>
      </div>

      {/* CUSTOM CSS */}
      <style>{`
        .ingredient-card {
          padding: 18px;
          border: 2px solid #eee;
          border-radius: 15px;
          cursor: pointer;
          transition: 0.3s ease;
          background: white;
        }

        .ingredient-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
        }

        .ingredient-card.active {
          border-color: #ffc107;
          background: #fff8dd;
          box-shadow: 0 5px 15px rgba(255, 193, 7, 0.35);
        }

        .card {
          border-radius: 18px;
          overflow: hidden;
        }

        .card-header {
          padding: 15px;
          font-size: 18px;
        }

        .btn {
          border-radius: 12px;
        }

        ul {
          padding-left: 20px;
        }

        .sticky-top {
          z-index: 10;
        }

        @media (max-width: 768px) {
          .ingredient-card {
            padding: 14px;
          }
        }
      `}</style>
    </div>
  );
}

export default PizzaBuilder;