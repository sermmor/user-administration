import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { User, UserManager } from 'src/app/models/user';
import { RouterModule, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() isNewUser: boolean;
  @Input() set user(value: User) {
    this.userBehaviour.next(value);
  }
  get user() {
    return this.userBehaviour.getValue();
  }

  editForm: FormGroup;

  private userBehaviour = new BehaviorSubject<User>(undefined);

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.userBehaviour.subscribe(observer => {
      this.editForm = this.formBuilder.group({
        firstName: [this.isNewUser ? '' : this.user.firstName],
        lastName: [this.isNewUser ? '' : this.user.lastName],
        iban: [this.isNewUser ? '' : this.user.iban]
      });
    });
  }

  editUser() {
    if (this.isNewUser) {
      UserManager.createUser(
        this.editForm.value.firstName,
        this.editForm.value.lastName,
        this.editForm.value.iban
      );
    } else {
      UserManager.updateUserById(
        this.user.id!,
        this.editForm.value.firstName,
        this.editForm.value.lastName,
        this.editForm.value.iban
      );
    }
    this.router.navigate(['userlist']);
  }

}
