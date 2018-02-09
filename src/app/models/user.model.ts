import {UserInfo} from 'firebase/app';

export interface User {
  uid: string;
  email: string;
  displayName: string;
}
