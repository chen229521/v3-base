// index.ts
import { type App, type Component } from 'vue';
import { isArr, isObj } from '/@/utils/is';
import { cloneDeep, mergeWith } from 'lodash-es';

export const noop = () => {};

/**
 * 将对象作为参数添加到URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}

/**
 递归合并两个对象。
 @param target 目标对象，合并后结果存放于此。
 @param source 要合并的源对象。
 @returns 合并后的对象。
 */
export function deepMerge<T extends object | null | undefined, U extends object | null | undefined>(
  target: T,
  source: U,
): T & U {
  return mergeWith(cloneDeep(target), source, (objValue, srcValue) => {
    if (isObj(objValue) && isObj(srcValue)) {
      return mergeWith(cloneDeep(objValue), srcValue, (prevValue, nextValue) => {
        return isArr(prevValue) ? prevValue.concat(nextValue) : undefined;
      });
    }
  });
}

// https://github.com/vant-ui/vant/issues/8302
// 用来修复tsx组件缺少事件的typescript定义
type EventShim = {
  new (...args: any[]): {
    $props: {
      onClick?: (...args: any[]) => void;
    };
  };
};

export type WithInstall<T> = T & {
  install(app: App): void;
} & EventShim;

export type CustomComponent = Component & { displayName?: string };

/**
 * 全局注册函数
 * @param component 需要全局注册的模块
 * @returns 注册的模块
 */
export const withInstall = <T extends CustomComponent>(component: T) => {
  (component as Record<string, unknown>).install = (app: App) => {
    const compName = component.name || component.displayName;
    if (!compName) return;
    app.component(compName, component);
  };
  return component as WithInstall<T>;
};
