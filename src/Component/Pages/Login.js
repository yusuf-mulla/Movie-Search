import "./Register.css";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "../Re-UsebleComp/Toaster";
import secureLocalStorage from "react-secure-storage";

// main (parent) function //
export const Login = () => {

  // navigate use for component navigateion //
  const navigate = useNavigate();

  // useRef hook use for target input tag //
  const inputRef1 = useRef("");
  const inputRef2 = useRef("");

  // user registretion Data get from lockal storage and store in to variable//
  const localData = JSON.parse(secureLocalStorage.getItem("regsiterData"));

  // useState hook use for login data store //
  const [userLogin, setUserLogin] = useState({});

  // useState hook use for validation error messeges //
  const [error, setError] = useState({});

  // useState hook use for user registration state manage //
  const [lockalStoreInfo, setLockalStoreInfo] = useState(localData);

  // function for navigate to register page //
  const handleNavigate = () => {
    navigate("/Register");
  };

  // function for login data stored into reducer page and navigate to home page //
  const handleLogin = () => {
    if (formValidation()) {
      secureLocalStorage.setItem("isActive", JSON.stringify(true));
      Toaster(true, "Login Successfull");
      setTimeout(() => {
        navigate("/");
      }, 1000);
      setUserLogin({
        email: "",
        password: "",
      });
    }
  };

  // function for login page input tag validation by using regx //
  const formValidation = () => {
    let fieldscopy = userLogin;
    const errors = {};
    let formIsValid = true;

    if (!fieldscopy["email"]) {
      formIsValid = false;
      errors["email"] = "* please enter registred email";
      inputRef1.current.focus();
    } else if (typeof fieldscopy["email"] !== "undefined") {
      if (lockalStoreInfo === null) {
        formIsValid = false;
        errors["email"] = " * email address not registred";
        inputRef1.current.focus();
      } else if (fieldscopy["email"] !== localData["email"]) {
        formIsValid = false;
        errors["email"] = "* invalid email adress";
        inputRef1.current.focus();
      } else {
        inputRef2.current.focus();
      }
    }

    if (!fieldscopy["password"]) {
      formIsValid = false;
      errors["password"] = "* please enter registred password";
    } else if (typeof fieldscopy["password"] !== "undefined") {
      if (lockalStoreInfo === null) {
        formIsValid = false;
        errors["password"] = " * password not registred";
      } else if (fieldscopy["password"] !== localData["password"]) {
        formIsValid = false;
        errors["password"] = "* invalid password";
      }
    }
    setError(errors);
    return formIsValid;
  };

  //useEffect hook use for targeting input //
  useEffect(() => {
    inputRef1.current.focus();
  }, []);

  // useEffect hook use for update state, did update //
  useEffect(() => {
    setLockalStoreInfo(localData);
  }, []);

  return (
    <div className="container1">
      <div className="main_page_container1">
        <div className="mid_container1">
          <div className="contain_container1">
            <div className="heading1">
              <h1>LOGIN YOUR ACCOUNT</h1>
            </div>
            <div className="input_container1">
              <input
                ref={inputRef1}
                className={error.email ? "error-border" : "input_tag1"}
                placeholder="Email Address"
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                value={userLogin.email}
                onChange={(e) =>
                  setUserLogin({ ...userLogin, email: e.target.value })
                }
              />
              {error.email ? (
                <div className="error-message">{error.email}</div>
              ) : (
                <div className="hidden_class">*</div>
              )}
              <input
                ref={inputRef2}
                className={error.password ? "error-border" : "input_tag1"}
                placeholder="Password"
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                value={userLogin.password}
                onChange={(e) =>
                  setUserLogin({ ...userLogin, password: e.target.value })
                }
              />
              {error.password ? (
                <div className="error-message">{error.password}</div>
              ) : (
                <div className="hidden_class">*</div>
              )}
            </div>
            <div className="Bottom_container1">
              <button className="button1" type="submit" onClick={handleLogin}>
                Login
              </button>
              <span className="signin_note">
                <a className="a_tag1">Frogot Password </a>{" "}
              </span>
              <span className="line1"></span>
              <span className="login_note">
                Don't have an account ?{" "}
                <a className="a_tag1" onClick={handleNavigate}>
                  Sign up here{" "}
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
