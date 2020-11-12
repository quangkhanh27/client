import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import axios from "axios";
import api_url from "./constant";

const ChinhSuaThongTin = (props) => {
  const { account, setAccount, setIsOpen } = props;

  const [obj, setObj] = useState({
    name: "",
    _id: "",
    pass: "",
    email: "",
    sex: "",
  });

  const handleChange = (e) => {
    let new_obj = { ...obj };
    new_obj[e.target.name] = e.target.value;
    setObj(new_obj);
    console.log(new_obj);
  };

  const handleClickChinhSua = () => {
    if (ktNhapDuLieu() === true) {
      updateAccount(obj);
    }
  };

  const ktNhapDuLieu = () => {
    if (obj["pass"].length === 0) {
      toast.error("Không được để Mật khẩu trống");
      return false;
    }
    if (obj["name"].length === 0) {
      toast.error("Không được để Họ và tên trống");
      return false;
    }
    if (obj["email"].length === 0) {
      toast.error("Không được để Email trống");
      return false;
    }
    return true;
  };

  const updateAccount = (obj) => {
    axios({
      method: "put",
      url: `${api_url}/login`,
      data: obj,
    }).then((res) => {
      console.log(res);
      toast.success(res.data);
      setAccount(obj);
      // setIsOpen(3);
    });
  };

  useEffect(() => {
    setObj(account);
  }, []);

  return (
    <div className="container">
      <aside className="col-sm-8">
        <div className="card">
          <article className="card-body">
            <h4 className="card-title text-center mb-4 mt-1">
              Thông tin tài khoản
            </h4>
            <hr />
            <p className="text-success text-center"></p>
            <form>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <label style={{ marginRight: "8px" }}>Tên đăng nhập:</label>
                  </div>
                  <input
                    name="_id"
                    className="form-control"
                    value={obj["_id"]}
                    onChange={handleChange}
                    disabled
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <label style={{ marginRight: "46px" }}>Mật khẩu: </label>
                  </div>
                  <input
                    name="pass"
                    className="form-control"
                    value={obj["pass"]}
                    type="password"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <label style={{ marginRight: "45px" }}>Họ và tên:</label>
                  </div>
                  <input
                    name="name"
                    className="form-control"
                    value={obj["name"]}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <label style={{ marginRight: "75px" }}>Email:</label>
                  </div>
                  <input
                    name="email"
                    className="form-control"
                    value={obj["email"]}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Giới tính</label>
                <div className="radio">
                  <label>
                    <input
                      id="male"
                      type="radio"
                      value="male"
                      name="sex"
                      checked={obj.sex === "male" ? true : false}
                      onChange={handleChange}
                      style={{ marginLeft: "50px" }}
                    />
                    <span style={{ marginLeft: "7px" }}>Nam</span>
                    <input
                      id="female"
                      type="radio"
                      value="female"
                      name="sex"
                      checked={obj.sex === "female" ? true : false}
                      onChange={handleChange}
                      style={{ marginLeft: "100px" }}
                    />
                    <span style={{ marginLeft: "7px" }}>Nữ</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <div
                  className="btn btn-primary btn-block"
                  onClick={handleClickChinhSua}
                >
                  Chỉnh sửa
                </div>
                <div
                  className="btn btn-primary btn-block"
                  onClick={() => setIsOpen(1)}
                >
                  Đăng xuất
                </div>
              </div>
            </form>
          </article>
        </div>
      </aside>
    </div>
  );
};

export default ChinhSuaThongTin;
