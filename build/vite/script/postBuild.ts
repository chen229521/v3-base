// postBuild.ts
import { runBuildConfig } from './buildConf';
import colors from 'picocolors';

import pkg from '../../../package.json';

export const runBuild = async () => {
  try {
    // 取运行脚本命令里的参数
    const argvList = process.argv.splice(2);

    if (!argvList.includes('disabled-config')) {
      // 同步创建配置文件-
      runBuildConfig();
    }

    console.log(`✨ ${colors.cyan(`[${pkg.name}]`)}` + ' - build successfully!');
  } catch (error) {
    console.log(colors.red('vite build error:\n' + error));
    process.exit(1);
  }
};
runBuild();
