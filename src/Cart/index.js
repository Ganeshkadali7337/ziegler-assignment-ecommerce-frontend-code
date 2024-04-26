import { Component } from "react";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import CartProductCard from "../CartProductCard";
import axios from "axios";
import "./index.css";

const Cart = () => {
  const navigate = useNavigate();
  return <Portal navigate={navigate} />;
};
class Portal extends Component {
  state = { isGetProfile: false, buyerProducts: [], failed: false, errMsg: "" };
  getProfile = async () => {
    const token = sessionStorage.getItem("jwtToken");
    await axios
      .get(
        "https://ziegler-assignment-ecommerce-backend-u524.onrender.com/buyer/getCartProducts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        this.setState({ isGetProfile: true, buyerProducts: res.data });
      })
      .catch((err) => {
        console.log(err);
        let error = err.response.status;
        console.log(error);
        let msg = error === 400 ? "Un Authorized" : err.response.data;
        this.setState({
          isGetProfile: true,
          failed: true,
          errMsg: msg,
        });
      });
  };

  onRemoveFromCart = async (id) => {
    const token = sessionStorage.getItem("jwtToken");
    await axios
      .delete(
        `https://ziegler-assignment-ecommerce-backend-u524.onrender.com/buyer/deleteCartProduct/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        this.setState({ isGetProfile: false }, this.getProfile);
        alert("Product Deleted From Cart Successfully.");
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isGetProfile: false }, this.getProfile);
        alert(err.response.data);
      });
  };

  componentDidMount() {
    this.getProfile();
  }
  render() {
    const { isGetProfile, failed, errMsg, buyerProducts } = this.state;
    return (
      <div className="portal-main-container">
        {!isGetProfile ? (
          <div className="spinner">
            <TailSpin
              height="50"
              width="50"
              color="black"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <div className="portal-main-container2">
            {failed ? (
              <img
                className="err-img"
                src="https://res.cloudinary.com/dzjz2ts9c/image/upload/v1713949961/3828544_fnsryt.jpg"
                alt={errMsg}
              />
            ) : (
              <div>
                <div className="products-main-container">
                  <h1 className="all-products-heading">All Products</h1>
                  <ul className="products-container">
                    {buyerProducts.map((each) => (
                      <CartProductCard
                        id={each._id}
                        onRemoveFromCart={this.onRemoveFromCart}
                        data={each.cartProduct}
                        key={each._id}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <div className="checkout">
              <button className="logout-button">Checkout</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Cart;
