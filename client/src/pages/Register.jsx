import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "COD",
  });

  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await registerUser(formData);

      if (data.success) {
        setEmailSent(true);

        toast.success(
          "🎉 Registration Successful! Please verify your email before logging in."
        );

        setFormData({
          name: "",
          email: "",
          password: "",
          phone: "",
          address: "",
          city: "",
          pincode: "",
          paymentMethod: "COD",
        });

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };
    return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7 col-md-9">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-5">

              <h2 className="text-center fw-bold mb-2">
                🍕 Create Account
              </h2>

              <p className="text-center text-muted mb-4">
                Register to start ordering your favourite pizzas.
              </p>

              {emailSent && (
                <div className="alert alert-success border-start border-5 border-success shadow-sm">

                  <h5 className="fw-bold mb-3">
                    📧 Verification Email Sent
                  </h5>

                  <p>
                    Your account has been created successfully.
                  </p>

                  <ul className="mb-3">
                    <li>Check your <strong>Inbox</strong>.</li>
                    <li>If you don't find it, check the <strong>Spam</strong> folder.</li>
                    <li>Click the verification link sent to your email.</li>
                    <li>After verification, you can login.</li>
                  </ul>

                  <div className="d-grid">
                    <Link
                      to="/login"
                      className="btn btn-success"
                    >
                      Go to Login
                    </Link>
                  </div>

                </div>
              )}

              {!emailSent && (
                <form onSubmit={handleSubmit}>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Full Name
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

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Email
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Password
                    </label>

                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      minLength={6}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      pattern="[0-9]{10}"
                      maxLength={10}
                      placeholder="9876543210"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Address
                    </label>

                    <textarea
                      rows="3"
                      className="form-control"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="row">

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        City
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        Pincode
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        pattern="[0-9]{6}"
                        maxLength={6}
                      />
                    </div>

                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Preferred Payment Method
                    </label>

                    <select
                      className="form-select"
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                    >
                      <option value="COD">
                        Cash On Delivery
                      </option>

                      <option value="UPI">
                        UPI
                      </option>

                      <option value="CARD">
                        Card
                      </option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-warning w-100 fw-bold"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>

                </form>
              )}

              {!emailSent && (
                <div className="text-center mt-4">

                  Already have an account?

                  <Link
                    to="/login"
                    className="ms-2 fw-bold text-decoration-none"
                  >
                    Login
                  </Link>

                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;