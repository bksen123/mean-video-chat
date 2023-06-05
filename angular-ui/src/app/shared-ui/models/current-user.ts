import { environment } from '../../../environments/environment';

export class currentUser {
  _id?: string;
  userName: string = '';
  email: string = '';
  profileImage?: any = '';
  profileOldImage?: any = '';
  status: number = 1;
  role: string = environment.role.userRole;
}
