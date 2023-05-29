/***
 * 声明的原因是一些可有可无的变量值,
 * 确保 用的时候不会有类型的错误或者误导
 */
export interface Epic {
  id: number;
  name: string;
  projectId: number;
  // 开始时间
  start: number;
  // 结束时间
  end: number;
}
