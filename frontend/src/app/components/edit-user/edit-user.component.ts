import { Component, OnInit } from '@angular/core';
import { User, UserManager } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  user: User;

  constructor(private route: ActivatedRoute) {
    const idUser = this.route.snapshot.params['id'];

    UserManager.getUserById(idUser).then((response: User) => {
      this.user = response;
      console.log(this.user.firstName);
    })
  }

  ngOnInit(): void {}

}
