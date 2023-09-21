import "./NavBar.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import SegmentSharpIcon from "@mui/icons-material/SegmentSharp";
import { deepPurple } from "@mui/material/colors";
import Popup from "reactjs-popup";
import secureLocalStorage from "react-secure-storage";

// main (parent) function //
export const NavBar = () => {
  // redux hook use for dispatch state at aplication lavel//
  const dispatch = useDispatch();

  // navigate use for component navigate //
  const navigate = useNavigate();

  // get data from lockal storage//
  const userInfo = JSON.parse(secureLocalStorage.getItem("regsiterData"));
  const isActive = JSON.parse(secureLocalStorage.getItem("isActive"));

  // useState hook use for search bar satate manage //
  const [search, setSearch] = useState("");

  //useState hook use for togle side bar menu state manage  //
  const [isOpen, setIsOpen] = useState(false);

  // function for submit button //
  const searchSubmit = () => {
    dispatch({
      type: "TAKE_SEARCH_DATA",
      payload: search,
    });
    setSearch("");
  };

  // function for logout //
  const handleLogOut = () => {
    secureLocalStorage.setItem("isActive", JSON.stringify(false));
    setTimeout(() => {
      navigate("/Login");
    }, 1000);
  };

  // function for manage profile //
  const handleProfile = () => {
    navigate("/manageprofile");
  };

return (
    <div>
      {/* Top Nav-Bar start */}
      <div className="top_nav_container">
        <div className="nav_icon_container">
          <h2 className="Logo">DC</h2>
          <h2 className="name">MovieFinder</h2>
        </div>
        <div className="nav_search_container">
          <input
            value={search}
            placeholder="Search for movie"
            className="searchBar"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="contained" onClick={() => searchSubmit()}>
            Search
          </Button>
        </div>
        <div
          className={
            isOpen
              ? "container_Sidebar container_Sidebar_responsive"
              : "container_Sidebar"
          }
        >
          <div className="hamburger">
            <SegmentSharpIcon onClick={() => setIsOpen(!isOpen)} />
          </div>

          {/* Top nav baar link tag start, for responsive ( mobile,tablet )*/}
          <div className={isOpen ? "nav_login_container2" : "display_block"}>
            <ul>
              <li onClick={() => setIsOpen(!isOpen)}>
                <Link to="/">Home</Link>
              </li>
            </ul>
            <ul>
              <li onClick={() => setIsOpen(!isOpen)}>
                <Link to="/myfevorite">MyFevorite</Link>
              </li>
            </ul>
            {isActive ? (
              <>
                <ul>
                  <li onClick={() => setIsOpen(!isOpen)}>
                    <span onClick={handleProfile}>Manage Profile</span>
                  </li>
                </ul>
                <ul>
                  <li onClick={() => setIsOpen(!isOpen)}>
                    <span onClick={handleLogOut}>Log Out</span>
                  </li>
                </ul>
              </>
            ) : (
              <>
                {" "}
                <ul>
                  <li onClick={() => setIsOpen(!isOpen)}>
                    <Link to="/login">Login</Link>
                  </li>
                </ul>
                <ul>
                  <li onClick={() => setIsOpen(!isOpen)}>
                    <Link to="/register">Register</Link>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
        {/* Top nav baar link tag end, for responsive ( mobile,tablet )*/}

        {/* Top nav baar link tag start, for responsive ( desktop )*/}
        <div className="nav_login_container">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/myfevorite">MyFevorite</Link>
            </li>
          </ul>
          {isActive ? (
            <>
              <div className="nav_profile_container">
                <ul>Profile</ul>
                <Popup
                  trigger={
                    <Avatar
                      sx={{ bgcolor: deepPurple[500], cursor: "pointer" }}
                    >{`${userInfo.firstname[0].toUpperCase()}${userInfo.lastname[0].toUpperCase()}`}</Avatar>
                  }
                >
                  <div className="popUp_profile_container">
                    <div className="popup_heading_container">
                      <span className="popup_heading">
                        {`${userInfo.firstname.toUpperCase()} ${userInfo.lastname.toUpperCase()}`}
                      </span>
                      <span className="popup_email">{userInfo.email}</span>
                      <span className="popup_line"></span>
                    </div>
                    <div className="popup_linktag">
                      <h onClick={handleProfile}>Manage Profile</h>
                      <h>Settings</h>
                      <h onClick={handleLogOut}>Log Out</h>
                    </div>
                  </div>
                </Popup>
              </div>
              <Link to="/manageprofile"></Link>{" "}
            </>
          ) : (
            <>
              <ul>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </ul>
            </>
          )}
        </div>
        {/* Top nav baar link tag end, for responsive ( desktop )*/}

        {/*Top Nav-Bar end  */}
      </div>
    </div>
  );
};
