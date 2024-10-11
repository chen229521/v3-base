// mitt.ts
/**
 * copy to https://github.com/developit/mitt
 * 展开clear方法
 */

export type EventType = string | symbol;

// 事件处理程序可以采用可选的事件参数
// 并且不应返回值
export type Handler<T = any> = (event?: T) => void;
export type WildcardHandler = (type: EventType, event?: any) => void;

// 一个类型的所有当前注册的事件处理程序的数组
export type EventHandlerList = Array<Handler>;
export type WildCardEventHandlerList = Array<WildcardHandler>;

// 事件类型及其对应的事件处理程序的映射.
export type EventHandlerMap = Map<EventType, EventHandlerList | WildCardEventHandlerList>;

export interface Emitter {
  all: EventHandlerMap;

  on<T = any>(type: EventType, handler: Handler<T>): void;
  on(type: '*', handler: WildcardHandler): void;

  off<T = any>(type: EventType, handler: Handler<T>): void;
  off(type: '*', handler: WildcardHandler): void;

  emit<T = any>(type: EventType, event?: T): void;
  emit(type: '*', event?: any): void;
  clear(): void;
}

/**
 * Mitt: 小型功能事件传递工具.
 * @name mitt
 * @returns {Mitt}
 */
export default function mitt(all?: EventHandlerMap): Emitter {
  all = all || new Map();

  return {
    /**
     * 事件名称到已注册处理程序函数的映射.
     */
    all,

    /**
     * 为给定类型注册事件处理程序.
     * @param {string|symbol} type 要侦听的事件类型，或所有事件的“*”类型
     * @param {Function} handler 响应给定事件而调用的函数
     * @memberOf mitt
     */
    on<T = any>(type: EventType, handler: Handler<T>) {
      const handlers = all?.get(type);
      const added = handlers && handlers.push(handler);
      if (!added) {
        all?.set(type, [handler]);
      }
    },

    /**
     * 删除给定类型的事件处理程序.
     * @param {string|symbol} type 要从中注销`handler`的事件类型，或`“*”`
     * @param {Function} handler 要删除的处理程序函数
     * @memberOf mitt
     */
    off<T = any>(type: EventType, handler: Handler<T>) {
      const handlers = all?.get(type);
      if (handlers) {
        handlers.splice(handlers.indexOf(handler) >>> 0, 1);
      }
    },

    /**
     * 调用给定类型的所有处理程序.
     * 如果存在，则在类型匹配的处理程序之后调用“*”处理程序.
     *
     * 注意：不支持手动启动“*”处理程序.
     *
     * @param {string|symbol} type 要调用的事件类型
     * @param {Any} [evt] 传递给每个处理程序的任何值（推荐使用且功能强大的对象）
     * @memberOf mitt
     */
    emit<T = any>(type: EventType, evt: T) {
      ((all?.get(type) || []) as EventHandlerList).slice().map((handler) => {
        handler(evt);
      });
      ((all?.get('*') || []) as WildCardEventHandlerList).slice().map((handler) => {
        handler(type, evt);
      });
    },

    /**
     * 全部清除
     */
    clear() {
      this.all.clear();
    },
  };
}
