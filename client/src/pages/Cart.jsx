import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    totalPrice,
    totalItems,
    updateQuantity,
    updateSize,
    removeFromCart,
    clearUserCart,
  } = useCart();

  const deliveryCharge = 50;
  const grandTotal = totalPrice + deliveryCharge;

  // ===========================
  // Clear Cart
  // ===========================
  const handleClearCart = async () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear your cart?"
    );

    if (confirmClear) {
      await clearUserCart();
    }
  };

  // ===========================
  // Delete Modal
  // ===========================
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleRemove = (id) => {
    setSelectedItemId(id);
    setShowDeleteModal(true);
  };

  const confirmRemove = async () => {
    await removeFromCart(selectedItemId);
    setShowDeleteModal(false);
    setSelectedItemId(null);
  };

  const cancelRemove = () => {
    setShowDeleteModal(false);
    setSelectedItemId(null);
  };

  // ===========================
  // Empty Cart
  // ===========================
  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="card shadow border-dark p-5">
          <h1>🛒</h1>
          <h2 className="fw-bold">Your Cart is Empty</h2>
          <p className="text-muted">
            Looks like you haven't added any pizzas yet.
          </p>
          <Link to="/menu" className="btn btn-warning fw-bold px-4">
            Explore Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">🛒 My Cart ({totalItems} Items)</h2>

      <div className="row g-4">
        <div className="col-lg-8">
          {cart.map((item) => (
            <div
              key={item._id}
              className="card shadow border-dark mb-4"
              style={{ borderRadius: "15px" }}
            >
              <div className="row g-0">
                <div className="col-md-4 p-3">
                  <img
                    src={
                      item.custom
                        ? item.image
                        : item?.pizza?.image?.url ||
                          "https://via.placeholder.com/300x200"
                    }
                    alt="pizza"
                    className="img-fluid rounded"
                    style={{
                      height: "190px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className="col-md-8">
                  <div className="card-body">
                    <h4 className="fw-bold">
                      {item.custom ? item.name : item?.pizza?.name}
                    </h4>

                    {item.custom && (
                      <span className="badge bg-success mb-3">
                        🍕 Custom Pizza
                      </span>
                    )}

                    {/* Normal Pizza Size */}
                    {!item.custom && (
                      <>
                        <label className="fw-bold">Select Size</label>
                        <select
                          className="form-select mb-3"
                          value={item.size}
                          onChange={(e) =>
                            updateSize(item._id, e.target.value)
                          }
                        >
                          {item?.pizza?.sizes?.map((size) => (
                            <option key={size.size} value={size.size}>
                              {size.size} - ₹{size.price}
                            </option>
                          ))}
                        </select>
                      </>
                    )}

                    {/* Custom Pizza Details */}
                    {item.custom && (
                      <div className="mb-3">
                        <p>
                          <strong>Size :</strong> {item.size}
                        </p>
                        <p>
                          <strong>Base :</strong> {item.base?.name}
                        </p>
                        <p>
                          <strong>Sauce :</strong> {item.sauce?.name}
                        </p>
                        <p>
                          <strong>Cheese :</strong>
                        </p>
                        <ul>
                          {item.cheese?.length ? (
                            item.cheese.map((c, index) => (
                              <li key={index}>{c.name}</li>
                            ))
                          ) : (
                            <li>No Cheese</li>
                          )}
                        </ul>
                        <p>
                          <strong>Vegetables :</strong>
                        </p>
                        <ul>
                          {item.vegetables?.length ? (
                            item.vegetables.map((v, index) => (
                              <li key={index}>{v.name}</li>
                            ))
                          ) : (
                            <li>No Vegetables</li>
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Price */}
                    <h4 className="text-danger fw-bold">₹{item.price}</h4>

                    {/* Quantity */}
                    <div className="d-flex align-items-center gap-3 mt-3">
                      <button
                        className="btn btn-dark"
                        disabled={item.quantity <= 1}
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span className="fw-bold fs-5">{item.quantity}</span>
                      <button
                        className="btn btn-warning fw-bold"
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Item */}
                    <button
                      className="btn btn-outline-danger mt-3"
                      onClick={() => handleRemove(item._id)}
                    >
                      🗑 Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* =========================
            ORDER SUMMARY
        ========================= */}
        <div className="col-lg-4">
          <div
            className="card shadow border-dark sticky-top"
            style={{ top: "90px", borderRadius: "15px" }}
          >
            <div className="card-body p-4">
              <h3 className="fw-bold mb-4">Order Summary</h3>

              <div className="d-flex justify-content-between mb-3">
                <span>Items</span>
                <strong>{totalItems}</strong>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal</span>
                <strong>₹{totalPrice}</strong>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Delivery Charge</span>
                <strong>₹{deliveryCharge}</strong>
              </div>

              <hr />

              <div className="d-flex justify-content-between">
                <h5 className="fw-bold">Total</h5>
                <h5 className="text-danger fw-bold">₹{grandTotal}</h5>
              </div>

              {/* CLEAR CART BUTTON */}
              <button
                className="btn btn-outline-danger w-100 fw-bold mt-4"
                onClick={handleClearCart}
              >
                🗑 Clear Cart
              </button>

              <Link
                to="/checkout"
                className="btn btn-warning w-100 fw-bold mt-3"
              >
                Proceed To Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            background: "rgba(0,0,0,.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Remove Pizza</h5>
                <button className="btn-close" onClick={cancelRemove} />
              </div>
              <div className="modal-body text-center">
                <h2>🍕</h2>
                <h5>Remove this pizza?</h5>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cancelRemove}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={confirmRemove}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .card {
          transition: 0.3s ease;
        }

        .card:hover {
          transform: translateY(-3px);
        }

        .btn {
          border-radius: 8px;
        }

        ul {
          padding-left: 18px;
        }
      `}</style>
    </div>
  );
}

export default Cart;