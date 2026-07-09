import { useEffect, useState } from "react";
import {
  getAllOrders,
  updateOrderStatus,
} from "../services/orderService";
import { toast } from "react-toastify";

import Loader from "../components/Loader";
import ButtonLoader from "../components/ButtonLoader";

function Orders() {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [statusLoading, setStatusLoading] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  // Fetch Orders
  const fetchOrders = async () => {
    setLoading(true);

    try {
      const res = await getAllOrders();

      setOrders(res.orders);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  // Update Order Status
  const handleStatus = async (id, status) => {
    setStatusLoading(id);

    try {
      const res = await updateOrderStatus(id, status);

      toast.success(
        res.message ||
          "Order Status Updated Successfully"
      );

      fetchOrders();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update order"
      );
    } finally {
      setStatusLoading(null);
    }
  };

  // Page Loader
  if (loading) {
    return (
      <Loader text="Loading Orders..." />
    );
  }

  return (
    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>📦 Orders Management</h2>

        <span className="badge bg-primary fs-6">
          Total Orders : {orders.length}
        </span>

      </div>

      <div className="table-responsive">

        <table className="table table-bordered table-hover align-middle">

          <thead className="table-dark text-center">

            <tr>

              <th>Customer</th>

              <th>Total</th>

              <th>Payment</th>

              <th>Status</th>

              <th>Date</th>

              <th width="220">
                Update Status
              </th>

            </tr>

          </thead>

          <tbody>

            {orders.length > 0 ? (

              orders.map((order) => (

                <tr key={order._id}>

                  <td>

                    <strong>
                      {order.user?.name ||
                        "Unknown User"}
                    </strong>

                    <br />

                    <small className="text-muted">
                      {order.user?.email}
                    </small>

                  </td>

                  <td>

                    <strong>
                      ₹ {order.totalPrice}
                    </strong>

                  </td>

                  <td>

                    {order.paymentStatus ===
                    "Paid" ? (

                      <span className="badge bg-success">
                        ✅ Paid
                      </span>

                    ) : (

                      <span className="badge bg-warning text-dark">
                        ⏳ Pending
                      </span>

                    )}

                  </td>

                  <td>

                    <span className="badge bg-info">
                      {order.orderStatus}
                    </span>

                  </td>

                  <td>

                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}

                  </td>

                  <td>

                    {statusLoading ===
                    order._id ? (

                      <ButtonLoader text="Updating..." />

                    ) : (

                      <select
                        className="form-select"
                        value={
                          order.orderStatus
                        }
                        onChange={(e) =>
                          handleStatus(
                            order._id,
                            e.target.value
                          )
                        }
                      >

                        <option>
                          Pending
                        </option>

                        <option>
                          Preparing
                        </option>

                        <option>
                          Out for Delivery
                        </option>

                        <option>
                          Delivered
                        </option>

                        <option>
                          Cancelled
                        </option>

                      </select>

                    )}

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="6"
                  className="text-center py-5"
                >

                  <h5 className="text-muted">
                    🍕 No Orders Yet
                  </h5>

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Orders;