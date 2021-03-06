import { User, UserManager } from 'src/app/models/user';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[];

  constructor(private router: Router) {
    this.users = [];
  }

  ngOnInit(): void {
    this.updateUserList();
  }

  deleteUser(user: User) {
    if (user.own) {
      UserManager.deleteUserById(user.id).then(() => {
        window.location.reload();
      });
    }
  }

  updateUserList = () => {
    UserManager.getUsers().then((response: User[]) => {
      this.users = response;
    });
  }

  newUser() {
    this.router.navigate(['userlist/new']);
  }
}
