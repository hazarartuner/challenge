import React from 'react';
import LoginPage from './LoginPage';
import SessionsPage from './SessionsPage';
import CreateSessionPage from './CreateSessionPage';
import PlanningPage from './PlanningPage';

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
  createSession: {
    path: '/poker-planning-add-story-list',
    component: CreateSessionPage,
    exact: true,
  },
  planningForDeveloperPage: {
    path: '/poker-planning-view-as-developer/:slug',
    component: PlanningPage,
  },
  planningForScrumMasterPage: {
    path: '/poker-planning-view-as-scrum-master/:slug',
    component: PlanningPage,
  },
  http404: {
    path: '*',
    component: () => <h1>404 Not Found</h1>,
  },
};
