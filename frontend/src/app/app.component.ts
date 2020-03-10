import { Component } from '@angular/core';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // private user: SocialUser;
  private headerRequest: HeadersInit;
  private loggedIn: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.loggedIn = (user != null);
      
      this.headerRequest = {'Authorization': 'Token ' + user.idToken};

      // See user list.
      const initRequest = {
        method: 'GET',
        headers: this.headerRequest,
      };
      fetch('http://testcase.rh-dev.eu:8000/api/users ', initRequest)
        .then(response => {
          response.json().then(json => {
            console.log(json);
          });
        }
      );

      // Add a user.
      
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
}
