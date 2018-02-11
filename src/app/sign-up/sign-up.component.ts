import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import {AppState} from '../reducers';
import {Store} from '@ngrx/store';
import {LoginError, LoginReset, LoginSetError, SetField} from '../actions/login.actions';
import {UpdateUser} from '../actions/user.actions';
import {getState} from '../app.state';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public afAuth: AngularFireAuth,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required]
    });

    this.form.valueChanges.debounceTime(500).subscribe(() => {

      this.store.dispatch(new LoginError(this.form.invalid));

      if (this.form.invalid) {
        const errors: string[] = [];
        if (this.form.get('email').invalid) { errors.push('Email field is required'); }
        if (this.form.get('password').invalid) { errors.push('Password field is required'); }

        this.store.dispatch(new LoginSetError(errors));
      }
    });

    this.form.get('email')
      .valueChanges.debounceTime(500)
      .subscribe(value => this.store.dispatch(new SetField({ field: 'email', value})));

    this.form.get('password')
      .valueChanges.debounceTime(500)
      .subscribe(value => this.store.dispatch(new SetField({ field: 'password', value})));

  }

  signUp() {

    if (this.form.invalid)
      return;

    this.afAuth.auth.createUserWithEmailAndPassword(this.form.value.email, this.form.value.password)
      .then(user => {
        this.store.dispatch(new UpdateUser(user));
    }).catch(err => {
      this.store.dispatch(new LoginError(true));
      this.store.dispatch(new LoginSetError([err.message]));
    });

  }

}
