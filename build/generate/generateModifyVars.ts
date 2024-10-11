// generateModifyVars.ts
/**
 * scss全局变量
 */
export function generateModifyVars() {
  // 用于全局导入，以避免需要单独导入每个样式文件
  return `@use '/@/style/config.scss' as *;`;
}
