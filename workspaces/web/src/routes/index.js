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
  planningForDeveloperPage: {
    path: '/poker-planning-view-as-developer/:slug',
    component: () => 'Session For Developer Page',
  },
  planningForScrumMasterPage: {
    path: '/poker-planning-view-as-scrum-master/:slug',
    component: () => 'Session For Scrum Master Page',
  },
  http404: {
    path: '*',
    component: () => <h1>404 Not Found</h1>,
  },
};
