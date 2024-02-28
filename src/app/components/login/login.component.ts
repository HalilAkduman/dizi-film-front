import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiModule, KullaniciControllerService, KullaniciGirisRequests } from '../../../../dist/api-client-lib';
import { NgIf } from '@angular/common';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ApiModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  fb = inject(FormBuilder);
  kullaniciService = inject(KullaniciControllerService);
  authService = inject(AuthService);
  router = inject(Router);
  responseText: string = '';
  form: FormGroup;
  constructor() {
    this.form = this.fb.group(
      {
        email: ['halil_akduman@hotmail.com', Validators.required],
        sifre: ['123456a.A', Validators.required]
      }
    )
  }


  submit() {
    let req: KullaniciGirisRequests = this.form.value;

    this.kullaniciService.login(req).subscribe(res => {
      this.responseText = 'Başarı ile giriş yapıldı';
      this.authService.setUser(res);
      this.router.navigateByUrl('ana-sayfa')
    })
  }
}
