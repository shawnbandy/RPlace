import './main.css';
import { useContext, useRef } from 'react';

// import { loginCall } from "../../" //apicall
import AuthService from '../../context/auth'; //authcontext
import React, { useState } from 'react';
import { LOGIN } from '../../context/mutations';
import { useMutation } from '@apollo/client';
import { Navigate, Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const email = useRef();
  const password = useRef();
  const firstName = useRef();
  const lastName = useRef();

  const [loginUser, { err, data }] = useMutation(LOGIN);
  const navigate = useNavigate();

  //const { isFetching, dispatch } = useContext(AuthContext);
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const loginClick = async (e) => {
    e.preventDefault();
    console.log(formState);

    try {
      console.log('login');
      const { data } = await loginUser({
        variables: {
          email: formState.email,
          password: formState.password,
        },
      });
      console.log('data', data.loginUser);
      AuthService.login(data.loginUser.token);
      navigate('/profile');
    } catch (err) {
      console.log(err);
    }
  };

  const goRegister = async (e) => {
    navigate('/register');
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
          {data ? (
            navigate('/profile')
          ) : (
            <form className="loginBox" onSubmit={loginClick}>
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
              <button
                className="loginButton"
                type="submit"
                onClick={loginClick}>
                Login
              </button>
              <button
                className="loginRegisterButton"
                type="button"
                onClick={goRegister}>
                Sign Up
              </button>
            </form>
          )}
          {err && (
            <div className="my-3 p-3 bg-danger text-white">{err.message}</div>
          )}
        </div>
      </div>
    </div>
  );
}
