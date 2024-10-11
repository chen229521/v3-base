// optimize.ts
/**
 * 用于 `vite.config.ts` 的 `optimizeDeps.include` 依赖预构建配置项
 * 引入到 src/main.ts 里的依赖就不需要再添加到 include了
 */
const include = [];

/**
 * 预构建中强制排除的依赖项
 */
const exclude = [];
// const exclude = ['@iconify-icons/ep', '@iconify-icons/ri'];

export { include, exclude };
