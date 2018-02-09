import {LoginState} from '../models/login.model';
import { All, ActionTypes } from '../actions/login.actions';
import {appState} from '../app.state';

export function loginReducer(state: LoginState = appState.loginManage, action: All): LoginState {

  switch (action.type) {
    case ActionTypes.PENDING:
      return { ...state, pending: action.payload };

    case ActionTypes.SET_FIELD:
      return { ...state, [action.payload.field]: action.payload.value };

    case ActionTypes.ERROR:
      return { ...state, error: action.error };

    case ActionTypes.SET_ERRORS:
      return { ...state, errors: action.errors };

    case ActionTypes.RESET:
      return { ...appState.loginManage, pending: state.pending, email: state.email, password: state.password };

    default: return state;
  }

}
