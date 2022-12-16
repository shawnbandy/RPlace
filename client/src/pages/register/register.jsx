import React, { useRef, useState } from 'react';
import './register.css';
import { useHistory, useNavigate } from 'react-router-dom';
import { ADD_USER } from '../../context/mutations';
import { useMutation } from '@apollo/client';
import AuthService from '../../context/auth';

export default function Register() {
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordAgain: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const signUpUser = async (e) => {
    e.preventDefault();

    if (password.current.value != passwordAgain.current.value) {
      console.log('Please make sure your password match');
      return;
    }

    try {
      console.log('signUp');
      const { data } = await addUser({
        variables: {
          firstName: formState.firstName,
          lastName: formState.lastName,
          email: formState.email,
          password: formState.password,
        },
      });

      AuthService.login(data.addUser.token);
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    console.log(formState);
  };

  const goLogin = async (e) => {
    navigate('/login');
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
            <form className="registerBox" onSubmit={signUpUser}>
              <input
                placeholder="First Name"
                required
                className="loginInput"
                type="text"
                name="firstName"
                value={formState.firstName}
                onChange={handleChange}
              />
              <input
                placeholder="Last Name"
                required
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
              <input
                placeholder="Password"
                required
                ref={passwordAgain}
                className="loginInput"
                type="password"
                minLength="6"
                name="passwordAgain"
                value={formState.passwordAgain}
                onChange={handleChange}
              />
              <button
                className="signupButton"
                type="submit"
                onClick={signUpUser}>
                Sign Up
              </button>
              <button className="backButton" type="button" onClick={goLogin}>
                Back
              </button>
            </form>
          )}
          {error && (
            <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
          )}
        </div>
      </div>
    </div>
  );
}
