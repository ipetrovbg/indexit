import {AppState} from './reducers/index';
import 'rxjs/add/operator/take';
import {Store} from '@ngrx/store';

export const appState: AppState = {
  user: {
    uid: '',
    displayName: '',
    email: ''
  },
  loginManage: {
    email: '',
    pending: false,
    password: '',
    errors: [],
    error: false
  }
};

export const getState = (store: Store<AppState>) => {
  let _state: AppState;
  store.select(state => state).take(1).subscribe(o => _state = o);
  return _state;
};
