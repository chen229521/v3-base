// registerGlobComp.ts
import type { App } from 'vue';
import VXETable from 'vxe-table';
import ElementPlus from 'element-plus';
import 'xe-utils';

export function registerGlobComp(app: App) {
  app.use(VXETable).use(ElementPlus);
}
