// /@/directives/index.ts
/**
 * 配置和注册全局指令
 */
import type { App } from 'vue';
import { setupRepeatDirective } from './repeatClick';
import { setupRippleDirective } from './ripple';
import { setupClickOutsideDirective } from './clickOutside';

export function setupGlobDirectives(app: App) {
  // 防止重复点击
  setupRepeatDirective(app);
  // 水波纹
  setupRippleDirective(app);
  // 点内外部触发不同事件
  setupClickOutsideDirective(app);
}
