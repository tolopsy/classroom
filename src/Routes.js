import React from 'react';
import { Route } from 'react-router-dom';

import LoginForm from './containers/Login';
import SignupForm from './containers/Signup';
import Profile from './containers/Profile';
import AssignmentList from './containers/AssignmentList';
import AssignmentDetail from './containers/AssignmentDetail';
import AssignmentCreate from './containers/AssignmentCreate';

const BaseRouter = () => {
  return (
    <div>
      <Route exact path='/' component={AssignmentList} />
      <Route exact path='/create' component={AssignmentCreate} />
      <Route exact path='/assignments/:id' component={AssignmentDetail} />
      <Route exact path='/login' component={LoginForm} />
      <Route exact path='/signup' component={SignupForm} />
      <Route exact path='/profile/:id' component={Profile} />
    </div>
  );
}

export default BaseRouter;