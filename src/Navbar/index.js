import { useNavigate, Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import Cookies from "js-cookie";
import "./index.css";

const Navbar = () => {
  const navigate = useNavigate();
  const onClickLogout = () => {
    sessionStorage.removeItem("jwtToken");
    navigate("/", { replace: true });
  };
  return (
    <div className="nav-container">
      <FaUser className="profile" />
      <h1 className="logo">LOGO</h1>
      <div className="log-container">
        <Link to="/buyer/cart" className="cart-link">
          <PiShoppingCartSimpleFill className="cart" />
        </Link>
        <button className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
