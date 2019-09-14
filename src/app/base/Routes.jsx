import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import loadable from '@loadable/component';

const Home = loadable(() => import('../views/Home/Home'));

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Redirect to="/" />
    </Switch>
  );
}

export default withRouter(Routes);
