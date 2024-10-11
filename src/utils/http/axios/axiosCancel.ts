// /@/utils/http/axios/axiosCancel
import type { AxiosRequestConfig, Canceler } from 'axios';
import axios from 'axios';
import { isFn } from '/@/utils/is';

// 用于存储每个请求的识别和取消功能
let pendingMap = new Map<string, Canceler>();

export const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url].join('&');

export class AxiosCanceler {
  /**
   * Add request
   * @param {Object} config
   */
  addPending(config: AxiosRequestConfig) {
    this.removePending(config);
    const url = getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          // 如果当前没有挂起的请求，请添加它
          pendingMap.set(url, cancel);
        }
      });
  }

  /**
   * @description: clear所有在pending的请求
   */
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFn(cancel) && cancel();
    });
    pendingMap.clear();
  }

  /**
   * 删除请求
   * @param {Object} config
   */
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);

    if (pendingMap.has(url)) {
      // 如果挂起中有当前请求标识符,
      // 需要取消并删除当前请求
      const cancel = pendingMap.get(url);
      cancel && cancel(url);
      pendingMap.delete(url);
    }
  }

  /**
   * @description: reset
   */
  reset(): void {
    pendingMap = new Map<string, Canceler>();
  }
}
