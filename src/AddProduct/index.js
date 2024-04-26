import { Component } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import "./index.css";

const AddProduct = () => {
  const navigate = useNavigate();
  return <Add navigate={navigate} />;
};

class Add extends Component {
  state = {
    fetching: false,
    name: "",
    price: "",
    actualPrice: "",
    user: "",
    imgFile: "",
    Msg: "",
    adding: false,
  };
  getProfile = async () => {
    const token = sessionStorage.getItem("jwtToken");
    await axios
      .get(
        "https://ziegler-assignment-ecommerce-backend-u524.onrender.com/seller/getProfile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        this.setState({ fetching: true });
      })
      .catch((err) => {
        console.log(err);
        const { navigate } = this.props;
        navigate("/", { replace: true });
      });
  };
  componentDidMount() {
    this.getProfile();
  }

  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  };

  onChangePrice = (e) => {
    this.setState({ price: e.target.value });
  };

  onChangeActPrice = (e) => {
    this.setState({ actualPrice: e.target.value });
  };

  onChangeUser = (e) => {
    this.setState({ user: e.target.value });
  };

  onChangeImg = async (e) => {
    let file = e.target.files[0];
    this.setState({ imgFile: file });
  };

  addProductToDb = async () => {
    const { imgFile, name, price, actualPrice, user } = this.state;
    const token = sessionStorage.getItem("jwtToken");
    let formData = new FormData();
    formData.append("file", imgFile);
    formData.append("upload_preset", "ganesh");
    console.log(formData);
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dzjz2ts9c/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    console.log(data.secure_url);
    const product = {
      img: data.secure_url,
      name,
      price,
      actualPrice,
      user,
    };
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    await axios
      .post(
        "https://ziegler-assignment-ecommerce-backend-u524.onrender.com/seller/addProduct",
        product,
        {
          headers: headers,
        }
      )
      .then((res) => {
        this.setState({ adding: false });
        alert(res.data);
        const { navigate } = this.props;
        navigate("/seller/portal", { replace: true });
      })
      .catch((err) => {
        this.setState({ adding: false });
        alert(err.message);
      });
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    console.log("submit");
    const { name, price, actualPrice, user, img } = this.state;
    if ((name || price || actualPrice || user || img) === "") {
      this.setState({ Msg: "*Please fill all the fields" });
    } else {
      this.setState(
        { fetching: true, Msg: "", adding: true },
        this.addProductToDb
      );
    }
  };

  render() {
    const { fetching, name, price, actualPrice, Msg, adding } = this.state;
    return (
      <div className="home-container">
        {!fetching ? (
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
          <div className="log-card-container">
            <form className="add-card" onSubmit={this.onSubmitForm}>
              <label htmlFor="name">NAME:</label>
              <input
                className="input-el"
                id="name"
                type="text"
                onChange={this.onChangeName}
                value={name}
              />
              <label htmlFor="price">PRICE:</label>
              <input
                className="input-el"
                id="price"
                type="text"
                onChange={this.onChangePrice}
                value={price}
              />
              <label htmlFor="actprice">ACTUAL PRICE:</label>
              <input
                className="input-el"
                id="actprice"
                type="text"
                onChange={this.onChangeActPrice}
                value={actualPrice}
              />
              <label htmlFor="user">USER:</label>
              <div>
                <input
                  onChange={this.onChangeUser}
                  type="radio"
                  id="prime"
                  name="user"
                  value="PRIME"
                />

                <label htmlFor="prime">For prime users</label>
                <br />
                <input
                  onChange={this.onChangeUser}
                  type="radio"
                  id="non prime"
                  name="user"
                  value="NON PRIME"
                />
                <label htmlFor="non prime">For non prime users</label>
              </div>
              <label htmlFor="image">IMAGE:</label>
              <input id="image" type="file" onChange={this.onChangeImg} />
              <p
                className={
                  Msg.includes("successfully") ? "err-msg green" : "err-msg red"
                }
              >
                {Msg}
              </p>
              {adding ? (
                <div className="spinner">
                  <TailSpin
                    height="30"
                    width="30"
                    color="white"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                </div>
              ) : (
                <button className="log-button" type="submit">
                  AddProduct
                </button>
              )}
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default AddProduct;
