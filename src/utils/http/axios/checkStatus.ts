// /@/utils/http/axios/checkStatus.ts
import type { ErrorMessageMode } from '/#/axios';
import projectSetting from '/@/settings/projectSetting';
import { SessionTimeoutProcessingEnum } from '/@/enums/appEnum';

const stp = projectSetting.sessionTimeoutProcessing;

export function checkStatus(
  status: number,
  msg: string,
  errorMessageMode: ErrorMessageMode = 'message',
): void {
  let errMessage = '';

  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;

    case 401:
      // 401: 未登录
      if (stp === SessionTimeoutProcessingEnum.PAGE_COVERAGE) {
        // 如果超时，则根据实际情况处理超时的情况
      } else {
        // 如果未登录，则跳转到登录页面，并携带当前页面的路径
        // 登录成功后返回当前页面。此步骤需要在登录页面上进行操作.
      }
      break;
    // 下面可以根据实际情况处理
    case 403:
      errMessage = '[HTTP] 403';
      break;
    case 404:
      errMessage = '[HTTP] 404';
      break;
    case 500:
      errMessage = '[HTTP] 407';
      break;
    default:
  }

  // 后续根据需要添加message组件
  if (errMessage) {
    if (errorMessageMode === 'modal') {
      throw new Error(errMessage);
    } else if (errorMessageMode === 'message') {
      throw new Error(errMessage);
    }
  }
}
