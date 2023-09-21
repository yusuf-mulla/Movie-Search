import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./NavBar/NavBar";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { Home } from "./Pages/Home";
import { MyFevorite } from "./Pages/MyFevorite";
import { ManageProfile } from "./Pages/ManageProfile";
export const RouteData = () => {
  useEffect(()=>{
  
  },[NavBar])  
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          {/* Top Nav Bar */}
          <Route path="/" element={<Home />} />
          <Route path="/myfevorite" element={<MyFevorite />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/manageprofile" element={<ManageProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
