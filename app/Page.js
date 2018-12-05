import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from '@/App';
import NotFound from '@/NotFound';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="app/home" push />} />
      <Route path="/app" component={App} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)