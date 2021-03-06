import React from "react";
import Loadable from 'react-loadable';
import { connect } from "react-redux";
import { Link, Route, Redirect, Switch } from 'react-router-dom';
import PageLoading from "../components/PageLoading";

const modelNotExisted = (app, model) =>
    !app._models.some(({ namespace }) => {
      return namespace === model.namespace;
    });

const lazyLoad = (app, path, props) => {
  return Loadable({
    loader: () => import('../pages/' + path).then(raw => {
      const Component = raw.default || raw;

      try {
        console.log('../pages/' + path + '/models/');
        // 按需加载组件和model
        import('../pages/' + path + '/models/').then(models=> {
          Object.values(models).forEach(model => {
            if (modelNotExisted(app, model)) {
              app.model(model);
            }
          })
        });
      }catch (e) {
        console.log('path not exist', '../pages/' + path + '/models/');
      }


      return innerProps =>  React.createElement(Component, {
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

export default connect(({ global, homeModel, aboutModel }) => ({...global, ...homeModel, ...aboutModel}))(BasicLayout);
