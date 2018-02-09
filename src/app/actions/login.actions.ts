import {Action} from '@ngrx/store';

export enum ActionTypes {
  LOGIN = 'LOGIN',
  PENDING = 'PENDING',
  ERROR = 'ERROR',
  SET_ERRORS = 'SET_ERRORS',
  SUCCESS = 'SUCCESS',
  RESET = 'RESET',
  SET_FIELD = 'SET_FIELD'
}

export class LoginPending implements Action {

  public readonly type: ActionTypes.PENDING = ActionTypes.PENDING;
  constructor( public payload: boolean ) { }
}

export class LoginError implements Action {
  public readonly type: ActionTypes.ERROR = ActionTypes.ERROR;
  constructor( public error: boolean ) { }
}

export class LoginSetError implements Action {
  public readonly type: ActionTypes.SET_ERRORS = ActionTypes.SET_ERRORS;
  constructor( public errors: string[] ) { }
}

export class SetField implements Action {

  public readonly type: ActionTypes.SET_FIELD = ActionTypes.SET_FIELD;
  constructor( public payload: { field: string, value: string } ) { }
}

export class LoginReset implements Action {
  public readonly type: ActionTypes.RESET = ActionTypes.RESET;
}

export type All = SetField | LoginPending | LoginError | LoginSetError | LoginReset;
