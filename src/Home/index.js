import { Link } from "react-router-dom";

import "./index.css";

const Home = () => (
  <div className="home-container">
    <div className="home-card">
      <p className="signup-para">SIGN UP AS:</p>
      <Link to="/buyer/registration">
        <button className="choose-button">Buyer</button>
      </Link>
      <p>OR</p>
      <Link to="/seller/registration">
        <button className="choose-button">Seller</button>
      </Link>
    </div>
  </div>
);

export default Home;
