// /@/router/guard/index.ts
import type { RouteLocationNormalized, Router } from 'vue-router';
import projectSetting from '/@/settings/projectSetting';
import { AxiosCanceler } from '/@/utils/http/axios/axiosCancel';

// 注意，这里不要更改创建顺序
export function setupRouterGuard(router: Router) {
  createPageGuard(router);
  createHttpGuard(router);
  createScrollGuard(router);
}

/**
 * 用于处理页面状态的挂钩
 */
function createPageGuard(router: Router) {
  const loadedPageMap = new Map<string, boolean>();

  router.beforeEach(async (to) => {
    // 页面已经加载，再次打开会更快，不需要进行加载和其他处理
    to.meta.loaded = !!loadedPageMap.get(to.path);

    return true;
  });

  router.afterEach((to) => {
    loadedPageMap.set(to.path, true);
  });
}

/**
 * 路由切换时用于关闭当前页面已完成请求的接口
 * @param router
 */
function createHttpGuard(router: Router) {
  const { removeAllHttpPending } = projectSetting;
  let axiosCanceler: Nullable<AxiosCanceler>;
  if (removeAllHttpPending) {
    axiosCanceler = new AxiosCanceler();
  }
  router.beforeEach(async () => {
    // 切换路由将删除以前的请求
    axiosCanceler?.removeAllPending();
    return true;
  });
}

// 回顶部的路由开关
// 只在hash路由模式下触发
function createScrollGuard(router: Router) {
  const isHash = (href: string) => {
    // 匹配hash路由的#
    // 替换createWebHistory为createWebHashHistory即可更换为hash路由
    return /^#/.test(href);
  };

  const body = document.body;

  router.afterEach(async (to) => {
    // 滚动到顶部
    isHash((to as RouteLocationNormalized & { href: string })?.href) && body.scrollTo(0, 0);

    return true;
  });
}
