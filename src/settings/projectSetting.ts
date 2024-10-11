// projectSetting.ts
import type { ProjectConfig } from '/#/config';
import { SessionTimeoutProcessingEnum } from '/@/enums/appEnum';
// ! 更改后需要清除浏览器缓存
const setting: ProjectConfig = {
  // 会话超时处理
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,

  // 使用错误处理程序插件
  useErrorHandle: false,

  // 切换接口时是否删除未关闭的消息并通知
  closeMessageOnSwitch: true,

  // 切换路由时是否取消已发送但未响应的http请求
  // 如果启用了它，我想覆盖单个接口。可以在单独的界面中设置
  removeAllHttpPending: false,
};

export default setting;
