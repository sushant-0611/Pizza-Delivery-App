import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

function AdminLayout() {

  const { logout } = useAuth();

  const navigate = useNavigate();


  // ==========================
  // LOGOUT
  // ==========================

  const handleLogout = () => {

    logout();

    toast.success("Logged out successfully");

    navigate("/login");

  };



  // ==========================
  // REFRESH PAGE
  // ==========================

  const handleRefresh = () => {

    window.location.reload();

  };



  return (

    <div className="container-fluid p-0">


      <div className="row g-0">



        {/* Sidebar */}


        <div

          className="col-md-2 bg-dark text-white position-fixed"

          style={{

            minHeight:"100vh",

            width:"250px",

          }}

        >


          <div className="p-4">


            <h3 className="text-warning text-center mb-4">

              🍕 Pizza Admin

            </h3>



            <hr className="text-secondary"/>




            <div className="nav flex-column gap-2">



              <NavLink

                to="/admin"

                end

                className={({isActive})=>

                  `btn ${
                    isActive
                    ?
                    "btn-warning text-dark"
                    :
                    "btn-outline-light"
                  } text-start`

                }

              >

                <i className="bi bi-speedometer2 me-2"></i>

                Dashboard

              </NavLink>





              <NavLink

                to="/admin/add-pizza"

                className={({isActive})=>

                  `btn ${
                    isActive
                    ?
                    "btn-warning text-dark"
                    :
                    "btn-outline-light"
                  } text-start`

                }

              >

                <i className="bi bi-plus-circle me-2"></i>

                Add Pizza

              </NavLink>






              <NavLink

                to="/admin/manage-pizzas"

                className={({isActive})=>

                  `btn ${
                    isActive
                    ?
                    "btn-warning text-dark"
                    :
                    "btn-outline-light"
                  } text-start`

                }

              >

                <i className="bi bi-grid me-2"></i>

                Manage Pizzas

              </NavLink>






              <NavLink

                to="/admin/inventory"

                className={({isActive})=>

                  `btn ${
                    isActive
                    ?
                    "btn-warning text-dark"
                    :
                    "btn-outline-light"
                  } text-start`

                }

              >

                <i className="bi bi-box-seam me-2"></i>

                Manage Inventory

              </NavLink>







              <NavLink

                to="/admin/orders"

                className={({isActive})=>

                  `btn ${
                    isActive
                    ?
                    "btn-warning text-dark"
                    :
                    "btn-outline-light"
                  } text-start`

                }

              >

                <i className="bi bi-receipt me-2"></i>

                Manage Orders

              </NavLink>



            </div>





            <hr className="text-secondary my-4"/>





            {/* Refresh Button */}

            <button

              className="btn btn-info text-white w-100 mb-3"

              onClick={handleRefresh}

            >

              <i className="bi bi-arrow-clockwise me-2"></i>

              Refresh

            </button>







            {/* Logout Button */}


            <button

              className="btn btn-danger w-100"

              onClick={handleLogout}

            >

              <i className="bi bi-box-arrow-right me-2"></i>

              Logout


            </button>





          </div>


        </div>








        {/* Main Content */}


        <div

          className="col"

          style={{

            marginLeft:"250px",

            minHeight:"100vh",

            background:"#f8f9fa",

          }}

        >


          <div className="p-4">


            <Outlet />


          </div>


        </div>




      </div>


    </div>

  );

}


export default AdminLayout;