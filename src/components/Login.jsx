import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";
const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [email, setemail] = useState("");
  const [password, setp] = useState("");
  const sendData = async (e) => {
    e.preventDefault();
    // (!password || !setp) && alert("dwert");
    const res = await fetch("http://localhost:5000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = res.json();
    if (res.status === 400 || !data) {
      window.alert("invalid credentials");
    } else {
      dispatch({ type: "USER", payload: true });
      window.alert("login success");
      history.push("/");
    }
  };
  return (
    <>
      <div>
        <h1>Login</h1>
      </div>
      <div>
        <NavLink to="/signup">Not a user ? Sign up</NavLink>
      </div>
      <form method="POST" onSubmit={sendData}>
        <div>
          <label htmlFor="email">
            <i className="zmdi zmdi-email material-icons-name"></i>
          </label>
          <input
            type="email"
            name="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setemail(e.target.value)}
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
            value={password}
            onChange={(e) => setp(e.target.value)}
          />
        </div>
        <div>
          <button>Log In</button>
        </div>
      </form>
    </>
  );
};

export default Login;
