/**
 * 一级json用来定义窗口，一级路由要加exact：true
 * 二级routes用来定义嵌套内容
 * component路径相对项目根路径
 *
 * 用react-router v4嵌套路由实现
 */
const menu = [
  // 一级窗口路由
  {
    path: "/user",
    component: "UserLayout",
    routes: []
  },
  {
    path: "/",
    component: "BasicLayout",
    // 二级窗口路由
    routes: [
      { path: "/home", name: "home", component: "home" },
      { path: "/about", name: "about", component: "about" }
    ]
  }
];

export default menu;
