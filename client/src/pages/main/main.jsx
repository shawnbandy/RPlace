import './main.css';
import { useContext, useRef } from 'react';

// import { loginCall } from "../../" //apicall
import { AuthContext } from '../../context/AuthContext'; //authcontext
import { useState } from 'react';

export default function Login() {
  const email = useRef();
  const password = useRef();
  const firstName = useRef();
  const lastName = useRef();
  //!import addUser Mutation here

  const { isFetching, dispatch } = useContext(AuthContext);
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const handleClick = async (e) => {
    e.preventDefault();
    const mutationResponse = '';

    await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });

    // loginCall({
    //     email: email.current.value, password: password.current.value}, dispatch)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
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
              type="firstName"
            />
            <input
              placeholder="Last Name"
              required
              ref={lastName}
              className="loginInput"
              type="lastName"
            />
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
