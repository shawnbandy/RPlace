import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router";

export default function Register() {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  // const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity(
        "Passwords do not match! Please Retype the password!"
      );
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/"); //leaving this until corey finishes auth related work
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">ЯPlace</h3>
          <span className="loginDesc">
            In ЯPlace, we are all connected as one.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="First Name"
              required
              ref={firstName}
              className="loginInput"
              type="text"
              name="firstName"
              value={formState.firstName}
              onChange={handleChange}
            />
            <input
              placeholder="Last Name"
              required
              ref={lastName}
              className="loginInput"
              type="text"
              name="lastName"
              value={formState.lastName}
              onChange={handleChange}
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
              name="password"
              value={formState.password}
              onChange={handleChange}
            />
            <input
              placeholder="Retype Password"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
              name="passwordAgain"
              value={formState.passwordAgain}
              onChange={handleChange}
            />
            <button className="signupButton" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
