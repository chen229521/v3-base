// initAppConfig.ts
/**
 * 应用程序配置
 */
import type { ProjectConfig } from '/#/config';

import { PROJ_CFG_KEY } from '/@/enums/cacheEnum';
import projectSetting from '/@/settings/projectSetting';

import { useAppStore } from '/@/stores/modules/app';

import { getCommonStoragePrefix, getStorageShortName } from '/@/utils/env';

import { Persistent } from '/@/utils/cache/persistent';
import { deepMerge } from '/@/utils';

// 初始项目配置
export function initAppConfigStore() {
  const appStore = useAppStore();
  let projCfg: ProjectConfig = Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig;

  projCfg = deepMerge(projectSetting, projCfg || {});

  appStore.setProjectConfig(projCfg);

  setTimeout(() => {
    clearObsoleteStorage();
  }, 16);
}

/**
 * 随着版本的不断迭代，localStorage中存储的缓存密钥将越来越多
 * 此方法用于删除无用的密钥
 */
export function clearObsoleteStorage() {
  const commonPrefix = getCommonStoragePrefix();
  const shortPrefix = getStorageShortName();

  [localStorage, sessionStorage].forEach((item: Storage) => {
    Object.keys(item).forEach((key) => {
      if (key && key.startsWith(commonPrefix) && !key.startsWith(shortPrefix)) {
        item.removeItem(key);
      }
    });
  });
}
