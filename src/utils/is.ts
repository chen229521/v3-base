// is.ts
const toString = Object.prototype.toString;

// 判断是否符合[object type]，是返回true
export function isType(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

// 判断数据类型是否为undefined，是返回false
export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined';
}

// 判断数据类型是否为undefined，是返回true
export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val);
}

// 判断数据类型是否为Object且不为null，是返回true
export function isObj(val: any): val is Record<any, any> {
  return val !== null && isType(val, 'Object');
}

// 判断数据是否为空，是返回true
export function isBlank<T = unknown>(val: T): val is T {
  if (isArr(val) || isStr(val)) {
    return val.length === 0;
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0;
  }

  if (isObj(val)) {
    return Object.keys(val).length === 0;
  }

  return false;
}

// 判断数据是否为Date类型，是返回true
export function isTime(val: unknown): val is Date {
  return isType(val, 'Date');
}

export const isServer = typeof window === 'undefined';

// 判断数据是否为Null类型，是返回true
export function hasNull(val: unknown): val is null {
  return val === null;
}

// 判断数据是否为null或者undef，是返回ture
export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || hasNull(val);
}

// 判断数据是否是Number类型，是返回true
export function isNum(val: unknown): val is number {
  return isType(val, 'Number');
}

// 判断是否是promise类型，是返回true
export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return isType(val, 'Promise') && isObj(val) && isFn(val.then) && isFn(val.catch);
}

// 判断数据是否是String类型，是返回true
export function isStr(val: unknown): val is string {
  return isType(val, 'String');
}

// 判断是否是function，是返回true
export function isFn(val: unknown): val is Function {
  return typeof val === 'function';
}

// 判断数据是否是Boolean，是返回true
export function isBol(val: unknown): val is boolean {
  return isType(val, 'Boolean');
}

// 判断数据是否是RegExp，是返回true
export function isRegEx(val: unknown): val is RegExp {
  return isType(val, 'RegExp');
}

// 判断是否是数组，是返回true
export function isArr(val: any): val is Array<any> {
  return val && Array.isArray(val);
}

// 判断数据是否是Window类型，是返回true
export function isWindow(val: any): val is Window {
  return typeof window !== 'undefined' && isType(val, 'Window');
}

// 判断是否为Dom元素，是返回true
export function isEle(val: unknown): val is Element {
  return isObj(val) && !!val.tagName;
}

// 判断是否为Map类型，是返回true
export function hasMap(val: unknown): val is Map<any, any> {
  return isType(val, 'Map');
}

// 判断是否为网址，是返回true
export function isUrl(path: string): boolean {
  const reg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
  return reg.test(path);
}
