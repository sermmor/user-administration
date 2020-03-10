import { Component, ViewChild, ElementRef } from '@angular/core';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { UserManager } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userLogged: SocialUser;
  loggedIn: boolean;
  headerRequest: HeadersInit;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      if (this.loggedIn === (user != null)) {
        return;
      }

      this.userLogged = user;
      this.loggedIn = (user != null);
      
      if (this.loggedIn) {
        UserManager.setAuthorizationToken(user.idToken);
      }
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
