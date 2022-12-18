import React from 'react';
import NavbarComponent from './navbar/navbar';
import { Outlet } from 'react-router';

export default () => {
  return (
    <>
      <NavbarComponent />
      <Outlet />
    </>
  );
};