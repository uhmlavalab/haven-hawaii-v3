import { Component } from '@angular/core';
import { AuthService } from '@app/haven-core';


@Component({
  selector: 'app-haven-login',
  templateUrl: './haven-login.component.html',
  styleUrls: ['./haven-login.component.css'],
})
export class HavenLoginComponent {

  email = '';
  password = '';
  messageText: string;

  constructor(private authService: AuthService) {
    this.login();
  }

  login() {
    // if (this.email && this.password) {
      this.authService.signinUser('havenhseo@gmail.com', 'haven1', 'home');
    // }
  }

  createAccount() {
    this.authService.createAccount(this.email, this.password).then(message => {
      if (message === 'Success') {
        this.authService.signinUser(this.email, this.password, 'home');
      } else {
        alert(message);
      }
    });
  }
}
