import React from 'react';
import LoginPage from './LoginPage';
import SessionsPage from './SessionsPage';

export default {
  login: {
    path: '/',
    component: LoginPage,
    exact: true,
  },
  sessions: {
    path: '/sessions',
    component: SessionsPage,
    exact: true,
  },
  http404: {
    path: '*',
    component: () => <h1>404 Not Found</h1>,
  },
};
