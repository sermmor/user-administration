import { Component, OnInit } from '@angular/core';
import { User, UserManager } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  user: User;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    const idUser = this.activatedRoute.snapshot.params['id'];

    UserManager.getUserById(idUser).then((response: User) => {
      if (response.own) {
        this.user = response;
      } else {
        this.router.navigate(['userlist']);
      }
    })
  }

  ngOnInit(): void {}

}
