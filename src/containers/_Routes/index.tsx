import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Landing from '../Landing';
import Map from '../OrphanegesMap';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/app" component={Map} />
      <Redirect from="*" to="/" />
    </Switch>
  );
}
