import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {User} from '../models/user.model';
import {LoginState} from '../models/login.model';
import {userReducer} from './user.reducer';
import {loginReducer} from './login.reducer';

export interface AppState {
  user: User;
  loginManage: LoginState;
}

export const reducers: ActionReducerMap<AppState> = {
  user: userReducer,
  loginManage: loginReducer
};


// export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
