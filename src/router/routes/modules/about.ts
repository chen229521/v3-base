// /@/router/routes/modules/about.ts
// 路由示例
const abouteDemo = {
  path: '/about',
  name: 'about',
  // route level code-splitting
  // this generates a separate chunk (About.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import('/@/views/AboutView.vue'),
};

export default abouteDemo;
