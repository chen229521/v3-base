// /@/router/index.ts
import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import { basicRoutes } from './routes';
import type { App } from 'vue';

// 白名单应该包含基本静态路由
const WHITE_NAME_LIST: string[] = [];
const getRouteNames = (array: any[]) =>
  array.forEach((item) => {
    WHITE_NAME_LIST.push(item.name);
    getRouteNames(item.children || []);
  });
getRouteNames(basicRoutes);

export const router = createRouter({
  // hash 历史记录
  // history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  // 应该添加到路由的初始路由列表。
  routes: basicRoutes as unknown as RouteRecordRaw[],
  // 是否应该禁止尾部斜杠。默认为假
  strict: true,
  // 路由滚动行为
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// 重置路由
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

// 配置路由器
export function setupRouter(app: App<Element>) {
  app.use(router);
}
