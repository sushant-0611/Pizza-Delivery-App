import { Link } from "react-router-dom";
import { FaArrowRight, FaUserPlus, FaStar, FaTruck, FaClock } from "react-icons/fa";

function Hero() {
  return (
    <section
      className="text-white d-flex align-items-center"
      style={{
        minHeight: "90vh",
        background:
          "linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=80') center/cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container">
        {/* Badge */}
        <span className="badge bg-warning text-dark px-4 py-2 mb-4 rounded-pill fs-6">
          <FaTruck className="me-2" />
          Fresh • Hot • Fast Delivery
        </span>

        {/* Heading */}
        <h1 className="display-1 fw-bold mb-4">
          Delicious Pizza
          <br />
          <span className="text-warning">Delivered</span> To Your Door
        </h1>

        {/* Description */}
        <p className="lead text-white-50 mb-4" style={{ maxWidth: "550px", fontSize: "1.25rem" }}>
          Order your favorite pizzas with fresh ingredients,
          exciting offers, and lightning-fast delivery.
        </p>

        {/* CTA Buttons */}
        <div className="d-flex gap-3 flex-wrap mb-5">
          <Link to="/menu" className="btn btn-warning btn-lg px-5 py-3 rounded-pill fw-bold">
            Order Now
            <FaArrowRight className="ms-2" />
          </Link>
        </div>

        {/* Stats */}
        <div className="d-flex flex-wrap gap-4">
          <div>
            <div className="d-flex align-items-center">
              <FaStar className="text-warning me-2" />
              <span className="fw-bold text-white h4 mb-0">4.9</span>
            </div>
            <small className="text-white-50">Customer Rating</small>
          </div>
          <div>
            <div className="d-flex align-items-center">
              <FaClock className="text-warning me-2" />
              <span className="fw-bold text-white h4 mb-0">30</span>
              <span className="text-white-50 ms-1">min</span>
            </div>
            <small className="text-white-50">Avg Delivery Time</small>
          </div>
          <div>
            <div className="d-flex align-items-center">
              <FaTruck className="text-warning me-2" />
              <span className="fw-bold text-white h4 mb-0">1000+</span>
            </div>
            <small className="text-white-50">Happy Customers</small>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;