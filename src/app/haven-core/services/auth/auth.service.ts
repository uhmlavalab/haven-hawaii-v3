import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthService {

  private token: string = null;

  constructor(private router: Router, private afAuth: AngularFireAuth, private ngZone: NgZone) { }

  signinUser(email: string, password: string, path: string) {
    // this.token = 'cat';
    // this.router.navigate(['/home']);
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(response => {
      firebase.auth().currentUser.getIdToken().then((token: string) => {
        this.token = token;
        if (this.token) {
          this.ngZone.run(() => this.router.navigate([path])).then();
        }
      });
    }, error => alert(error.message)).catch(error => alert(error));
  }

  signOut(): void {
    this.afAuth.auth.signOut();
    this.token = null;
    this.ngZone.run(() => this.router.navigate(['/login'])).then();
  }

  isAuthenticated() {
    return this.token != null;
  }

  getUserId() {
    return this.afAuth.auth.currentUser.uid;
  }

  async createAccount(email, password): Promise<string> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(user => {
      if (user !== null) {
        return Promise.resolve('Success');
      }
    }, error => {
      return Promise.resolve(error.message);
    });
  }
}
