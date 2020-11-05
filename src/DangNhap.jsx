import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import api_url from "./constant";

const DangNhap = (props) => {
  console.log("Dang nhap render");

  const { setIsOpen, setAccount } = props;
  const [taiKhoan, setTaiKhoan] = useState({
    _id: "",
    pass: "",
  });

  const handleChange = (e) => {
    let new_taiKhoan = { ...taiKhoan };
    new_taiKhoan[e.target.name] = e.target.value;
    setTaiKhoan(new_taiKhoan);
    console.log(new_taiKhoan);
  };

  const handleClickDangNhap = () => {
    if (ktNhapDuLieu() === true) {
      checkLogin(taiKhoan);
    }
  };

  const handleClickDangKy = () => {
    setIsOpen(2);
  };

  const ktNhapDuLieu = () => {
    if (taiKhoan["_id"].length === 0) {
      toast.error("Không được để tên đăng nhập trống");
      return false;
    }
    if (taiKhoan["pass"].length === 0) {
      toast.error("Không được để mật khẩu trống");
      return false;
    }
    return true;
  };

  const checkLogin = (taiKhoan) => {
    axios({
      method: "post",
      url: `${api_url}/login`,
      data: taiKhoan,
    })
      .then((res) => {
        console.log(res);
        toast.success(res.data.status);
        setAccount(res.data.user);
        setIsOpen(3);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  return (
    <div className="container">
      <aside className="col-sm-4">
        <div className="card">
          <article className="card-body">
            <h4 className="card-title text-center mb-4 mt-1">Đăng nhập</h4>
            <hr />
            <p className="text-success text-center"></p>
            <form>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-user"></i>
                    </span>
                  </div>
                  <input
                    name="_id"
                    className="form-control"
                    placeholder="Tên đăng nhập"
                    type=""
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-lock"></i>
                    </span>
                  </div>
                  <input
                    name="pass"
                    className="form-control"
                    placeholder="Mật khẩu"
                    type="password"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <div
                  className="btn btn-primary btn-block"
                  onClick={handleClickDangNhap}
                >
                  Đăng nhập
                </div>

                <p className="text-center">
                  <a className="btn" onClick={handleClickDangKy}>
                    Đăng ký
                  </a>
                </p>
              </div>
            </form>
          </article>
        </div>
      </aside>
    </div>
  );
};

export default React.memo(DangNhap);
