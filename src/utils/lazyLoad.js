import React from "react";
import Loadable from 'react-loadable';
import PageLoading from "../components/PageLoading";


const lazyLoad = (component, props) => {
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

export default lazyLoad;