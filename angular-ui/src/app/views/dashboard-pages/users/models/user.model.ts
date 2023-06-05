import { environment } from "src/environments/environment";

export class user {
  _id?: string;
  userName: string = '';
  email: string = '';
  status: number = 1;
  role: number = environment.role.userRole;
}

// just use it for blank field validation
export class validationFields {
  userName: string = '';
  email: string = '';
  role: string = '';
}
