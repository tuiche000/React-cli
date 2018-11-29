import React from "react";
import ReactDom from "react-dom";
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
//
import Page from '@/Page';
import store from '@/store'

console.log('init:', store.getState())

ReactDom.render(
  <Provider store={store}>
    <Page/>
  </Provider>, document.getElementById("root")
);

// Hot Module Replacement API 
if (module.hot) {
  module.hot.accept()
}

registerServiceWorker();