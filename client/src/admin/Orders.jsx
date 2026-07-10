import { useEffect, useState } from "react";

import {
  getAllOrders,
  updateOrderStatus,
} from "../services/orderService";

import {
  toast
} from "react-toastify";


import Loader from "../components/Loader";
import ButtonLoader from "../components/ButtonLoader";

import socket from "../socket";



function Orders() {


  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [statusLoading, setStatusLoading] = useState(null);






  // ==========================
  // LOAD + AUTO REFRESH
  // ==========================

  useEffect(() => {


    fetchOrders();



    // AUTO REFRESH EVERY 10 SEC

    const interval = setInterval(()=>{

      fetchOrders();

    },10000);







    // SOCKET UPDATE

    socket.on(
      "orderStatusUpdated",
      (data)=>{


        setOrders(
          (prev)=>

          prev.map(
            (order)=>

            order._id === data.orderId

            ?

            {
              ...order,

              orderStatus:data.status,

              payment:data.payment

            }

            :

            order

          )

        );


      }

    );








    return ()=>{


      clearInterval(interval);


      socket.off(
        "orderStatusUpdated"
      );


    };



  },[]);









  // ==========================
  // FETCH ORDERS
  // ==========================

  const fetchOrders = async()=>{


    try{


      const data =
      await getAllOrders();



      if(data.success){

        setOrders(
          data.orders
        );

      }



    }

    catch(error){


      console.log(error);


      toast.error(
        "Failed to load orders"
      );


    }

    finally{


      setLoading(false);


    }


  };









  // ==========================
  // UPDATE STATUS
  // ==========================


  const handleStatus = async(
    id,
    status
  )=>{


    try{


      setStatusLoading(id);



      const data =
      await updateOrderStatus(
        id,
        status
      );




      if(data.success){


        toast.success(
          "Order Updated"
        );


        fetchOrders();


      }


    }

    catch(error){


      console.log(error);


      toast.error(

        error.response?.data?.message
        ||
        "Failed to update status"

      );


    }

    finally{


      setStatusLoading(null);


    }



  };









  // ==========================
  // ROW COLOR
  // ==========================

  const getRowClass=(status)=>{


    switch(status){


      case "Delivered":
        return "table-success";


      case "Cancelled":
        return "table-danger";


      case "Preparing":
        return "table-info";


      case "Out for Delivery":
        return "table-warning";


      default:
        return "";


    }


  };









  // ==========================
  // PAYMENT BADGE
  // ==========================

  const paymentBadge=(status)=>{


    switch(status){


      case "Paid":

        return (

          <span className="badge bg-success">

            Paid

          </span>

        );



      case "Failed":

        return (

          <span className="badge bg-danger">

            Failed

          </span>

        );



      default:

        return (

          <span className="badge bg-warning text-dark">

            Pending

          </span>

        );


    }


  };









  // ==========================
  // STATUS BADGE
  // ==========================

  const statusBadge=(status)=>{


    switch(status){


      case "Pending":
        return "secondary";


      case "Preparing":
        return "primary";


      case "Out for Delivery":
        return "warning";


      case "Delivered":
        return "success";


      case "Cancelled":
        return "danger";


      default:
        return "secondary";


    }


  };









  if(loading){


    return (

      <Loader text="Loading Orders..." />

    );


  }









  return (

    <div className="container-fluid mt-4">


      <div className="card shadow">



        <div className="card-header bg-dark text-white">


          <h4 className="mb-0">

            Manage Orders

          </h4>


        </div>






        <div className="card-body">



        {

        orders.length===0


        ?

        (

          <div className="text-center py-5">

            <h5>
              No Orders Found
            </h5>

          </div>

        )


        :


        (

        <div className="table-responsive">


        <table className="table table-bordered table-hover align-middle">


        <thead className="table-dark">


        <tr>

        <th>#</th>

        <th>Customer</th>

        <th>Items</th>

        <th>Amount</th>

        <th>Payment</th>

        <th>Status</th>

        <th>Date</th>

        <th>Action</th>


        </tr>


        </thead>






        <tbody>


        {

        orders.map(
          (order,index)=>(


        <tr

        key={order._id}

        className={
          getRowClass(
            order.orderStatus
          )
        }

        >




        <td>

        {index+1}

        </td>





        <td>

        <b>
        {order.user?.name}
        </b>


        <br/>


        <small>
        {order.user?.email}
        </small>


        </td>







        <td>


        {
        order.items?.map(
          item=>(


          <div key={item._id}>


          {item.name}

          {" x "}

          {item.quantity}


          <br/>


          <small>

          Size:
          {item.size}

          {" | ₹"}

          {item.price}

          </small>


          </div>


          )
        )
        }


        </td>









        <td>


        <strong>

        ₹ {order.totalPrice || 0}

        </strong>


        </td>









        <td>


        {paymentBadge(
          order.payment?.status
        )}


        <br/>


        <small>

        {order.payment?.method}

        </small>


        </td>









        <td>


        <span

        className={
          `badge bg-${statusBadge(
            order.orderStatus
          )}`
        }

        >

        {order.orderStatus}

        </span>


        </td>








        <td>


        {
        new Date(
          order.createdAt
        )
        .toLocaleDateString()
        }


        </td>









        <td>


        <select

        className="form-select"


        value={
          order.orderStatus
        }


        disabled={
          statusLoading===order._id
        }


        onChange={
          (e)=>
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





        {
        statusLoading===order._id &&

        <ButtonLoader />

        }


        </td>






        </tr>


        )

        )

        }


        </tbody>


        </table>


        </div>


        )

        }



        </div>


      </div>


    </div>


  );


}


export default Orders;