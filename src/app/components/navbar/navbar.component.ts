import { Component, OnInit, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { AuthenticationGirisResponse } from '../../../../dist/api-client-lib';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterModule, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  authService = inject(AuthService);
  user!: AuthenticationGirisResponse;
  ngOnInit(): void {
    this.authService._currentUser.subscribe(res => {
      this.user = res!;
    });
  }




}
