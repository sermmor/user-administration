import { Component, OnInit, Input } from '@angular/core';
import { SocialUser, AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-admin-card',
  templateUrl: './admin-card.component.html',
  styleUrls: ['./admin-card.component.scss']
})
export class AdminCardComponent implements OnInit {
  @Input() userLogged: SocialUser;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  signOut(): void {
    this.authService.signOut();
  }
}
