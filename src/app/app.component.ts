import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore} from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skipWhile';
import 'rxjs/add/operator/debounceTime';
import {Store} from '@ngrx/store';
import {AppState} from './reducers/index';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginError, LoginReset, LoginSetError, SetField} from './actions/login.actions';
import {getState} from "./app.state";
import {UpdateUser} from "./actions/user.actions";


interface Item {
  uid: string;
  title: string;
  url: string;
  description?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  form: FormGroup;

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private store: Store<AppState>,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.form.valueChanges.debounceTime(500).subscribe(form => {
      this.store.dispatch(new LoginError(this.form.invalid));
      if (this.form.invalid) {
        const errors: string[] = [];
        if (this.form.get('email').invalid) { errors.push('Email field is required'); }
        if (this.form.get('password').invalid) { errors.push('Password field is required'); }

        this.store.dispatch(new LoginSetError(errors));
      }
    });
    this.form.get('email').valueChanges.debounceTime(500).subscribe(value => this.store.dispatch(new SetField({ field: 'email', value})));
    this.form.get('password').valueChanges.debounceTime(500).subscribe(value => this.store.dispatch(new SetField({ field: 'password', value})));

    // this.checkAuth()
    //   .subscribe(state => {
    //     this.db.collection<Item>('links', ref =>
    //       ref.where('uid', '==', this.user.uid)).valueChanges().subscribe(links => console.log(links));
    // }, err => this.user = null);
  }

  login() {
    if ( this.form.valid ) {

      this.store.dispatch(new LoginReset());

      const { email, password } = getState(this.store).loginManage;

      console.log(email, password);

      firebase.auth()
        .signInWithEmailAndPassword( email.trim(), password.trim()).then(user => {
          this.store.dispatch(new UpdateUser(user));
      }).catch((error) => {
        console.log(error);
        this.store.dispatch(new LoginError(true));
        this.store.dispatch(new LoginSetError([error.message]));
      });
    }
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  checkAuth() {
    return this.afAuth.authState
      .switchMap(state =>
        !state ? this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()) : this.afAuth.authState
      ).do(state => {
        if (state && state.user) {
          // this.user = state.user;
        } else {
          // this.user = state;
        }
      });
  }

  addNew() {
    // this.checkAuth().subscribe(() => {
    //   this.db.collection<Item>('links').add({uid: this.user.uid, title: 'test title', description: 'sdc', url: 'sdc'});
    // });
  }

  deleteItem() {
    // const id: string = 'OI41XiYNoikThyj5WPOC';
    // const itemRef = this.db.doc<Item>(`links/${id}`);
    //
    // itemRef.valueChanges().take(1)
    //   .skipWhile(item => (!item || (item.uid !== this.user.uid)))
    //   .subscribe((item) => {
    //   console.log(`deleting #${id} - ${item.title}`);
    //     itemRef.ref.delete();
    //   });
  }
}
