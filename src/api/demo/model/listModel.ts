// /@/api/demo/model/listModel.ts
export interface ListType {
  id: number;
  name: string;
  createBy: string;
}

/**
 * @description: 示例接口返回值
 */
export interface DemoResultModel {
  content: ListType[];
  page: number;
  pageSize: number;
  total: number;
}

/**
 * @description: 示例接口参数
 */
export interface DemoParams {
  field1: string;
  field2: string;
}
