// index.d.ts
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}
