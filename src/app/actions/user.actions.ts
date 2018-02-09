import {Action} from '@ngrx/store';
import {User} from '../models/user.model';

export enum Actions {
  UPDATE_USER = 'UPDATE_USER',
  RESET_USER = 'RESET_USER'
}

export class UpdateUser implements Action {
  public readonly type: Actions.UPDATE_USER = Actions.UPDATE_USER;
  constructor( public user: User ) { }
}

export type UserActions = UpdateUser;
