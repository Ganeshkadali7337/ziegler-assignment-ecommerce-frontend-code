import { Component } from "react";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import Cookies from "js-cookie";
import SellerNavbar from "../SellerNavbar";
import SellerProductCard from "../SellerProductCard";
import axios from "axios";
import "./index.css";

const SellerPortal = () => {
  const navigate = useNavigate();
  return <Portal navigate={navigate} />;
};
class Portal extends Component {
  state = {
    isGetProfile: false,
    sellerProducts: [],
    failed: false,
    errMsg: "",
    deleteing: false,
    errImg: "",
  };
  getProfile = async () => {
    const token = sessionStorage.getItem("jwtToken");
    await axios
      .get(
        "https://ziegler-assignment-ecommerce-backend-u524.onrender.com/seller/getProducts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        this.setState({ isGetProfile: true, sellerProducts: res.data });
      })
      .catch((err) => {
        console.log(err);
        let error = err.response.status;
        console.log(error);
        let msg = error === 400 ? "Un Authorized" : err.response.data;
        let img =
          error === 400
            ? "https://res.cloudinary.com/dzjz2ts9c/image/upload/v1713949961/3828544_fnsryt.jpg"
            : "https://res.cloudinary.com/dzjz2ts9c/image/upload/v1714032195/images_13_i83y82.jpg";
        this.setState({
          isGetProfile: true,
          failed: true,
          errMsg: msg,
          errImg: img,
        });
      });
  };

  deleteProductFromDb = async (id) => {
    const token = sessionStorage.getItem("jwtToken");
    await axios
      .delete(
        `https://ziegler-assignment-ecommerce-backend-u524.onrender.com/seller/deleteProduct/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        this.setState({ isGetProfile: false }, this.getProfile);
        alert("Product Deleted Successfully.");
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

  onClickAddProduct = () => {
    const { navigate } = this.props;
    navigate("/seller/addProduct");
  };

  onClickDeleteProduct = (id) => {
    this.deleteProductFromDb(id);
  };

  render() {
    const { isGetProfile, failed, errMsg, sellerProducts, errImg } = this.state;
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
          <div>
            {failed ? (
              <img className="err-img" src={errImg} alt={errMsg} />
            ) : (
              <div className="container1">
                <SellerNavbar />
                <div className="container2">
                  <div>
                    <button
                      className="add-product-btn"
                      onClick={this.onClickAddProduct}
                    >
                      Add Product
                    </button>
                  </div>
                  <ul className="products-list">
                    <h1>My Products</h1>
                    {sellerProducts.map((each) => (
                      <SellerProductCard
                        data={each}
                        key={each._id}
                        onClickDeleteProduct={this.onClickDeleteProduct}
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

export default SellerPortal;
