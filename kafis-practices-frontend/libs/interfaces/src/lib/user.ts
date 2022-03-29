import { UserRoles } from '@practice/enums';

export interface User {
  id: number;
  fullName: string;
  userRole: UserRoles;
  userName: string;
  password: string;

  specialty?: string;
  groupCode?: string;
}
