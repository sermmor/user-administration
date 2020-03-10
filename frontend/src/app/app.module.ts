import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms' ;
import { ReactiveFormsModule} from '@angular/forms';

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { appRoutes } from './app.routes';
import { UserCardComponent } from './components/user-card/user-card.component';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("14280823730-du497d5bhr841qmn34nh9sj9cplbtfcn.apps.googleusercontent.com")
  }
]);

export const provideConfig = () => {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    CreateUserComponent,
    EditUserComponent,
    UserCardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
