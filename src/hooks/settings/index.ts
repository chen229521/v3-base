// /@/hooks/settings/index.ts
import type { GlobConfig } from '/#/config';

import { warn } from '/@/utils/log';
import { getENV } from '/@/utils/env';

// 全局环境变量
export const useGlobSetting = (): Readonly<GlobConfig> => {
  const ENV = getENV();

  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
  } = ENV;

  if (!/[a-zA-Z\_]*/.test(VITE_GLOB_APP_SHORT_NAME)) {
    warn(`VITE_GLOB_APP_SHORT_NAME变量只能是字符/下划线，请在环境变量中修改并重新运行.`);
  }

  // 采用全局配置
  const glob: Readonly<GlobConfig> = {
    title: VITE_GLOB_APP_TITLE,
    apiUrl: VITE_GLOB_API_URL,
    shortName: VITE_GLOB_APP_SHORT_NAME,
    urlPrefix: VITE_GLOB_API_URL_PREFIX,
    uploadUrl: VITE_GLOB_UPLOAD_URL,
  };
  return glob as Readonly<GlobConfig>;
};
