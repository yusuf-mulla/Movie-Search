import "./Register.css";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "../Re-UsebleComp/Toaster";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import secureLocalStorage from "react-secure-storage";

// main (parent) function //
export const Register = () => {

  // navigate use for component navigate //
  const navigate = useNavigate();
  
  // useRef hook use for target input tag //
  const inputRef1 = useRef("");
  const inputRef2 = useRef("");
  const inputRef3 = useRef("");
  const inputRef4 = useRef("");
  const inputRef5 = useRef("");
  const inputRef6 = useRef("");
  const inputRef7 = useRef("");

  // useState hook use for registration data state mamaneg //
  const [userRegister, setUserRegister] = useState({});

  // useState hook use for confirm password state manage //
  const [confirmPassword, setConfirmPassword] = useState({});

   // useState hook use for validation error messeges //
  const [error, setError] = useState({});

  // useState hook use for password input data hide/show //
  const [showPassword, setShowPassword] = useState(false);

  // function for password input data hide/show //
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // function for naviagate to login page //
  const handleNavigate = () => {
    navigate("/Login");
  };

  // function for submit regsitreion data and store into lockal storage and navigate to login page // 
  const handleRegister = (e) => {
    if (formValidation()) {
      secureLocalStorage.setItem("regsiterData", JSON.stringify(userRegister));
      Toaster(true, "Registration Successfully completed");
      setTimeout(() => {
        navigate("/Login");
      }, 1000);
      setUserRegister({
        firstname: "",
        lastname: "",
        mobile: "",
        email: "",
        password: "",
      });
      setConfirmPassword({
        confirmPassword: "",
      });
    }
  };

// function for user register data input field validation //
  const formValidation = () => {
    let fieldscopy = userRegister;
    const errors = {};
    let formIsValid = true;

    if (!fieldscopy["firstname"]) {
      formIsValid = false;
      errors["firstname"] = "* please enter your first name";
      inputRef1.current.focus();
    }

    if (typeof fieldscopy["firstname"] !== "undefined") {
      if (!fieldscopy["firstname"].match(/^[a-zA-Z]*$/)) {
        formIsValid = false;
        errors["firstname"] = "* upper case and lower case only";
        inputRef1.current.focus();
      } else if (fieldscopy["firstname"].length < 3) {
        formIsValid = false;
        errors["firstname"] = "* enter minimum 3 characters ";
        inputRef1.current.focus();
      } else if (fieldscopy["firstname"].length > 20) {
        formIsValid = false;
        errors["firstname"] = "* maximum 20 characters allow ";
        inputRef1.current.focus();
      } else {
        inputRef2.current.focus();
      }
    }

    if (!fieldscopy["lastname"]) {
      formIsValid = false;
      errors["lastname"] = "* please enter your last name";
    }

    if (typeof fieldscopy["lastname"] !== "undefined") {
      if (!fieldscopy["lastname"].match(/^[a-zA-Z]*$/)) {
        formIsValid = false;
        errors["lastname"] = "* upper case and lower case only";
        inputRef2.current.focus();
      } else if (fieldscopy["lastname"].length < 3) {
        formIsValid = false;
        errors["lastname"] = "* enter minimum 3 characters ";
        inputRef2.current.focus();
      } else if (fieldscopy["lastname"].length > 20) {
        formIsValid = false;
        errors["lastname"] = "* maximum 20 characters allow ";
        inputRef2.current.focus();
      } else {
        inputRef3.current.focus();
      }
    }

    if (!fieldscopy["mobile"]) {
      formIsValid = false;
      errors["mobile"] = "* please enter your mobile number";
    }

    if (typeof fieldscopy["mobile"] !== "undefined") {
      if (!fieldscopy["mobile"].match(/^[6-9][0-9]{9}(?![eE])$/)) {
        formIsValid = false;
        errors["mobile"] = "* 10 digit mobile number only";
        inputRef3.current.focus();
      } else {
        inputRef4.current.focus();
      }
    }

    if (!fieldscopy["email"]) {
      formIsValid = false;
      errors["email"] = "* please enter your email adress";
    }

    if (typeof fieldscopy["email"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(fieldscopy["email"])) {
        formIsValid = false;
        errors["email"] = "* please enter valid email id";
        inputRef4.current.focus();
      } else {
        inputRef5.current.focus();
      }
    }

    if (!fieldscopy["password"]) {
      formIsValid = false;
      errors["password"] = "* please enter your password";
    }

    if (typeof fieldscopy["password"] !== "undefined") {
      if (!fieldscopy["password"].match(/^[a-zA-Z0-9!@#$%]{4,16}$/)) {
        formIsValid = false;
        errors["password"] =
          "* minimum 4 and maximum 16 digit only (allow ! @ # $ % special characters only)";
        inputRef5.current.focus();
      } else {
        inputRef6.current.focus();
      }
    }

    if (!confirmPassword["confirmPassword"]) {
      formIsValid = false;
      errors["confirmPassword"] = "* please enter your confirm password";
    }

    if (typeof confirmPassword["confirmPassword"] !== "undefined") {
      if (confirmPassword["confirmPassword"] !== fieldscopy["password"]) {
        formIsValid = false;
        errors["confirmPassword"] = "* password and confirm password not match";
        inputRef6.current.focus();
      } else {
        inputRef7.current.focus();
      }
    }
    setError(errors);
    return formIsValid;
  };

  // useEffect hook for target input box, updating phase //
  useEffect(() => {
    inputRef1.current.focus();
  }, []);

  return (
    <div className="container1">
      <div className="main_page_container1">
        <div className="mid_container1">
          <div className="contain_container1">
            <div className="heading1">
              <h1>Regsiter your account</h1>
              <p>
                Sign up now to explore a vast collection of movies on our
                platform. Get ready for a cinematic experience like never
                before!
              </p>
            </div>
            <div className="input_container1">
              <input
                ref={inputRef1}
                className={error.firstname ? "error-border" : "input_tag1"}
                placeholder="First Name..."
                type="text"
                name="firstname"
                id="firstname"
                autoComplete="off"
                value={userRegister.firstname}
                onChange={(e) =>
                  setUserRegister({
                    ...userRegister,
                    firstname: e.target.value,
                  })
                }
              />
              {error.firstname ? (
                <div className="error-message">{error.firstname}</div>
              ) : (
                <div className="hidden_class">*</div>
              )}

              <input
                ref={inputRef2}
                className={error.lastname ? "error-border" : "input_tag1"}
                placeholder="Last Name..."
                type="text"
                name="lastname"
                id="lastname"
                autoComplete="off"
                value={userRegister.lastname}
                onChange={(e) =>
                  setUserRegister({ ...userRegister, lastname: e.target.value })
                }
              />
              {error.lastname ? (
                <div className="error-message">{error.lastname}</div>
              ) : (
                <div className="hidden_class">*</div>
              )}
              <input
                ref={inputRef3}
                className={error.mobile ? "error-border" : "input_tag1"}
                placeholder="Mobile Number"
                type="number"
                name="mobile"
                id="mobile"
                autoComplete="off"
                value={userRegister.mobile}
                onChange={(e) =>
                  setUserRegister({ ...userRegister, mobile: e.target.value })
                }
              />
              {error.mobile ? (
                <div className="error-message">{error.mobile}</div>
              ) : (
                <div className="hidden_class">*</div>
              )}
              <input
                ref={inputRef4}
                className={error.email ? "error-border" : "input_tag1"}
                placeholder="Email Address"
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                value={userRegister.email}
                onChange={(e) =>
                  setUserRegister({ ...userRegister, email: e.target.value })
                }
              />
              {error.email ? (
                <div className="error-message">{error.email}</div>
              ) : (
                <div className="hidden_class">*</div>
              )}
              <input
                ref={inputRef5}
                className={error.password ? "error-border" : "input_tag1"}
                placeholder="Password"
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                value={userRegister.password}
                onChange={(e) =>
                  setUserRegister({ ...userRegister, password: e.target.value })
                }
              />
              {error.password ? (
                <div className="error-message">{error.password}</div>
              ) : (
                <div className="hidden_class">*</div>
              )}
              <FormControl>
                <OutlinedInput
                  inputRef={inputRef6}
                  className={
                    error.confirmPassword ? "error-border2" : "input_tag2"
                  }
                  placeholder="Confirm Password"
                  sx={{
                    input: {
                      color: "#fff",
                      letterSpacing: "3px",
                      fontfamily: "Poppins",
                      paddingLeft: -20,
                    },
                  }}
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  autoComplete="off"
                  value={userRegister.confirmPassword}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle p assword visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOff className="visible_icon1" />
                        ) : (
                          <Visibility className="visible_icon1" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  onChange={(e) =>
                    setConfirmPassword({
                      ...confirmPassword,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </FormControl>
              {error.confirmPassword ? (
                <div className="error-message">{error.confirmPassword}</div>
              ) : (
                <div className="hidden_class">*</div>
              )}
            </div>

            <div className="Bottom_container1">
              <button
                ref={inputRef7}
                className="button1"
                type="submit"
                onClick={handleRegister}
              >
                Registration
              </button>
              <span className="line1"></span>
              <span className="signin_note">
                Already have an account ?{" "}
                <span href="" className="a_tag1" onClick={handleNavigate}>
                  Login{" "}
                </span>{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
