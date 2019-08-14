import React from "react";
import Loadable from 'react-loadable';
import { connect } from "react-redux";
import { Link, Route, Redirect, Switch } from 'react-router-dom';
import PageLoading from "../components/PageLoading";

const lazyLoad = (app, path, props) => {
  return Loadable({
    loader: () => import('../pages/' + path).then(raw => {
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

const BasicLayout = ({
  app,
  routes,
  ...rest
}) => {

  return <div>
    <ul>
      <li><Link to='/user'>登录窗口</Link></li>
      <li><Link to='/about'>about</Link></li>
      <li><Link to='/home'>Home</Link></li>
    </ul>
    <Switch>
        {routes.map(route => {
          return (
            <Route
              key={route.path}
              path={route.path}
              routes={route.routes || []}
              component={lazyLoad(app, route.component, rest)}
            />
          );
        })}
        {/* 从根路径跳转 */}
        <Redirect exact from="/" to="/home" />
    </Switch>
  </div>;
};

BasicLayout.defaultProps = {
  routes: [],
}

export default connect(({ global }) => global)(BasicLayout);
