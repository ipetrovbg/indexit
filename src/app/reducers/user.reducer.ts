import {User} from '../models/user.model';
import {Actions, UserActions} from '../actions/user.actions';
import {appState} from '../app.state';

export function userReducer(state: User = appState.user, action: UserActions): User {

    switch (action.type) {

      case Actions.UPDATE_USER:
        return { ...state, email: action.user.email, displayName: action.user.displayName, uid: action.user.uid };
      case Actions.RESET_USER:
        return { ...appState.user };

      default: return state;
    }

}
