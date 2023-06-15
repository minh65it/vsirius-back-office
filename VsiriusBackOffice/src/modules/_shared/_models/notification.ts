export interface Notification {
  id: string;
  name: string;
  content: string;
  createBy: string;
  updateBy: string;
  updateTime: string;
  createTime: string;
  isAll: boolean;
  isView: boolean;
  endDate: string | Date;
  users: string[];
}