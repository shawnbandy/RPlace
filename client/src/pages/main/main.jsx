import './main.css';
import { useContext, useRef } from 'react';

// import { loginCall } from "../../" //apicall
import AuthService from '../../context/auth'; //authcontext
import React, { useState } from 'react';
import { ADD_USER } from '../../context/mutations';
import { useMutation } from '@apollo/client';

export default function Login() {
  const email = useRef();
  const password = useRef();
  // const firstName = useRef();
  // const lastName = useRef();
  const [addUser, { error, data }] = useMutation(ADD_USER);

  //const { isFetching, dispatch } = useContext(AuthContext);
  const [formState, setFormState] = useState({
    // firstName: '',
    // lastName: '',
    email: '',
    password: '',
  });

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(formState);

    try {
      console.log('hello0');
      const { data } = await addUser({
        variables: { ...formState },
      });
      console.log(data);
      AuthService.Login(data.addUser.token);
    } catch (err) {
      console.error(e);
    }

    // loginCall({
    //     email: email.current.value, password: password.current.value}, dispatch)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    console.log(formState);
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
            {/* <input
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
            /> */}
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="text"
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
            <button className="loginButton">Login</button>
            <button className="loginRegisterButton" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
