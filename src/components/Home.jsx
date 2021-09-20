import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  const history = useHistory();
  const [userdata, setData] = useState("");
  const [show, setShow] = useState(false);
  const callAboutPage = async () => {
    try {
      const res = await axios.get("http://localhost:5000/about", {
        withCredentials: true,
      });
      const data = res.data;
      setData(data.name);
      setShow(true);

      if (!res.status === 200) {
        throw new Error(res.error);
      }
    } catch (err) {
      console.log(err);
      history.push("/");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <Mainone>
        <h1 className="heading1">Welcome</h1>
        <span>{userdata}</span>
        <h3>{show ? "happy to see you back" : "Please Login "}</h3>
      </Mainone>
    </>
  );
};

export default Home;
const Mainone = styled.div`
  color: #ffffff;
  font-size: 50px;
  background-color: black;
  .heading1 {
    color: red;
  }
`;
