export default {
  menus: [    // 菜单相关路由
    { key: '/app/home', title: '首页', icon: 'home', component: 'Home' },
    {
      key: '/app/test', title: 'test', icon: 'setting',
      subs: [
        { key: '/app/test/index', title: 'test', component: 'Login' },
        {
          key: '/app/test/dashboard',
          title: '图表',
          component: 'Dashboard'
        }
      ],
    },
  ],
  others: [
    { key: '/login', title: '登录', icon: 'user', component: 'Login' },
    { key: '/404', title: '404', icon: 'warning', component: 'NotFound' },
  ]  // 非菜单相关路由
}