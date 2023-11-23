export interface ResponseUser {
  from: number;
  limit: number;
  total: number;
  user: User[];
}

export interface User {
  name: string;
  email: string;
  rol: string;
  statusName: string;
  status: boolean;
  google: boolean;
  uid: string;
}
