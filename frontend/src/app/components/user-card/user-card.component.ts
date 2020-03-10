import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user: User;
  @Input() isNewUser: boolean;

  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      id: [this.isNewUser ? '' : this.user.id],
      name: [this.isNewUser ? '' : this.user.name],
      street: [this.isNewUser ? '' : this.user.street],
      phone: [this.isNewUser ? '' : this.user.phone],
      iban: [this.isNewUser ? '' : this.user.iban],
      isAdmin: [this.isNewUser ? '' : this.user.isAdmin]
    })
  }

}
