import { useEffect, useState } from "react";

import {
  getMyOrders
} from "../services/orderService";

import {
  toast
} from "react-toastify";

import socket from "../socket";



function Orders(){


  const [orders,setOrders] = useState([]);

  const [loading,setLoading] = useState(true);





  // ==========================
  // LOAD ORDERS + SOCKET
  // ==========================

  useEffect(()=>{


    loadOrders();




    // REAL TIME STATUS UPDATE

    socket.on(
      "orderStatusUpdated",
      (data)=>{


        setOrders(
          (prevOrders)=>

          prevOrders.map(
            (order)=>

            order._id === data.orderId

            ?

            {
              ...order,

              orderStatus:
              data.status,

              payment:
              data.payment

            }

            :

            order

          )

        );



        toast.info(
          `Order Status Updated : ${data.status}`
        );


      }
    );





    return ()=>{


      socket.off(
        "orderStatusUpdated"
      );


    };


  },[]);









  // ==========================
  // FETCH MY ORDERS
  // ==========================

  const loadOrders = async()=>{


    try{


      setLoading(true);



      const data =
      await getMyOrders();




      if(data.success){

        setOrders(
          data.orders
        );

      }



    }

    catch(error){


      console.log(
        "Orders Error:",
        error
      );



      toast.error(
        "Failed to load orders"
      );


    }

    finally{


      setLoading(false);


    }



  };









  // ==========================
  // STATUS COLOR
  // ==========================

  const statusColor = (status)=>{


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

      <div className="container py-5">

        <h5>
          Loading Orders...
        </h5>

      </div>

    );

  }










  return (


    <div className="container py-5">



      <h2 className="fw-bold mb-4">

        My Orders

      </h2>






      {
        orders.length === 0

        ?


        <div className="text-center">

          <h5>
            No Orders Found
          </h5>

        </div>


        :



        orders.map(
          (order)=>(


          <div

          className="card shadow mb-4"

          key={order._id}

          >



          <div className="card-body">






          <h5>

          Order ID :

          <small className="text-muted">

          {" "}

          {order._id}

          </small>


          </h5>







          <p>

          Status :


          <span

          className={
            `badge bg-${statusColor(
              order.orderStatus
            )} ms-2`
          }

          >

          {order.orderStatus}


          </span>


          </p>









          <p>

          Payment Method :

          <b>

          {" "}

          {order.payment?.method}


          </b>


          </p>








          <p>

          Payment Status :

          <b>

          {" "}

          {order.payment?.status}


          </b>


          </p>








          <h5 className="text-danger">

          Total ₹

          {order.totalPrice}


          </h5>






          <hr/>






          <h6>

          Items

          </h6>








          {

          order.items?.map(
            (item)=>(


            <div

            key={item._id}

            className="
            d-flex
            align-items-center
            mb-3
            "

            >





            <img

            src={
              item.image ||
              "https://via.placeholder.com/70"
            }

            width="70"

            height="70"

            className="rounded me-3"

            alt={item.name}


            />







            <div>


            <b>

            {item.name}


            </b>





            <p className="mb-0">

            Size:

            {" "}

            {item.size}


            </p>





            <p className="mb-0">

            Qty:

            {" "}

            {item.quantity}


            </p>





            <p className="mb-0">

            Price:

            ₹{item.price}


            </p>





            </div>





            </div>


            )


          )

          }








          </div>



          </div>


          )


        )

      }






    </div>


  );


}



export default Orders;