import { User, UserManager } from 'src/app/models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[];

  constructor() {
    this.users = [];
  }

  ngOnInit(): void {
    this.updateUserList();
  }

  deleteUser(user: User) {
    UserManager.deleteUserById(user.id).then(() => {
      this.updateUserList();
    });
  }

  updateUserList = () => {
    UserManager.getUsers().then((response: User[]) => {
      this.users = response;
    });
  }
}
