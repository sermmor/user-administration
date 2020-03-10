import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { User, UserManager } from 'src/app/models/user';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user: User;
  @Input() isNewUser: boolean;

  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      id: [this.isNewUser ? '' : this.user.id],
      name: [this.isNewUser ? '' : this.user.name],
      street: [this.isNewUser ? '' : this.user.street],
      phone: [this.isNewUser ? '' : this.user.phone],
      iban: [this.isNewUser ? '' : this.user.iban],
      isAdmin: [this.isNewUser ? '' : this.user.isAdmin]
    });
  }

  editUser() {
    if (this.isNewUser) {
      UserManager.createUser(
        this.editForm.value.id,
        this.editForm.value.name,
        this.editForm.value.street,
        this.editForm.value.phone,
        this.editForm.value.iban,
        this.editForm.value.isAdmin
      );
    } else {
      UserManager.updateUserById(
        this.editForm.value.id,
        this.editForm.value.name,
        this.editForm.value.street,
        this.editForm.value.phone,
        this.editForm.value.iban,
        this.editForm.value.isAdmin
      );
    }
    this.router.navigate(['userlist']);
  }

}
