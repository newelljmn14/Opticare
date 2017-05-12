import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public error: string;
  public displayName: string;
  public email: string;
  private authenticatedUsers: FirebaseListObservable<any []>;

  constructor(private afAuth: AngularFireAuth, private afDB: AngularFireDatabase, private router: Router) {}

  ngOnInit() {
    this.afAuth.authState.subscribe(authState => {
      if(!authState) {
        console.log('not logged in');
        this.displayName = null;
        this.email = null;
        return;
      }
      console.log('logged in', authState);
      this.email = authState.email;
      console.log(authState.uid);
      console.log(this.email);

      this.authenticatedUsers = this.afDB.list('/authenticated-users');
    });
  }

  public register(emailInput: string, passwordInput: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(emailInput, passwordInput)
      .then(authState => {
        console.log('Register-Then', authState);
        this.saveInfoToDB(emailInput, passwordInput);

        this.afAuth.auth.currentUser.sendEmailVerification()
          .then(status => console.log('should send email verification'))
          .catch(err => console.log('error sending email verify: ', err));
      })
      .catch(error => this.error = error.message);
  }

  public login(emailInput: string, passwordInput: string) {
    this.afAuth.auth.signInWithEmailAndPassword(emailInput, passwordInput)
      .then(authState => {
        console.log('login-then', authState);

        this.router.navigate(['/user-landing-page'])
          .catch(err => console.log(err));
        })
      .catch(error => console.log('login-error', error));
  }

  public logout() {
    this.afAuth.auth.signOut();
  }

  private displayValue(element: any) {
    console.log(element);
  }

  private saveInfoToDB(emailInput: string, passwordInput: string) {
    let currentUserUid = this.afAuth.auth.currentUser.uid;
    let credentials = { email: emailInput, password: passwordInput, uid: currentUserUid };
    this.afDB.object('/authenticated-users/' + currentUserUid + '/info').set(credentials)
      .catch(err => console.log('error with posting: ', err));
  }

}
