import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import "./index.css";

const SellerNavbar = () => {
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
        <button className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default SellerNavbar;
