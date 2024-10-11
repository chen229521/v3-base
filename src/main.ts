// main.ts
import './style/tailwind.scss';
import { createApp } from 'vue';
import App from './App.vue';

import { router, setupRouter } from './router';
import { setupStore } from '/@/stores';
import { initAppConfigStore } from './logics/initAppConfig';
import { registerGlobComp } from './components/registerGlobComp';
import { setupRouterGuard } from '/@/router/guard';
import { setupGlobDirectives } from '/@/directives';
import { setupErrorHandle } from '/@/logics/error-handle';

async function bootstrap() {
  const app = createApp(App);

  // 配置 store
  setupStore(app);

  // 初始化内部系统配置
  initAppConfigStore();

  // 注册全局组件
  registerGlobComp(app);

  // 配置路由
  setupRouter(app);

  // 路由守卫
  setupRouterGuard(router);

  // 注册全局指令
  setupGlobDirectives(app);

  // 配置全局错误处理，useErrorHandle为false时不启用
  setupErrorHandle(app);

  app.mount('#app');
}

bootstrap();
