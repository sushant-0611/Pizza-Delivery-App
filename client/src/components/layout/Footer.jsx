import { Link } from "react-router-dom";
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPizzaSlice,
  FaChevronDown,
  FaHome,
  FaUtensils,
  FaInfoCircle,
  FaEnvelopeOpen
} from "react-icons/fa";
import { useState } from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-dark text-white py-5 mt-auto">
      <div className="container">
        {/* Mobile Accordion Layout */}
        <div className="d-md-none">
          {/* Brand */}
          <div className="text-center mb-4">
            <h5 className="fw-bold text-white">
              <FaPizzaSlice className="me-2 text-warning" />
              PizzaHub
            </h5>
            <p className="text-white-50 small">
              Delicious pizzas made with love
            </p>
          </div>

          {/* Quick Links Accordion */}
          <div className="border-bottom border-secondary py-2">
            <button 
              className="btn btn-link text-white text-decoration-none w-100 d-flex justify-content-between align-items-center"
              onClick={() => toggleSection('links')}
            >
              <span className="fw-bold text-white">Quick Links</span>
              <FaChevronDown className={`text-white ${openSection === 'links' ? 'rotate-180' : ''}`} />
            </button>
            {openSection === 'links' && (
              <ul className="list-unstyled ps-3 mt-2">
                <li className="mb-2">
                  <Link to="/" className="text-white text-decoration-none hover-text-warning">
                    <FaHome className="me-2" size={14} />
                    Home
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/menu" className="text-white text-decoration-none hover-text-warning">
                    <FaUtensils className="me-2" size={14} />
                    Menu
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/about" className="text-white text-decoration-none hover-text-warning">
                    <FaInfoCircle className="me-2" size={14} />
                    About
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/contact" className="text-white text-decoration-none hover-text-warning">
                    <FaEnvelopeOpen className="me-2" size={14} />
                    Contact
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* Contact Accordion */}
          <div className="border-bottom border-secondary py-2">
            <button 
              className="btn btn-link text-white text-decoration-none w-100 d-flex justify-content-between align-items-center"
              onClick={() => toggleSection('contact')}
            >
              <span className="fw-bold text-white">Contact</span>
              <FaChevronDown className={`text-white ${openSection === 'contact' ? 'rotate-180' : ''}`} />
            </button>
            {openSection === 'contact' && (
              <ul className="list-unstyled ps-3 mt-2">
                <li className="mb-2 text-white">
                  <FaMapMarkerAlt className="me-2 text-warning" />
                  123 Pizza Street, Food City
                </li>
                <li className="mb-2 text-white">
                  <FaPhone className="me-2 text-warning" />
                  +1 (555) 123-4567
                </li>
                <li className="mb-2 text-white">
                  <FaEnvelope className="me-2 text-warning" />
                  info@pizzahub.com
                </li>
              </ul>
            )}
          </div>

          {/* Social Icons */}
          <div className="text-center mt-4">
            <a href="#" className="text-white me-3 hover-text-warning" aria-label="Facebook">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="text-white me-3 hover-text-warning" aria-label="Twitter">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-white me-3 hover-text-warning" aria-label="Instagram">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-white hover-text-warning" aria-label="YouTube">
              <FaYoutube size={20} />
            </a>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="row g-4 d-none d-md-flex">
          {/* Brand Section */}
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold mb-3 text-white">
              <FaPizzaSlice className="me-2 text-warning" />
              PizzaHub
            </h5>
            <p className="text-white-50">
              Delicious pizzas made with love, 
              fresh ingredients, and authentic recipes.
              Order now and experience the taste of perfection!
            </p>
            <div className="social-links mt-3">
              <a href="#" className="text-white me-3" aria-label="Facebook">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-white me-3" aria-label="Twitter">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-white me-3" aria-label="Instagram">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-white" aria-label="YouTube">
                <FaYoutube size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="fw-bold mb-3 text-white">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white text-decoration-none hover-text-warning">
                  <FaHome className="me-2" size={14} />
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/menu" className="text-white text-decoration-none hover-text-warning">
                  <FaUtensils className="me-2" size={14} />
                  Menu
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-white text-decoration-none hover-text-warning">
                  <FaInfoCircle className="me-2" size={14} />
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-white text-decoration-none hover-text-warning">
                  <FaEnvelopeOpen className="me-2" size={14} />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold mb-3 text-white">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2 text-white">
                <FaMapMarkerAlt className="me-2 text-warning" />
                123 Pizza Street, Food City
              </li>
              <li className="mb-2 text-white">
                <FaPhone className="me-2 text-warning" />
                +1 (555) 123-4567
              </li>
              <li className="mb-2 text-white">
                <FaEnvelope className="me-2 text-warning" />
                info@pizzahub.com
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold mb-3 text-white">Working Hours</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <span className="text-white-50">Monday - Friday:</span>
                <br />
                <span className="text-warning">11:00 AM - 11:00 PM</span>
              </li>
              <li className="mb-2">
                <span className="text-white-50">Saturday - Sunday:</span>
                <br />
                <span className="text-warning">10:00 AM - 12:00 AM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-secondary my-4" />

        {/* Bottom Bar */}
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0 text-white-50">
              © {currentYear} PizzaHub. All Rights Reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <Link to="/privacy" className="text-white text-decoration-none hover-text-warning me-3">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white text-decoration-none hover-text-warning">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .hover-text-warning {
          transition: color 0.3s ease;
        }
        
        .hover-text-warning:hover {
          color: #ffc107 !important;
        }
        
        .social-links a {
          transition: all 0.3s ease;
          display: inline-block;
        }
        
        .social-links a:hover {
          color: #ffc107 !important;
          transform: translateY(-3px);
        }

        .rotate-180 {
          transform: rotate(180deg);
          transition: transform 0.3s ease;
        }
        
        .btn-link:focus {
          box-shadow: none;
        }
        
        /* Ensure all text is white on mobile */
        .btn-link {
          color: white !important;
        }
        
        .btn-link:hover {
          color: #ffc107 !important;
        }
        
        /* Make list items white */
        .list-unstyled li {
          color: white !important;
        }
        
        /* Override any Bootstrap text-muted */
        .text-muted {
          color: rgba(255, 255, 255, 0.7) !important;
        }
      `}</style>
    </footer>
  );
}

export default Footer;