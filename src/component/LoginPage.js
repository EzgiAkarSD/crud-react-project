import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/loginpage.scss";

function LoginPage() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState(false);
  const navigate = useNavigate();

  const mainContainer = {
    header: 'MANAGE COURSES',
    user: {
      name: "John Doe",
      title: "Admin",
      image: require("../images/avatar.png"),
      alt: "avatar",
    },
    menuTabs: [
      {
        id: 1,
        image: require("../images/home.png"),
        alt: "home-icon",
        text: "Home",
        onClick: "/dashboard",
      },
      {
        id: 2,
        image: require("../images/graduation.png"),
        alt: "graduation",
        text: "Students",
        onClick: "/student",
      }
    ],
    logout: {
      text: "Logout",
      image: require("../images/signout.png"),
      alt: "signout",
      onClick: "/"
    },
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if (user.email && user.password) {
      localStorage.setItem("mainContainer", JSON.stringify(mainContainer));
      fetch("https://dummyjson.com/users")
        .then((res) => res.json())
        .then((res) => {
          const students = res.users.map((user) => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            domain: user.domain,
            image: user.image
          }));
          localStorage.setItem("students", JSON.stringify(students));
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
      navigate("/dashboard");
    } else {
      setErrorMsg(true);
    }
  };
  return (
    <div className="container">
      <div className="container-card">
        <div className="container-card-title">
          <div className="container-card-title-line"></div>
          <div className="container-card-title-text">MANAGE COURSES</div>
        </div>
        <div className="container-card-subtitle">
          <div className="container-card-subtitle-text">SIGN IN</div>
          <div className="container-card-subtitle-subtext">
            Enter your credentials to access your account
          </div>
        </div>
        <div className="container-card-inputs">
          <div className="container-card-inputs-text">Email</div>
          <input
            className="container-card-inputs-input"
            type="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          ></input>
          <div className="container-card-inputs-text">Password</div>
          <input
            className="container-card-inputs-input"
            type="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          ></input>
          <div
            className={errorMsg ? "error-message" : "error-message-not-visible"}
          >
            <div>Please enter your email and password!</div>
          </div>
        </div>
        <button className="sign-in-button" onClick={handleSignIn}>
          SIGN IN
        </button>
        <div className="container-card-footer">
          <div className="container-card-footer-forgot-password">
            Forgot your password?
          </div>
          <div className="container-card-footer-reset-password">
            Reset Password
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
