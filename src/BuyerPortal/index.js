import { Component } from "react";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import BuyerProductCard from "../BuyerProductCard";
import axios from "axios";
import "./index.css";
import Navbar from "../Navbar";

const BuyerPortal = () => {
  const navigate = useNavigate();
  return <Portal navigate={navigate} />;
};
class Portal extends Component {
  state = {
    isGetProfile: false,
    buyerProducts: [],
    failed: false,
    errMsg: "",
    buyerProfile: [],
  };
  getProfile = async () => {
    const token = sessionStorage.getItem("jwtToken");
    await axios
      .get(
        "https://ziegler-assignment-ecommerce-backend-u524.onrender.com/buyer/getProducts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
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

    await axios
      .get(
        "https://ziegler-assignment-ecommerce-backend-u524.onrender.com/buyer/getProfile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        this.setState({ isGetProfile: true, buyerProfile: res.data });
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
  componentDidMount() {
    this.getProfile();
  }

  onAddToCart = async (id) => {
    const token = sessionStorage.getItem("jwtToken");
    const data = {
      productId: id,
    };
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    await axios
      .post(
        "https://ziegler-assignment-ecommerce-backend-u524.onrender.com/buyer/addCartProduct",
        data,
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res);
        alert(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  render() {
    const { isGetProfile, failed, errMsg, buyerProducts, buyerProfile } =
      this.state;
    console.log(buyerProfile.user);
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
          <div className="portal-main-container">
            {failed ? (
              <img
                className="err-img"
                src="https://res.cloudinary.com/dzjz2ts9c/image/upload/v1713949961/3828544_fnsryt.jpg"
                alt={errMsg}
              />
            ) : (
              <div>
                <Navbar user={buyerProfile.user} />
                <div className="products-main-container">
                  {buyerProfile.user === "NON PRIME" && (
                    <img
                      className="banner"
                      src="https://res.cloudinary.com/dzjz2ts9c/image/upload/v1714081832/IN-PR-Mob-Slash-Prime_wjyyve.jpg"
                      alt="banner"
                    />
                  )}

                  <h1 className="all-products-heading">All Products</h1>
                  <ul className="products-container">
                    {buyerProducts.map((each) => (
                      <BuyerProductCard
                        onAddToCart={this.onAddToCart}
                        data={each}
                        key={each._id}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default BuyerPortal;
