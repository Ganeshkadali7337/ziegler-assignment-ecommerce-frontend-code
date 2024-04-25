import { Component } from "react";
import Cookies from "js-cookie";
import { TailSpin } from "react-loader-spinner";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import "./index.css";

const SellerLogin = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("jwtToken");
  if (token !== null) {
    return <Navigate to="/seller/portal" replace />;
  }
  return <Login navigate={navigate} />;
};

class Login extends Component {
  state = {
    isLoading: false,

    mail: "",
    password: "",

    Msg: "",
  };

  loginUser = async () => {
    const { mail, password } = this.state;
    //this.setState({ isLoading: true });
    const userDetails = {
      mail,
      password,
    };
    await axios
      .post(
        "https://ziegler-assignment-ecommerce-backend-u524.onrender.com/sellerLogin",
        userDetails
      )
      .then(async (res) => {
        console.log(res);
        this.setState({
          isLoading: false,
          Msg: `Login successfull`,
          mail: "",
          password: "",
        });
        let token = await res.data.token;
        const { navigate } = this.props;
        sessionStorage.setItem("jwtToken", token);
        navigate("/seller/portal", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isLoading: false,
          Msg: err.response.data,
          mail: "",
          password: "",
        });
      });
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    const { mail, password } = this.state;
    if ((mail || password) === "") {
      this.setState({ Msg: "*enter correct details" });
    } else {
      this.setState({ isLoading: true, Msg: "" }, this.loginUser);
    }
  };

  onChangeMail = (e) => {
    this.setState({ mail: e.target.value });
  };

  onChangePass = (e) => {
    this.setState({ password: e.target.value });
  };

  onClickReg = () => {
    const { navigate } = this.props;
    navigate("/seller/registration");
  };

  render() {
    const { isLoading, mail, password, Msg } = this.state;
    return (
      <div className="home-container">
        <h1>Seller</h1>
        <div className="log-card-container">
          <form className="reg-card" onSubmit={this.onSubmitForm}>
            <label htmlFor="gmail">GMAIL:</label>
            <input
              id="gmail"
              type="text"
              placeholder="Enter your gmail"
              className="input-el"
              onChange={this.onChangeMail}
              value={mail}
            />
            <label htmlFor="pass">PASSWORD:</label>
            <input
              id="pass"
              type="password"
              placeholder="Enter your password"
              className="input-el"
              onChange={this.onChangePass}
              value={password}
            />
            <p
              className={
                Msg.includes("successfull") ? "err-msg green" : "err-msg red"
              }
            >
              {Msg}
            </p>
            {isLoading ? (
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
            ) : (
              <button type="submit" className="log-button">
                Login
              </button>
            )}

            <p>New User?</p>
          </form>

          <button onClick={this.onClickReg} className="log-button">
            Register Now
          </button>
        </div>
      </div>
    );
  }
}

export default SellerLogin;
