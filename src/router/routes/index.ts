// /@/router/routes/index.ts
import { AppRouteModule, AppRouteRecordRaw } from '/@/router/types';
import { PageEnum } from '/@/enums/pageEnum';

const modules = import.meta.glob('./modules/**/*.ts', { import: 'default', eager: true });
const routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key] || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

// 根路由
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

// 未经许可的基本路由
export const basicRoutes = [RootRoute, ...routeModuleList];
