import { environment } from "src/environments/environment";

export class meeting {
  _id?: string;
  title: string = '';
  meetingDate: Date = new Date();
  from: string = '';
  to: string = '';
  status: number = 1;
  userIds: any = [];
}

// just use it for blank field validation
export class validationFields {
  userName: string = '';
  email: string = '';
  role: string = '';
}
