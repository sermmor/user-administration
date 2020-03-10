import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User, UserManager } from 'src/app/models/user';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { isValid as isValidIban } from 'iban';

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

  @ViewChild('submitButtonAdd') submitButtonAdd: ElementRef;
  @ViewChild('submitButtonEdit') submitButtonEdit: ElementRef;
  @ViewChild('errorFirstName') errorFirstName: ElementRef;
  @ViewChild('errorLastName') errorLastName: ElementRef;
  @ViewChild('errorIbanEmpty') errorIbanEmpty: ElementRef;
  @ViewChild('errorWrongIban') errorWrongIban: ElementRef;

  editForm: FormGroup;
  private userBehaviour = new BehaviorSubject<User>(undefined);

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      iban: ['', Validators.required]
    });

    this.userBehaviour.subscribe(observer => {
      if (this.user && this.user.own) {
        this.editForm = this.formBuilder.group({
          firstName: [this.isNewUser ? '' : this.user.firstName, Validators.required],
          lastName: [this.isNewUser ? '' : this.user.lastName, Validators.required],
          iban: [this.isNewUser ? '' : this.user.iban, Validators.required]
        });
      }
      this.onCheckValidations();
    });
  }


  onCheckValidations() {
    this.editForm.get('firstName').valueChanges.subscribe(firstName =>
      this.onCheckEmptyField(firstName, this.errorFirstName)
    );

    this.editForm.get('lastName').valueChanges.subscribe(lastName =>
      this.onCheckEmptyField(lastName, this.errorLastName)
    );

    this.editForm.get('iban').valueChanges.subscribe(newIban => 
      this.onCheckIbanField(newIban)
    );
  }

  onCheckEmptyField(toCheck: any, errorLabel: ElementRef) {
    if (this.isNewUser) {
      this.submitButtonAdd.nativeElement.disabled = this.isAFieldsEmpty();
    } else {
      this.submitButtonEdit.nativeElement.disabled = this.isAFieldsEmpty();
    }

    errorLabel.nativeElement.style = toCheck === '' ? "display:inline;" : "display:none;";
  }

  onCheckIbanField(newIban: any) {
    this.onCheckEmptyField(newIban, this.errorIbanEmpty);
    
    if (newIban !== '') {
      const validIban: boolean = isValidIban(newIban);
  
      if (this.isNewUser) {
        this.submitButtonAdd.nativeElement.disabled = !validIban;
      } else {
        this.submitButtonEdit.nativeElement.disabled = !validIban;
      }

      this.errorWrongIban.nativeElement.style = validIban ? "display:none;" : "display:inline;";
    } else {
      this.errorWrongIban.nativeElement.style = "display:none;";
    }
  }

  isAFieldsEmpty(): boolean {
    return this.editForm.get('firstName').value === '' 
      || this.editForm.get('lastName').value === ''
      || this.editForm.get('iban').value === '';
  }

  editUser() {
    if (this.isNewUser) {
      UserManager.createUser(
        this.editForm.value.firstName,
        this.editForm.value.lastName,
        this.editForm.value.iban
      );
    } else if (this.user.own) {
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
