import React from 'react';
import LoginPage from './LoginPage';

export default {
  loginPage: {
    path: '/',
    component: LoginPage,
    exact: true,
  },
  http404: {
    path: '*',
    component: () => <h1>404 Not Found</h1>,
  },
};
