import React from 'react';
import { Route } from 'react-router-dom';

import LoginForm from './containers/Login';
import SignupForm from './containers/Signup';
import Profile from './containers/Profile';

const BaseRouter = () => {
  return (
    <div>
      <Route exact path='/login' component={LoginForm} />
      <Route exact path='/signup' component={SignupForm} />
      <Route exact path='/profile/:id' component={Profile} />

    </div>
  );
}

export default BaseRouter;