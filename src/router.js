import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Loadable from 'react-loadable';
import proHistory from "./utils/history";
import menu from "../config/menu";
import PageLoading from "./components/PageLoading";

const lazyLoad = (path, props) => {
  return Loadable({
    loader: () => import('./layouts/' + path).then(raw => {
      const Component = raw.default || raw;
      return innerProps =>
        React.createElement(Component, {
          ...Object.assign({}, innerProps, props),
        });
    }),
    loading: () => {
      return <PageLoading />;
    },
  });
};

// 加载菜单数据，也可以从远程服务器加载
const getMenuConfig = () => menu || [];

const RouterConfig = ({
  app,
}) => {

  const menuData = getMenuConfig();

  return (
    <Router history={proHistory}>
      <Switch>
        {menuData.map(({ path, component, ...rest }) => {
          return (
            <Route
              key={path}
              path={path}
              component={lazyLoad(component, { ...rest, app })}
            />
          );
        })}
      </Switch>
    </Router>
  );
};

export default RouterConfig;
