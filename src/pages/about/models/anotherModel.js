
// MODELNAMESPACE
export default {
    namespace: 'anotherModel',

    state: {
        anotherModel: 'demo',
    },

    /** -----------------------------
     * 请求数据
     * ------------------------------
     */
    effects: {
        *demo({ payload }, { call, put }) {
            const response = yield call('methodName', payload);
            yield put({
                type: 'registerHandle',
                payload: response,
            });
        },
    },

    /** -----------------------------
     * 返回新的state
     * ------------------------------
     */
    reducers: {
        registerHandle(state, { payload }) {
            return {
                ...state,
                status: payload.status,
            };
        },
    },

    /** -----------------------------
     * 监听路由变化
     * ------------------------------
     */
    subscriptions: {
        setup({ dispatch, history }) {
            // Subscribe history(url) change, trigger `load` action if pathname is `/`
            return history.listen(({ pathname, search }) => {
                if (pathname === '/sdfsdf') {
                    dispatch({ type: 'fetchAuthInfo' });
                    // dispatch({ type: 'getdepartmentNameSelect' });
                }
            });
        },
    },
};
