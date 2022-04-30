import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/authSlice/apiCalls";
import Joi from "joi";
import TextField from "../../components/Inputs/TextField";
import Checkbox from "../../components/Inputs/Checkbox";
import Button from "../../components/Button";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import AppleIcon from "@mui/icons-material/Apple";
import GoogleIcon from "@mui/icons-material/Google";
import logo from "../../images/black_logo.svg";
import styles from "./styles.module.scss";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import GoogleLogin from "react-google-login";
const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [logi, setLogi] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { isFetching } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleInputState = (name, value) => {
    setData({ ...data, [name]: value });
  };
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );
  const responseFacebook = (response) => {
    console.log(response);
    axios({
      method: "POST",
      url: "http://localhost:5000/api/facebooklogin",
      data: {
        accessToken: response.accessToken,
        userID: response.userID,
        name: response.name,
        email: response.email,
      },
      logi: {
        email: response.email,
        password: "aA12345678!",
      },
    }).then((response) => {
      console.log("success", response);
      window.location = "/home";
    });
  };
  const handleErrorState = (name, value) => {
    value === ""
      ? delete errors[name]
      : setErrors({ ...errors, [name]: value });
  };
  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };
  const schema = {
    email: Joi.string().email({ tlds: false }).required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      login(data, dispatch);
    } else {
      console.log("please fill out properly");
    }
  };
  const handleLogin = async (googleData) => {
    const res = await fetch("http://localhost:5000/api/google-login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
    });

    const data = await res.json();
    setLoginData(data);
    console.log(data);
    localStorage.setItem("loginData", JSON.stringify(data));
    login(data, dispatch);
  };
  const handleFailure = (result) => {
    alert(result);
  };
  return (
    <div className={styles.container}>
      <div className={styles.logo_container}>
        <Link to="/"></Link>
      </div>
      <main className={styles.main}>
        <h1 className={styles.heading}>To continue, log .</h1>
        <button
          className={styles.contained_btn}
          style={{ background: "#3b5998" }}
        >
          <FacebookRoundedIcon
            appId="1026656831320772"
            autoLoad={true}
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass="my-facebook-button-class"
            icon="fa-facebook"
          />{" "}
          continue with facebook
          <FacebookLogin
            appId="1026656831320772"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass="my-facebook-button-class"
            icon="fa-facebook"
          />
          ,
        </button>
        <button className={styles.contained_btn} style={{ background: "#000" }}>
          <AppleIcon /> continue with apple
        </button>
        <button className={styles.outline_btn}>
          <GoogleIcon /> continue with google
          {loginData ? (
            <div></div>
          ) : (
            <GoogleLogin
              clientId="671697475830-un4oqehgrhenbc78jmlaogjs1gmilbvn.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={handleLogin}
              onFailure={handleFailure}
              cookiePolicy={"single_host_origin"}
            />
          )}
          ,
        </button>
        <button className={styles.outline_btn}>
          Continue with phone number
        </button>
        <p className={styles.or_container}>or</p>
        <form onSubmit={handleSubmit} className={styles.form_container}>
          <div className={styles.input_container}>
            <TextField
              label="Enter your email"
              placeholder="Enter your email"
              name="email"
              handleInputState={handleInputState}
              schema={schema.email}
              handleErrorState={handleErrorState}
              value={data.email}
              error={errors.email}
              required={true}
            />
          </div>
          <div className={styles.input_container}>
            <TextField
              label="Password"
              placeholder="Password"
              name="password"
              handleInputState={handleInputState}
              schema={schema.password}
              handleErrorState={handleErrorState}
              value={data.password}
              error={errors.password}
              type="password"
              required={true}
            />
          </div>
          <Link to="/forgotpassword" className="login-screen__forgotpassword">
            Forgot Password?
          </Link>
          <div className={styles.form_bottom}>
            <Checkbox label="Remember me" />
            <Button
              type="submit"
              label="LOG IN"
              isFetching={isFetching}
              style={{ color: "white", background: "#15883e", width: "20rem" }}
            />
          </div>
        </form>
        <h1 className={styles.dont_have_account}>Don't have an account?</h1>
        <Link to="/signup">
          <button className={styles.outline_btn}>sign up for PRO-SOUNDS</button>
        </Link>
      </main>
    </div>
  );
};

export default Login;
