// buildConf.ts
/**
 * 用于打包时生成其他配置文件。该文件可以配置一些全局变量，这样就可以在不重新打包的情况下直接从外部更改
 */
import { GLOB_CONFIG_FILE_NAME, OUTPUT_DIR } from '../../constant';
import fs, { writeFileSync } from 'fs-extra';
import colors from 'picocolors';

import { getEnvConfig, getRootPath } from '../../utils';
import { getConfigFileName } from '../../getConfigFileName';

import pkg from '../../../package.json';

interface CreateConfigParams {
  // windows对象下的存储配置的属性名
  configName: string;
  // 存储配置的对象
  config: any;
  // JS文件名
  configFileName?: string;
}

function createConfig(params: CreateConfigParams) {
  const { configName, config, configFileName } = params;
  try {
    // 变量字符串
    const windowConf = `window.${configName}`;
    // 将配置的对象以JSON字符串格式拼接到变量字符串后面，最后用正则将空格去掉，确保变量不会被修改
    let configStr = `${windowConf}=${JSON.stringify(config)};`;
    configStr += `
      Object.freeze(${windowConf});
      Object.defineProperty(window, "${configName}", {
        configurable: false,
        writable: false,
      });
    `.replace(/\s/g, '');

    // 创建dist文件夹
    fs.mkdirp(getRootPath(OUTPUT_DIR));
    // 将字符串写入到dist文件下的指定JS文件名的文件中
    writeFileSync(getRootPath(`${OUTPUT_DIR}/${configFileName}`), configStr);

    console.log(colors.cyan(`✨ [${pkg.name}]`) + ` - configuration file is build successfully:`);
    console.log(colors.gray(OUTPUT_DIR + '/' + colors.green(configFileName)) + '\n');
  } catch (error) {
    console.log(colors.red('configuration file configuration file failed to package:\n' + error));
  }
}

export function runBuildConfig() {
  // 获取我们可以配置的环境变量对象，默认取VITE_GLOB_开头的环境变量
  const config = getEnvConfig();
  // 获取配置文件的JS名
  const configFileName = getConfigFileName(config);
  // 创建文件
  createConfig({ config, configName: configFileName, configFileName: GLOB_CONFIG_FILE_NAME });
}
