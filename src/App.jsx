import React, { useState } from "react";
import "./App.css";
import ChinhSuaThongTin from "./ChinhSuaThongTin";
import DangKy from "./DangKy";
import DangNhap from "./DangNhap";
// import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [isOpen, setIsOpen] = useState(1);

  const [account, setAccount] = useState({
    _id: "",
    pass: "",
    name: "",
    email: "",
    sex: "",
  });

  const chuyenGiaoDien = (isOpen) => {
    switch (isOpen) {
      case 1:
        return <DangNhap setIsOpen={setIsOpen} setAccount={setAccount} />;
      case 2:
        return <DangKy setIsOpen={setIsOpen} />;
      case 3:
        return <ChinhSuaThongTin setIsOpen={setIsOpen} account={account} setAccount={setAccount} />;
      default:
        return
    }
  };

  return (
    <div>
      {chuyenGiaoDien(isOpen)}
      <ToastContainer />
    </div>
  );
}

export default App;
