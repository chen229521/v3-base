// vite.config.ts
import { ConfigEnv, loadEnv, UserConfig } from 'vite';
import { resolve } from 'path';

import pkg from './package.json';
import dayjs from 'dayjs';

import { exclude, include } from './build/optimize';
import { createProxy } from './build/vite/proxy';
import { wrapperEnv } from './build/utils';
import { createVitePlugins } from './build/vite/plugins';
import { OUTPUT_DIR } from './build/constant';
import { generateModifyVars } from './build/generate/generateModifyVars';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  // lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  lastBuildTime: dayjs().unix(),
};

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  const viteEnv = wrapperEnv(env);

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;

  const isBuild = command === 'build';

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: [
        // // 避免vue-i18n警告
        // {
        //   find: 'vue-i18n',
        //   replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        // },
        // /@/xxxx => src/xxxx
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
        // /#/xxxx => types/xxxx
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    server: {
      // 监听所有本地IP
      host: true,
      port: VITE_PORT,
      // 从.env加载代理配置
      proxy: createProxy(VITE_PROXY),
    },
    esbuild: {
      // 从.env加载no_console
      drop: VITE_DROP_CONSOLE ? ['console', 'debugger'] : [],
    },
    build: {
      sourcemap: true,
      // 兼容原生ESM的浏览器
      target: 'es2015',
      // 兼容移动端css样式
      cssTarget: 'chrome80',
      // 生成打包文件名称 dist
      outDir: OUTPUT_DIR,
      // 不报告压缩大小
      reportCompressedSize: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000,
      rollupOptions: {
        output: {
          // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
          entryFileNames: 'js/[name].[hash].js',
          // 用于命名代码拆分时创建的共享块的输出命名
          chunkFileNames: 'js/[name].[hash].js',
          // 用于输出静态资源的命名，[ext]表示文件扩展名
          assetFileNames: (assetInfo: any) => {
            const info = assetInfo.name.split('.');
            let extType = info[info.length - 1];
            if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
              extType = 'media';
            } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetInfo.name)) {
              extType = 'img';
            } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
              extType = 'fonts';
            }
            return `${extType}/[name].[hash].[ext]`;
          },
        },
        // 这一部分等后续nginx熟练了再启用
        // output: {
        //   // 最小化拆分包
        //   manualChunks: (id) => {
        //     if (id.includes('node_modules')) {
        //       return id.toString().split('node_modules/')[1].split('/')[0].toString();
        //     }
        //   },
        //   // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
        //   entryFileNames: `${OUTPUT_DIR}/js/[name].[hash].js`,
        //   // 用于命名代码拆分时创建的共享块的输出命名
        //   chunkFileNames: `${OUTPUT_DIR}/js/[name].[hash].js`,
        //   // 用于输出静态资源的命名，[ext]表示文件扩展名
        //   assetFileNames: `${OUTPUT_DIR}/[ext]/[name].[hash].[ext]`,
        // },
      },
    },
    define: {
      // 定义全局变量替换方式
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: generateModifyVars(),
        },
      },
    },
    // 插件
    plugins: createVitePlugins(viteEnv, isBuild),
    // 依赖预构建配置项
    optimizeDeps: {
      include,
      exclude,
    },
  };
};
