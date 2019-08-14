import React from "react";
import { create } from "dva-core";
import { Provider } from "react-redux";
import proHistory from "./history";

/**
 * 使用dva-core的create方法创建dva实例
 * @param options
 * @returns {{_models, _store, _plugin, use, start, model}}
 */
export function dva(options) {
  /**
   * 创建APP实例
   */
  const app = create(options);

  /**
   * 启动APP，必须放在app创建之后的第一步，只有app启动了，app实例才存在
   */
  app.start();

  const history = options.history || proHistory;
  const models = options.models || [];

  /**
   * 给app添加history属性，此步一定不能少，否则model中的subscriptions方法会报错，默认为browserHistory
   */
  app._history = patchHistory(history);

  /**
   * 注册全局model
   */
  models.forEach(model => app.model(model));

  /**
   * 重载app的start方法
   */
  const store = app._store;
  app.start = container => () => <Provider store={store}>{container}</Provider>;

  /**
   * 暴露获取store的接口
   */
  app.getStore = () => store;

  return app;
}

/**
 * 强化 history 方法
 * @param history
 * @returns {*}
 */
const patchHistory = (history) => {

  const oldListen = history.listen;

  history.listen = callback => {
    callback(history.location);
    return oldListen.call(history, callback);
  };
  
  return history;
}
