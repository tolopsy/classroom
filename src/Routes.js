import React from 'react';
import { Route } from 'react-router-dom';

import LoginForm from './containers/Login'
import SignupForm from './containers/Signup'

const BaseRouter = () => {
  return (
    <div>
      <Route exact path='/login' component={LoginForm} />
      <Route exact path='/signup' component={SignupForm} />

    </div>
  );
}

export default BaseRouter;