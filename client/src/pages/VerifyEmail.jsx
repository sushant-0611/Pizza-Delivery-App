import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyEmail } from "../services/authService";
import { toast } from "react-toastify";

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const data = await verifyEmail(token);

        if (data.success) {
          setVerified(true);
          toast.success("Email Verified Successfully");
        }
      } catch (err) {
        toast.error(
          err.response?.data?.message ||
            "Verification Failed"
        );
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token]);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <h3>Verifying Email...</h3>
      </div>
    );
  }

  return (
    <div className="container text-center py-5">

      {verified ? (
        <>
          <h2 className="text-success">
            ✅ Email Verified
          </h2>

          <p>You can login now.</p>

          <button
            className="btn btn-warning"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </>
      ) : (
        <>
          <h2 className="text-danger">
            Verification Failed
          </h2>
        </>
      )}

    </div>
  );
}

export default VerifyEmail;