import { User } from './User';

export interface ServerResponse {
  success: boolean;
  msg: string;
  jwt?: any;
  user?: User;
}
