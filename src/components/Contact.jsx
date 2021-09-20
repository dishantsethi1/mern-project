import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Contact = () => {
  const history = useHistory();
  const [contact, setC] = useState({
    name: "",

    email: "",
    phone: "",
    message: "",
  });
  const dos = (e) => {
    const { name, value } = e.target;
    setC({ ...contact, [name]: value });
  };

  const sendData = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = contact;

    const res = await axios.post("http://localhost:5000/contact", {
      name,
      email,
      phone,
      message,
    });
    const data = res.data;
    if (res.status === 422 || !data) {
      window.alert("please fill the form properlly");
    } else {
      window.alert("send ");
      setC({
        name: "",

        email: "",
        phone: "",
        message: "",
      });
      history.push("/");
    }
  };
  return (
    <>
      <div>
        <div>
          <div>
            <div>
              <h1>Phone</h1>
            </div>
            <div>
              <h1>Phone</h1>
            </div>
            <div>
              <h1>Phone</h1>
            </div>
          </div>
          <div className="main-form">
            <form action="POST">
              <div>
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={contact.name}
                    onChange={dos}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={contact.email}
                    onChange={dos}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Your Phone No"
                    value={contact.phone}
                    onChange={dos}
                  />
                </div>
              </div>
              <div>
                <textarea
                  type="text"
                  name="message"
                  placeholder="Message"
                  value={contact.message}
                  onChange={dos}
                />
              </div>
              <div>
                <input
                  type="submit"
                  value="Send"
                  name="contact"
                  onClick={sendData}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
