import "./ManageProfile.css";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "../Re-UsebleComp/Toaster";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import secureLocalStorage from "react-secure-storage";

// main (parent) function //
export const ManageProfile = () => {
  // get register data from loocal storage//
  const userInfo = JSON.parse(secureLocalStorage.getItem("regsiterData"));

  // navigate use for component navigateion //
  const navigate = useNavigate();

  // useRef hook use for target input tag //
  const inputRef1 = useRef("");
  const inputRef2 = useRef("");
  const inputRef3 = useRef("");
  const inputRef4 = useRef("");
  const inputRef5 = useRef("");
  const inputRef6 = useRef("");
  const inputRef7 = useRef("");

  // useState hook use for edit user data state manage //
  const [isEdit, setIsEdit] = useState(false);

  // useState hook use for password change state manage
  const [changePassword, setChangePassword] = useState(false);

  // useState hook use for user data show on UI  and manage data//
  const [data, setData] = useState({});
  console.log("data", data);
  // useState hook use for changed password state manage //
  const [profilePassword, setProfilePassword] = useState({});

  // useState hook use for validation error messeges //
  const [error, setError] = useState({});

  // useState hook use for password input data hide/show //
  const [showPassword, setShowPassword] = useState(false);

  // function for password input data hide/show //
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // function for edit user data //
  const handleEdit = () => {
    setIsEdit(!isEdit);
    setData(userInfo);
  };

  // function for submit user modified data into lockal storage and navigate to login page //
  const handleSubmit = () => {
    if (handleChnagevalue()) {
      if (changePassword) {
        data["password"] = profilePassword["newPassword"];
      }
      secureLocalStorage.setItem("regsiterData", JSON.stringify(data));
      secureLocalStorage.setItem("isActive", JSON.stringify(false));
      Toaster(true, "Profile update Successfully");
      setTimeout(() => {
        navigate("/Login");
      }, 1000);
      setData({
        firstname: "",
        lastname: "",
        email: "",
        mobile: "",
      });
      setProfilePassword({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  // function for user data input field validation //
  const handleChnagevalue = () => {
    var updateProfilevalue = data;
    const errors = {};
    var formIsValid = true;

    if (typeof updateProfilevalue["firstname"] !== "undefined") {
      if (updateProfilevalue["firstname"] == "") {
        formIsValid = false;
        errors["firstname"] = "* please enter your first name";
      } else if (!updateProfilevalue["firstname"].match(/^[a-zA-Z]*$/)) {
        formIsValid = false;
        errors["firstname"] = "* upper case and lower case only";
      } else if (updateProfilevalue["firstname"].length < 3) {
        formIsValid = false;
        errors["firstname"] = "* enter minimum 3 characters ";
      } else if (updateProfilevalue["firstname"].length > 20) {
        formIsValid = false;
        errors["firstname"] = "* maximum 20 characters allow ";
      }
    }
    if (typeof updateProfilevalue["lastname"] !== "undefined") {
      if (updateProfilevalue["lastname"] == "") {
        formIsValid = false;
        errors["lastname"] = "* please enter your last name";
      } else if (!updateProfilevalue["lastname"].match(/^[a-zA-Z]*$/)) {
        formIsValid = false;
        errors["lastname"] = "* upper case and lower case only";
      } else if (updateProfilevalue["lastname"].length < 3) {
        formIsValid = false;
        errors["lastname"] = "* enter minimum 3 characters ";
      } else if (updateProfilevalue["lastname"].length > 20) {
        formIsValid = false;
        errors["lastname"] = "* maximum 20 characters allow ";
      }
    }

    if (typeof updateProfilevalue["email"] !== "undefined") {
      if (updateProfilevalue["email"] == "") {
        formIsValid = false;
        errors["email"] = "* please enter your email address";
      } else if (typeof updateProfilevalue["email"] !== "undefined") {
        var pattern = new RegExp(
          /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        );
        if (!pattern.test(updateProfilevalue["email"])) {
          formIsValid = false;
          errors["email"] = "* please enter valid email id";
        }
      }
    }
    if (typeof updateProfilevalue["mobile"] !== "undefined") {
      if (updateProfilevalue["mobile"] == "") {
        formIsValid = false;
        errors["mobile"] = "* please enter your mobile number";
      } else if (
        !updateProfilevalue["mobile"].match(/^[6-9][0-9]{9}(?![eE])$/)
      ) {
        formIsValid = false;
        errors["mobile"] = "* 10 digit mobile number only";
      }
    }
    if (changePassword) {
      if (!profilePassword["oldPassword"]) {
        formIsValid = false;
        errors["oldPassword"] = "* please enter old password";
      } else if (typeof profilePassword["oldPassword"] !== "undefined") {
        if (profilePassword["oldPassword"] == "") {
          formIsValid = false;
          errors["oldPassword"] = "* please enter old password";
        } else if (profilePassword["oldPassword"] !== userInfo["password"]) {
          formIsValid = false;
          errors["oldPassword"] = "* old password is wrong";
        }
      }
      if (!profilePassword["newPassword"]) {
        formIsValid = false;
        errors["newPassword"] = "* please enter new password";
      } else if (typeof profilePassword["newPassword"] !== "undefined") {
        if (profilePassword["newPassword"] == "") {
          formIsValid = false;
          errors["newPassword"] = "* please enter new password";
        } else if (
          !profilePassword["newPassword"].match(/^[a-zA-Z0-9!@#$%]{4,16}$/)
        ) {
          formIsValid = false;
          errors["newPassword"] =
            "* min 4 and maxi 16 digit only (! @ # $ %only)";
        }
      }
      if (!profilePassword["confirmPassword"]) {
        formIsValid = false;
        errors["confirmPassword"] = "* please enter your confirm password";
      } else if (typeof profilePassword["confirmPassword"] !== "undefined") {
        if (
          profilePassword["confirmPassword"] !== profilePassword["newPassword"]
        ) {
          formIsValid = false;
          errors["confirmPassword"] =
            "* password and confirm password not match";
        }
      }
    }
    setError(errors);
    return formIsValid;
  };

  // useEffect hook use for update state //
  useEffect(() => {
    setIsEdit(!isEdit);
    setChangePassword(false);
  }, []);
  return (
    <div>
      <div className="profile_container">
        <div className="profile_main">
          <div className="top_profile_data_container">
            <div className="profile_heading">
              <h2>Your Name : </h2>
              <h2>Email Adress :</h2>
              <h2>Mobile Number :</h2>
            </div>
            {isEdit ? (
              <div className="profile_data">
                <h2>{`${userInfo.firstname} ${userInfo.lastname}`} </h2>
                <h2>{userInfo.email}</h2>
                <h2>{userInfo.mobile}</h2>
              </div>
            ) : (
              <div className="input_div">
                <div className="firstname_lastname_input">
                  <div className="inputAndError">
                    <input
                      ref={inputRef1}
                      value={data.firstname}
                      className={
                        error.firstname
                          ? "profile_error-border3"
                          : "profile_input_tag3"
                      }
                      placeholder="First Name..."
                      type="text"
                      name="firstname"
                      id="firstname"
                      autoComplete="off"
                      onChange={(e) =>
                        setData({ ...data, firstname: e.target.value })
                      }
                    />
                    {error.firstname ? (
                      <div className="profile_error-message">
                        {error.firstname}
                      </div>
                    ) : (
                      <div className="profile_hidden_class">*</div>
                    )}
                  </div>
                  <div className="inputAndError">
                    <input
                      ref={inputRef2}
                      value={data.lastname}
                      className={
                        error.lastname
                          ? "profile_error-border3"
                          : "profile_input_tag3"
                      }
                      placeholder="Last Name..."
                      type="text"
                      name="lastname"
                      id="lastname"
                      autoComplete="off"
                      onChange={(e) =>
                        setData({ ...data, lastname: e.target.value })
                      }
                    />
                    {error.lastname ? (
                      <div className="profile_error-message">
                        {error.lastname}
                      </div>
                    ) : (
                      <div className="profile_hidden_class">*</div>
                    )}
                  </div>
                </div>

                <div className="inputAndError">
                  <input
                    ref={inputRef3}
                    value={data.email}
                    className={
                      error.email ? "profile_error-border" : "profile_input_tag"
                    }
                    placeholder="Email Address..."
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                  {error.email ? (
                    <div className="profile_error-message">{error.email}</div>
                  ) : (
                    <div className="profile_hidden_class">*</div>
                  )}
                </div>

                <div className="inputAndError">
                  <input
                    ref={inputRef4}
                    value={data.mobile}
                    className={
                      error.mobile
                        ? "profile_error-border"
                        : "profile_input_tag"
                    }
                    placeholder="Mobile Number Only"
                    type="number"
                    name="mobile"
                    id="mobile"
                    autoComplete="off"
                    onChange={(e) =>
                      setData({ ...data, mobile: e.target.value })
                    }
                  />
                  {error.mobile ? (
                    <div className="profile_error-message">{error.mobile}</div>
                  ) : (
                    <div className="profile_hidden_class">*</div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="middle_profile_data_container">
            <div className="profile_middle_heading">
              {changePassword ? (
                <>
                  <h2>Old Password :</h2>
                  <h2>New Password :</h2>
                  <h2>Confirm Password :</h2>
                </>
              ) : (
                <h2>Password :</h2>
              )}
            </div>
            {changePassword ? (
              <div className="profile_password_input_div">
                <div className="password_inputAndError">
                  <input
                    ref={inputRef5}
                    value={profilePassword.oldPassword}
                    className={
                      error.oldPassword
                        ? "profile_error-border"
                        : "profile_input_tag"
                    }
                    placeholder="Old Password"
                    type="password"
                    name="oldPassword"
                    id="oldPassword"
                    autoComplete="off"
                    onChange={(e) =>
                      setProfilePassword({
                        ...profilePassword,
                        oldPassword: e.target.value,
                      })
                    }
                  />
                  {error.oldPassword ? (
                    <div className="profile_error-message">
                      {error.oldPassword}
                    </div>
                  ) : (
                    <div className="profile_hidden_class">*</div>
                  )}
                </div>
                <div className="password_inputAndError">
                  <input
                    ref={inputRef6}
                    value={profilePassword.newPassword}
                    className={
                      error.newPassword
                        ? "profile_error-border"
                        : "profile_input_tag"
                    }
                    placeholder="New Password"
                    type="password"
                    name="newPassword"
                    autoComplete="off"
                    onChange={(e) =>
                      setProfilePassword({
                        ...profilePassword,
                        newPassword: e.target.value,
                      })
                    }
                  />
                  {error.newPassword ? (
                    <div className="profile_error-message">
                      {error.newPassword}
                    </div>
                  ) : (
                    <div className="profile_hidden_class">*</div>
                  )}
                </div>
                <div className="password_inputAndError">
                  <FormControl>
                    <OutlinedInput
                      ref={inputRef7}
                      className={
                        error.confirmPassword
                          ? "profile_error-border2"
                          : "profile_input_tag2"
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
                      value={profilePassword.confirmPassword}
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
                        setProfilePassword({
                          ...profilePassword,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  {error.confirmPassword ? (
                    <div className="profile_error-message">
                      {error.confirmPassword}
                    </div>
                  ) : (
                    <div className="profile_hidden_class">*</div>
                  )}
                </div>
              </div>
            ) : (
              <div className="profile_data_middle">
                <h2>*****************</h2>
              </div>
            )}
            {!isEdit ? (
              <div className="change_password">
                <a onClick={() => setChangePassword(!changePassword)}>
                  {changePassword ? "cancel" : "change password"}
                </a>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="button_div">
            {isEdit ? (
              <button onClick={handleEdit} className="editButton">
                Edit
              </button>
            ) : (
              <button onClick={handleSubmit} className="submitButton">
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
