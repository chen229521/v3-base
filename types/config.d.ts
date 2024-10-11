// config.d.ts
export interface GlobEnvConfig {
  // 站点名称
  VITE_GLOB_APP_TITLE: string;
  // 服务接口url
  VITE_GLOB_API_URL: string;
  // 服务接口url前缀
  VITE_GLOB_API_URL_PREFIX?: string;
  // 项目简称
  VITE_GLOB_APP_SHORT_NAME: string;
  // 上传url
  VITE_GLOB_UPLOAD_URL?: string;
}

export interface ProjectConfig {
  // 会话超时处理
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum;
  // 使用错误处理程序插件
  useErrorHandle: boolean;
  // 切换接口时是否删除未关闭的消息并通知
  closeMessageOnSwitch: boolean;
  // 切换接口时是否取消已发送但未响应的http请求
  removeAllHttpPending: boolean;
}

export interface GlobConfig {
  // 站点名称
  title: string;
  // 服务接口url
  apiUrl: string;
  // 上传url
  uploadUrl?: string;
  // 服务接口url前缀
  urlPrefix?: string;
  // 项目简称
  shortName: string;
}
