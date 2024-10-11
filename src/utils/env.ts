// env.ts
import type { GlobEnvConfig } from '/#/config';
import { warn } from '/@/utils/log';
import pkg from '../../package.json';
import { getConfigFileName } from '../../build/getConfigFileName';

/**
 * 缓存秘钥前缀
 */
export function getCommonStoragePrefix() {
  const { VITE_GLOB_APP_SHORT_NAME } = getAppEnvConfig();
  return `${VITE_GLOB_APP_SHORT_NAME}__${getEnvMode()}`.toUpperCase();
}

/**
 * 根据版本生成缓存密钥
 */
export function getStorageShortName() {
  return `${getCommonStoragePrefix()}${`__${pkg.version}`}__`.toUpperCase();
}

/**
 * 获取全局配置（打包时将独立提取配置）
 */
export function getENV(): GlobEnvConfig {
  const isMode = isDevMode();
  const ENV_NAME = getConfigFileName(import.meta.env);

  return isMode ? (import.meta.env as unknown as GlobEnvConfig) : window[ENV_NAME];
}

/**
 * @description: 获取环境变量
 * @example: development
 */
export function getEnvMode(): string {
  return import.meta.env.MODE;
}

/**
 * @description: 是否是开发模式
 */
export function isDevMode(): boolean {
  return import.meta.env.DEV;
}

/**
 * @description: 是否是生产模式
 */
export function isProdMode(): boolean {
  return import.meta.env.PROD;
}

export function getAppEnvConfig() {
  const ENV = getENV();

  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
  } = ENV;

  if (!/^[a-zA-Z\_]*$/.test(VITE_GLOB_APP_SHORT_NAME)) {
    warn(`VITE_GLOB_APP_SHORT_NAME变量只能是字符/下划线，请在环境变量中修改并重新运行.`);
  }

  return {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
  };
}
