import { Component } from '@angular/core';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { UserManager } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // private user: SocialUser;
  loggedIn: boolean;
  headerRequest: HeadersInit;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      if (this.loggedIn === (user != null)) {
        return;
      }

      this.loggedIn = (user != null);
      
      if (this.loggedIn) {
        UserManager.setAuthorizationToken(user.idToken);
      }

      // Add a user.
      // const initAddedNewUser = {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     first_name: 'Pepe',
      //     last_name: 'Gotera',
      //     iban: 'ES9121000418450200051332'
      //   }),
      //   headers: {
      //     ...this.headerRequest,
      //     'Content-Type': 'application/json'
      //   }
      // };
      // fetch('http://testcase.rh-dev.eu:8000/api/users', initAddedNewUser)
      //   .then(res => res.json())
      //   .then(response => console.log('Sucess:', response));
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
}
