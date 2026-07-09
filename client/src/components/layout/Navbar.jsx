import { Link, NavLink } from "react-router-dom";
import {
  FaShoppingCart,
  FaPizzaSlice,
  FaUserCircle,
  FaSignInAlt,
  FaHome,
  FaUtensils,
  FaInfoCircle,
  FaEnvelope,
  FaPlusCircle,
} from "react-icons/fa";

import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";


function Navbar() {

  const { totalItems } = useCart();
  const { token } = useAuth();

  const isAuthenticated = Boolean(token);


  const [isOpen, setIsOpen] = useState(false);


  const closeMenu = () => {
    setIsOpen(false);
  };


  const navClass = ({isActive}) =>
    isActive
      ? "nav-link active fw-bold text-warning"
      : "nav-link";


  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow sticky-top">


      <div className="container">


        {/* Logo */}

        <Link
          to="/"
          className="navbar-brand fw-bold fs-3"
          onClick={closeMenu}
        >

          <FaPizzaSlice className="text-warning me-2"/>

          PizzaHub

        </Link>



        {/* Mobile Button */}

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >

          <span className="navbar-toggler-icon"></span>

        </button>




        {/* Navbar Links */}

        <div
          className={`collapse navbar-collapse ${
            isOpen ? "show" : ""
          }`}
        >


          <ul className="navbar-nav ms-auto align-items-lg-center">



            {/* Home */}

            <li className="nav-item">

              <NavLink
                to="/"
                className={navClass}
                onClick={closeMenu}
              >

                <FaHome className="me-1"/>

                Home

              </NavLink>

            </li>




            {/* Menu */}

            <li className="nav-item">

              <NavLink
                to="/menu"
                className={navClass}
                onClick={closeMenu}
              >

                <FaUtensils className="me-1"/>

                Menu

              </NavLink>

            </li>





            {/* Build Pizza */}

            <li className="nav-item">

              <NavLink
                to="/build-pizza"
                className={navClass}
                onClick={closeMenu}
              >

                <FaPlusCircle className="me-1"/>

                Build Pizza

              </NavLink>

            </li>





            {/* About */}

            <li className="nav-item">

              <NavLink
                to="/about"
                className={navClass}
                onClick={closeMenu}
              >

                <FaInfoCircle className="me-1"/>

                About

              </NavLink>

            </li>





            {/* Contact */}

            <li className="nav-item">

              <NavLink
                to="/contact"
                className={navClass}
                onClick={closeMenu}
              >

                <FaEnvelope className="me-1"/>

                Contact

              </NavLink>

            </li>





            {/* Profile / Login */}

            {
              isAuthenticated ? (

                <li className="nav-item ms-lg-2">


                  <NavLink
                    to="/profile"
                    className="nav-link fs-3"
                    title="My Profile"
                    onClick={closeMenu}
                  >

                    <FaUserCircle/>

                  </NavLink>


                </li>


              ) : (


                <li className="nav-item">


                  <NavLink
                    to="/login"
                    className={navClass}
                    onClick={closeMenu}
                  >

                    <FaSignInAlt className="me-1"/>

                    Login

                  </NavLink>


                </li>


              )
            }






            {/* Cart */}

            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">


              <NavLink

                to="/cart"

                className="btn btn-warning position-relative fw-bold"

                onClick={closeMenu}

              >


                <FaShoppingCart/>

                Cart



                {
                  totalItems > 0 && (

                    <span

                      className="
                      position-absolute
                      top-0
                      start-100
                      translate-middle
                      badge
                      rounded-pill
                      bg-danger
                      "

                    >

                      {totalItems}


                    </span>


                  )
                }


              </NavLink>


            </li>



          </ul>


        </div>



      </div>



    </nav>

  );

}


export default Navbar;