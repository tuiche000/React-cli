import React from "react";
import { Route, Redirect, Switch } from 'react-router-dom';
import PageComponents from '@/pages'
import RoutesConfig from './config';

export default () => {
  return (
    <Switch>
      <Route
        key="/app"
        exact
        path="/app"
        component={PageComponents['Home']}
      ></Route>
      {
        RoutesConfig.menus.map(menu => {
          if (menu.component) { // 没有二级菜单的
            return (
              <Route
                key={menu.key}
                exact
                path={menu.key}
                component={PageComponents[menu.component]}
              ></Route>
            )
          } else { // 有二级菜单的
            let ROUTEES = []
            const next = (menu) => {
              if (menu.subs) {
                menu.subs.map(sub => {
                  ROUTEES.push((
                    <Route exact path={sub.key} component={PageComponents[sub.component]} key={sub.key} />
                  ))
                  next(sub)
                })
              }
            }
            next(menu)
            return ROUTEES
          }
        })
      }
      <Redirect to="/404" />
    </Switch>
  )
}