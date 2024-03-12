import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl, NgModel, FormsModule } from '@angular/forms';
import { ApiModule, KullaniciControllerService, KullaniciGirisRequests, KullaniciKayitRequests } from '../../../../dist/api-client-lib';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, ApiModule, NgIf, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  fb = inject(FormBuilder);
  kullaniciService = inject(KullaniciControllerService);
  router = inject(Router);
  responseText: string = '';
  form: FormGroup;
  validationCode = ''
  showValidationScreen: boolean = false;
  count: number = 300;

  constructor() {
    this.form = this.fb.group(
      {
        name: ['halil', Validators.required],
        surname: ['akduman', Validators.required],
        email: ['halil_akduman@hotmail.com', Validators.required],
        sifre: ['123456a.A', Validators.required],
        role: ['ADMIN', Validators.required],
        geciciDogrulamaKodu: ['', Validators.required],
      }
    )
  }
  ngOnInit(): void {
    setInterval(() => {
      if (this.count !== 0) {
        this.count -= 1;
      } else {
        this.showValidationScreen = false;
      }
    }, 1000)
  }

  showMessage: boolean = false;
  submit() {
    // let req: EmailRequest = Object.create(null);
    // req.email = this.form.controls['email'].value;
    // console.log(req);

    let req = this.form.controls['email'].value;

    this.kullaniciService.dogrulamaKodu(req).subscribe(res => {
      console.log(res);
      this.showValidationScreen = true;
    })
  }

  register() {
    this.form.controls['geciciDogrulamaKodu'].setValue(this.validationCode);
    this.kullaniciService.register(this.form.value).subscribe(res => {
      this.showMessage = true
    })
  }
}
