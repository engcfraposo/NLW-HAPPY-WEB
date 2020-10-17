import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Orphanage from '../Orphanage';
import CreateOrphanage from '../CreateOrphanagePage';
import Landing from '../Landing';
import Map from '../OrphanagesMap';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/app" component={Map} />
      <Route path="/orphanages/create" component={CreateOrphanage} />
      <Route path="/orphanages/:id" component={Orphanage} />
      <Redirect from="*" to="/" />
    </Switch>
  );
}
