import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaEnvelope,
  FaUserTag,
  FaSignOutAlt,
  FaShoppingBag,
  FaMapMarkerAlt,
  FaPhone,
  FaCreditCard,
  FaEdit,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <div className="card shadow p-5">
          <h3>Please Login First</h3>
          <button
            className="btn btn-warning mt-3"
            onClick={() => navigate("/login")}
          >
            Go To Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow border-0">
            {/* Header */}
            <div className="card-header bg-warning text-center py-4">
              <FaUserCircle size={90} className="text-dark" />
              <h3 className="fw-bold mt-3 mb-0">My Profile</h3>
            </div>

            <div className="card-body p-4">
              {/* Account Details */}
              <div className="card shadow-sm mb-4 border-0">
                <div className="card-header bg-dark text-white">
                  <h5 className="mb-0">👤 Account Details</h5>
                </div>
                <div className="card-body">
                  <p className="mb-3">
                    <FaUserCircle className="me-2 text-warning" />
                    <b>Name:</b> {user.name || "User"}
                  </p>
                  <p className="mb-3">
                    <FaEnvelope className="me-2 text-warning" />
                    <b>Email:</b> {user.email}
                  </p>
                  <p className="mb-0">
                    <FaUserTag className="me-2 text-warning" />
                    <b>Role:</b> {user.role || "User"}
                  </p>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="card shadow-sm mb-4 border-0">
                <div className="card-header bg-dark text-white">
                  <h5 className="mb-0">📍 Delivery Details</h5>
                </div>
                <div className="card-body">
                  <p className="mb-3">
                    <FaPhone className="me-2 text-success" />
                    <b>Phone:</b> {user.phone || "Not Added"}
                  </p>
                  <p className="mb-3">
                    <FaMapMarkerAlt className="me-2 text-danger" />
                    <b>Address:</b> {user.address || "Not Added"}
                  </p>
                  <p className="mb-0">
                    <FaMapMarkerAlt className="me-2 text-primary" />
                    <b>City:</b> {user.city || "Not Added"}
                  </p>
                </div>
              </div>

              {/* Payment Details */}
              <div className="card shadow-sm mb-4 border-0">
                <div className="card-header bg-dark text-white">
                  <h5 className="mb-0">💳 Payment Details</h5>
                </div>
                <div className="card-body">
                  <p className="mb-3">
                    <FaCreditCard className="me-2 text-primary" />
                    <b>Payment Method:</b>{" "}
                    {user.paymentMethod || "Cash On Delivery"}
                  </p>
                  <p className="mb-0">
                    <b>Status:</b> Active
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <button
                className="btn btn-warning w-100 mb-3 fw-bold"
                onClick={() => navigate("/edit-profile")}
              >
                <FaEdit className="me-2" />
                Edit Details
              </button>

              <button
                className="btn btn-outline-primary w-100 mb-3 fw-bold"
                onClick={() => navigate("/my-orders")}
              >
                <FaShoppingBag className="me-2" />
                My Orders
              </button>

              <button
                className="btn btn-danger w-100 fw-bold"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="me-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;