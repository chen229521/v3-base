// repeatClick.ts
/**
 * 防止重复点击，注意和防抖节流区分开
 * @Example v-repeat-click="()=>{}"
 */
import { on, once } from '/@/utils/domUtils';
import type { App, Directive, DirectiveBinding } from 'vue';

const RepeatDirective: Directive = {
  beforeMount(el: Element, binding: DirectiveBinding<any>) {
    let interval: Nullable<IntervalHandle> = null;
    let startTime = 0;
    const handler = (): void => binding?.value();
    const clear = (): void => {
      if (Date.now() - startTime < 100) {
        handler();
      }
      interval && clearInterval(interval);
      interval = null;
    };

    on(el, 'mousedown', (e: MouseEvent): void => {
      if ((e as any).button !== 0) return;
      startTime = Date.now();
      once(document as any, 'mouseup', clear);
      interval && clearInterval(interval);
      interval = setInterval(handler, 100);
    });
  },
};

export function setupRepeatDirective(app: App) {
  app.directive('repeat-click', RepeatDirective);
}

export default RepeatDirective;
