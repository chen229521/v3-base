// app.ts
import { defineStore } from 'pinia';
import { store } from '/@/stores';
import { ProjectConfig } from '/#/config';
import { PROJ_CFG_KEY } from '/@/enums/cacheEnum';
import { Persistent } from '/@/utils/cache/persistent';
import { deepMerge } from '/@/utils';

// app基本配置
interface AppState {
  // 页面加载状态
  pageLoading: boolean;
  // 项目配置
  projectConfig: ProjectConfig | null;
}
export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    pageLoading: false,
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
  }),
  getters: {
    getPageLoading(state): boolean {
      return state.pageLoading;
    },
    getProjectConfig(state): ProjectConfig {
      return state.projectConfig || ({} as ProjectConfig);
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },
    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config) as ProjectConfig;
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig);
    },
  },
});

// 需要在设置之外使用
export function useAppStoreWithOut() {
  return useAppStore(store);
}
