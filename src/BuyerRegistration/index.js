import { Component } from "react";
import { TailSpin } from "react-loader-spinner";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import "./index.css";

const BuyerRegistration = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("jwtToken");

  if (token !== null) {
    console.log("triggered");
    return <Navigate to="/buyer/portal" replace />;
  }
  return <Registration navigate={navigate} />;
};

class Registration extends Component {
  state = {
    isLoading: false,
    name: "",
    mail: "",
    password: "",
    confirmPassword: "",
    Msg: "",
  };

  addUserToDb = async () => {
    const { name, mail, password, confirmPassword } = this.state;
    //this.setState({ isLoading: true });
    const userDetails = {
      name,
      mail,
      password,
      confirmPassword,
      user: "NON PRIME",
    };
    await axios
      .post(
        "https://ziegler-assignment-ecommerce-backend-u524.onrender.com/addBuyer",
        userDetails
      )
      .then((res) => {
        this.setState({
          isLoading: false,
          Msg: `${res.data} please Login `,
          name: "",
          mail: "",
          password: "",
          confirmPassword: "",
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isLoading: false,
          Msg: err.response.data,
          name: "",
          mail: "",
          password: "",
          confirmPassword: "",
        });
      });
  };

  onSubmitRegistrationForm = (e) => {
    e.preventDefault();
    const { name, mail, password, confirmPassword } = this.state;
    if ((name || mail || password || confirmPassword) === "") {
      this.setState({ Msg: "*enter correct details" });
    } else {
      this.setState({ isLoading: true, Msg: "" }, this.addUserToDb);
    }
  };

  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  };

  onChangeMail = (e) => {
    this.setState({ mail: e.target.value });
  };

  onChangePass = (e) => {
    this.setState({ password: e.target.value });
  };

  onChangeConf = (e) => {
    this.setState({ confirmPassword: e.target.value });
  };

  onClickLog = () => {
    const { navigate } = this.props;
    navigate("/buyer/login");
  };

  render() {
    const { isLoading, name, mail, password, confirmPassword, Msg } =
      this.state;
    return (
      <div className="home-container">
        <h1>Buyer</h1>
        <div className="log-card-container">
          <form className="reg-card" onSubmit={this.onSubmitRegistrationForm}>
            <label htmlFor="name">NAME:</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="input-el"
              onChange={this.onChangeName}
              value={name}
            />
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
            <label htmlFor="conf">CONFIRM PASSWORD:</label>
            <input
              id="conf"
              type="password"
              placeholder="Confirm your password"
              className="input-el"
              onChange={this.onChangeConf}
              value={confirmPassword}
            />
            <p
              className={
                Msg.includes("successfully") ? "err-msg green" : "err-msg red"
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
                Register
              </button>
            )}

            <p>Already Registered?</p>
          </form>

          <button onClick={this.onClickLog} className="log-button">
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default BuyerRegistration;
