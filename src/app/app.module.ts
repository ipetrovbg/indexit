import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import {MatButtonModule, MatCheckboxModule, MatInputModule} from '@angular/material';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import {ActionReducer, MetaReducer, StoreModule} from '@ngrx/store';
import {AppState, reducers} from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { localStorageSync } from 'ngrx-store-localstorage';
import {ReactiveFormsModule} from '@angular/forms';

export function localStorageSyncReducer(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return localStorageSync({keys: ['user', 'loginManage'], rehydrate: true})(reducer);
}
const metaReducers: MetaReducer<AppState>[] = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
