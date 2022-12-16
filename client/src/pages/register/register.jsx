import { useRef } from "react";
import "./register.css";

export default function Register(){
    const firstName = useRef();
    const lastName = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();


const handleClick = async (e) => {
    e.preventDefault();
    // if(passwordAgain.current.value !== password.current.value){
    //     passwordAgain.current.setCustomValidity("Passwords do not match! Please Retype the password!");
    // }
    // else{
    //     const user ={
    //         username: username.current.value,
    //         email: email.current.value,
    //         password: password.current.value,
    //     };
    //     try{
    //         await axios.post("/")  //leaving this until corey finishes auth related work
    //     } catch(err){
    //         console.log(err);
    //     }
    // }
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
              placeholder="First Name"
              required
              ref={firstName}
              className="loginInput"
              type="text"
              name="firstName"
            />
            <input
              placeholder="Last Name"
              required
              ref={lastName}
              className="loginInput"
              type="text"
              name="lastName"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
              name="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
              name="password"
            />
            <input
              placeholder="Retype Password"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
              name="passwordAgain"
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
