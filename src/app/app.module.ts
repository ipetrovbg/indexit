import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import {AngularFireAuth, AngularFireAuthModule} from 'angularfire2/auth';

import {MatButtonModule, MatCheckboxModule, MatInputModule} from '@angular/material';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import {ActionReducer, MetaReducer, StoreModule} from '@ngrx/store';
import {AppState, reducers} from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { localStorageSync } from 'ngrx-store-localstorage';
import {ReactiveFormsModule} from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import {Router, RouterModule, Routes} from '@angular/router';
import {SharedModule} from './shared/shared.module';
import {LoggedinGuard} from './shared/loggedin.guard';
import {NotloggedinGuard} from './shared/notloggedin.guard';

import {Store} from '@ngrx/store';
import {ResetUser, UpdateUser} from './actions/user.actions';
import {SetField} from "./actions/login.actions";

export function localStorageSyncReducer(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return localStorageSync({keys: ['user', 'loginManage'], rehydrate: true})(reducer);
}
const metaReducers: MetaReducer<AppState>[] = [localStorageSyncReducer];
/**
 *
 * @type {({path: string; pathMatch: string; redirectTo: string} | {path: string; component: SignInComponent; canActivate: NotloggedinGuard[]; pathMatch: string} | {path: string; component: SignUpComponent; canActivate: NotloggedinGuard[]; pathMatch: string} | {path: string; loadChildren: string})[]}
 */
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'sign-in' },
  { path: 'sign-in', component: SignInComponent, canActivate: [NotloggedinGuard], pathMatch: 'full' },
  { path: 'sign-up', component: SignUpComponent, canActivate: [NotloggedinGuard], pathMatch: 'full' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' }
];
@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers, { metaReducers }),
    SharedModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    LoggedinGuard,
    NotloggedinGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    public afAuth: AngularFireAuth,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.afAuth.authState
      .subscribe(authState => !authState ? this.reset() : this.update(authState));

    this.store.select(state => state.user.uid)
      .map(uid => !!uid)
      .subscribe(isLogged =>
        isLogged ?
          this.router.navigate(['/dashboard']) :
          this.router.navigate(['/sign-in']));
  }

  reset() {
    this.store.dispatch(new ResetUser());
    this.store.dispatch(new SetField({ field: 'email', value: '' }));
    this.store.dispatch(new SetField({ field: 'password', value: '' }));
  }

  update(authState) {
    this.store.dispatch(new UpdateUser(authState));
    this.store.dispatch(new SetField({ field: 'email', value: '' }));
    this.store.dispatch(new SetField({ field: 'password', value: '' }));
  }
}
