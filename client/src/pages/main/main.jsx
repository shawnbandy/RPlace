import "./main.css";
import { useContext, useRef } from "react";

// import { loginCall } from "../../" //apicall
import { AuthContext } from "../../context/AuthContext" //authcontext

export default function Login(){
    const email = useRef();
    const password = useRef();
    const { isFetching, dispatch } = useContext(AuthContext); 


const handleClick = async (e) => {
    e.preventDefault();
    // loginCall({
    //     email: email.current.value, password: password.current.value}, dispatch)
}

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
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <button className="loginRegisterButton">Log into Account</button>
            <button className="loginButton" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}