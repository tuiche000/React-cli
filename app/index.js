import React from "react";
import ReactDom from "react-dom";
import registerServiceWorker from './registerServiceWorker';
import { AppContainer } from 'react-hot-loader';

ReactDom.render(
  <AppContainer>
    <h1>hello, wor112131</h1>
  </AppContainer>,
  document.getElementById("root")
);

// Hot Module Replacement API 
if (module.hot) {
  module.hot.accept()
}

registerServiceWorker();