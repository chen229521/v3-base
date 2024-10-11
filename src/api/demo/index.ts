// /@/api/demo/index.ts
import { DemoParams, DemoResultModel } from './model/listModel';
import { ErrorMessageMode } from '/#/axios';
import { defHttp } from '/@/utils/http';

enum Api {
  GETlISTINFO = '/getListInfo',
  POSTLISTINFO = '/postListInfo',
}

/**
 * @description: 示例get请求
 */
export function getListInfo(params: DemoParams, mode: ErrorMessageMode = 'message') {
  return defHttp.get<DemoResultModel>({ url: Api.GETlISTINFO, params }, { errorMessageMode: mode });
}
/**
 * @description: 示例post请求
 */
export function postListInfo(params: DemoParams, mode: ErrorMessageMode = 'message') {
  return defHttp.get<DemoResultModel>(
    { url: Api.POSTLISTINFO, params },
    { errorMessageMode: mode },
  );
}
