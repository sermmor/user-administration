import { UserListComponent } from './components/user-list/user-list.component';
import { Routes } from '@angular/router';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

export const appRoutes: Routes = [
  {path: 'userlist', component: UserListComponent},
  {path: '', redirectTo: '/userlist', pathMatch: 'full'},
  {path: 'userlist/new', component: CreateUserComponent },
  {path: 'userlist/edit', component: EditUserComponent },
];