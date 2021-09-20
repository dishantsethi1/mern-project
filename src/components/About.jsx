import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const About = () => {
  const history = useHistory();
  const [userdata, setData] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });
  const callAboutPage = async () => {
    try {
      const res = await axios.get("http://localhost:5000/about", {
        withCredentials: true,
      });
      const data = res.data;
      setData(data);

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
      <div className="container emp-profile">
        <form method="GET">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                <img src="https://picsum.photos/200" alt="abhi" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h5>{userdata.name}</h5>
                <h6>{userdata.work}</h6>
                <p className="profile-rating mt-3 mb-5">
                  RANKINGS<span>1/10</span>
                </p>
                <ul className="nav" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                    >
                      about
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2"></div>
            <div className="row">
              l
              <div className="col-md-4">
                <div className="profile-work">
                  <p>work link</p>
                </div>
              </div>
            </div>
            <div className="col-md-8 pl-5 about-info">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>USER ID</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userdata.email}</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>name</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userdata.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default About;
