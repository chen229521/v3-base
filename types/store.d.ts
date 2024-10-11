// /@/types/store.d.ts
import { ErrorTypeEnum } from '/@/enums/exceptionEnum';

// 错误日志信息
export interface ErrorLogInfo {
  // 错误类型
  type: ErrorTypeEnum;
  // 错误文件
  file: string;
  // 错误名称
  name?: string;
  // 错误消息
  message: string;
  // 错误堆栈
  stack?: string;
  // 错误详细信息
  detail: string;
  // 错误url
  url: string;
  // 错误时间
  time?: string;
}
