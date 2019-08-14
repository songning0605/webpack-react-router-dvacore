import { AppContainer } from 'react-hot-loader';
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { dva } from "./utils/dva";
import Router from "./router";
import * as models from "./models";

/**
 * 创建dva app
 */
const app = dva({
  models: Object.values(models),
  history: createBrowserHistory()
});

const render = Component => {
  ReactDOM.render(
      <AppContainer>
        <Component />
      </AppContainer>,
      document.getElementById('root')
  );
}

const App = app.start(<Router app={app} />);

render(App);

if (module.hot) {
  module.hot.accept();
}