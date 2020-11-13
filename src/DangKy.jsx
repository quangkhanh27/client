import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import axios from "axios";
import api_url from './constant'

const DangKy = (props) => {
  const [obj, setObj] = useState({
    name: "",
    _id: "",
    pass: "",
    pass1: "",
    email: "",
    sex: "male",
  });

  console.log(process.env);
  const handleChange = (e) => {
    let new_obj = { ...obj };

    new_obj[e.target.name] = e.target.value;
    setObj(new_obj);
    console.log(new_obj);
  };

  const handleClickDangKy = () => {
    check_id(obj['_id'])
  };

  const ktNhapDuLieu = () => {
    if (obj["name"].length === 0) {
      toast.error("Không được để Họ và tên trống");
      return false;
    }
    if (obj["_id"].length === 0) {
      toast.error("Không được để Tên đăng nhập trống");
      return false;
    }
    if (obj["pass"].length === 0) {
      toast.error("Không được để Mật khẩu trống");
      return false;
    }
    if (obj["pass1"].length === 0) {
      toast.error("Không được để Nhập lại mật khẩu trống");
      return false;
    }
    if (obj["email"].length === 0) {
      toast.error("Không được để Email trống");
      return false;
    }
    if (obj["pass"] !== obj["pass1"]) {
      toast.error("Mật khẩu và Nhập lại mật khẩu phải giống nhau");
      return false;
    }
    return true;
  };

  const addAccount = (obj) => {
    axios({
      method: "post",
      url: `${api_url}/addtodo`,
      data: obj,
    }).then((res) => {
      console.log(res);
      toast.success(res.data);
    });
  };

  const check_id = (_id) => {
    console.log(_id);
    axios({
      method: "get",
      url: `${api_url}/checkid/?_id=${_id}`,
    })
      .then((res) => {
        if (ktNhapDuLieu()) {
          const {_id,pass,name,email,sex} = obj
          let new_obj = {_id,pass,name,email,sex}
          addAccount(new_obj)
          props.setIsOpen(1);
        }
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
            <h4 className="card-title mb-4 mt-1">Đăng ký</h4>
            <form>
              <div className="form-group">
                <label>Họ và tên</label>
                <input
                  name="name"
                  className="form-control"
                  placeholder="Họ và tên"
                  onChange={handleChange}
                />
              </div>

              {/* Tên đăng nhập */}
              <div className="form-group">
                <label>Tên đăng nhập</label>
                <input
                  name="_id"
                  className="form-control"
                  placeholder="Tên đăng nhập"
                  onChange={handleChange}
                />
              </div>

              {/* Mật khẩu */}
              <div className="form-group">
                <label>Nhập mật khẩu</label>
                <input
                  name="pass"
                  className="form-control"
                  placeholder="Ít nhất 6 ký tự"
                  type="password"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Nhập lại mật khẩu</label>
                <input
                  name="pass1"
                  className="form-control"
                  placeholder="Ít nhất 6 ký tự"
                  type="password"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  name="email"
                  className="form-control"
                  placeholder="abc@gmail.com"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Giới tính</label>
                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      value="male"
                      defaultChecked
                      name="sex"
                      style={{ marginLeft: "50px" }}
                      onChange={handleChange}
                    />
                    <span style={{ marginLeft: "7px" }}>Nam</span>
                    <input
                      type="radio"
                      value="female"
                      name="sex"
                      style={{ marginLeft: "100px" }}
                      onChange={handleChange}
                    />
                    <span style={{ marginLeft: "7px" }}>Nữ</span>
                  </label>
                </div>
              </div>
              <div className="form-group">
                <div
                  className="btn btn-primary btn-block"
                  onClick={handleClickDangKy}
                >
                  Đăng ký
                </div>
              </div>
            </form>
          </article>
        </div>
      </aside>
    </div>
  );
};

export default React.memo(DangKy);
