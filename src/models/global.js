export default {
  // 命名空间
  namespace: "global",

  // 初始化state
  state: {
    initState: "webpack-dva-core"
  },

  // 改变state
  reducers: {
    reduce(state, { payload }) {
      console.log(payload);
      return { ...state, initState: payload };
    }
  },

  // 异步请求，从服务端请求数据
  effects: {},

  // 监听路由变化，还可以做更多的监听
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        console.log(pathname, search);
        if (pathname === "/about") {
          // todo dispatch
          dispatch({
            type: "reduce",
            payload: "subscriptions dispatch"
          });
        }
      });
    }
  }
};
