import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AppState} from '../reducers';
import {Store} from '@ngrx/store';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class LoggedinGuard implements CanActivate {

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(s => s.user.uid).map(uid => !!uid);
  }

}
