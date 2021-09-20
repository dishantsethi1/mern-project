import React from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const history = useHistory();
  const [users, set] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });
  const dos = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name);
    set({ ...users, [name]: value });
  };

  const sendData = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = users;

    const res = await axios.post("http://localhost:5000/register", {
      name,
      email,
      phone,
      work,
      password,
      cpassword,
    });
    const data = res.data;
    if (res.status === 422 || !data) {
      window.alert("not properly filled");
    } else {
      window.alert("user registered successfully");
      set({
        name: "",
        email: "",
        phone: "",
        work: "",
        password: "",
        cpassword: "",
      });
      history.push("/");
    }
  };
  return (
    <>
      <div>
        <h1>Sign up</h1>
      </div>
      <div>
        <NavLink to="/login">Already a User? Sign IN</NavLink>
      </div>
      <form method="POST">
        <div>
          <label htmlFor="name">
            <i class="zmdi zmdi-account-add material-icons-name"></i>
          </label>
          <input
            type="text"
            name="name"
            autoComplete="off"
            value={users.name}
            onChange={dos}
          />
        </div>
        <div>
          <label htmlFor="email">
            <i class="zmdi zmdi-email material-icons-name"></i>
          </label>
          <input
            type="email"
            name="email"
            autoComplete="off"
            value={users.email}
            onChange={dos}
          />
        </div>
        <div>
          <label htmlFor="phone">
            <i class="zmdi zmdi-phone-in-talk material-icons-name"></i>
          </label>
          <input
            type="text"
            name="phone"
            autoComplete="off"
            value={users.phone}
            onChange={dos}
          />
        </div>
        <div>
          <label htmlFor="work">
            <i class="zmdi zmdi-slideshow material-icons-name"></i>
          </label>
          <input
            type="text"
            name="work"
            autoComplete="off"
            value={users.work}
            onChange={dos}
          />
        </div>
        <div>
          <label htmlFor="password">
            <i class="zmdi zmdi-lock material-icons-name"></i>
          </label>
          <input
            type="password"
            name="password"
            autoComplete="off"
            value={users.password}
            onChange={dos}
          />
        </div>
        <div>
          <label htmlFor="cpassword">
            <i class="zmdi zmdi-lock material-icons-name"></i>
          </label>
          <input
            type="password"
            name="cpassword"
            autoComplete="off"
            value={users.cpassword}
            onChange={dos}
          />
        </div>

        <div>
          <input
            type="submit"
            name="signup"
            value="Register"
            onClick={sendData}
          />
        </div>
      </form>
    </>
  );
};

export default Signup;
