import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { CreateFilmCategoryRequest, FilmCategoryControllerService, KullaniciControllerService, KullaniciGirisRequests } from '../../../../../dist/api-client-lib';
import { SnackbarService } from 'app/components/utils/snackbar.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  template: `
    <h1>Kategori Ekle</h1>
    <form [formGroup]="form" (ngSubmit)="submit()">
        <label for="first-name">Kategori Ekle: </label>
        <input id="first-name" type="text" formControlName="category">
        <button mat-raised-button color="primary" type="submit">Ekle</button>
    </form>
  `,
  styleUrl: './add-category.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCategoryComponent {
  fb = inject(FormBuilder);
  snackbar = inject(SnackbarService);
  kategoryService = inject(FilmCategoryControllerService);
  responseText: string = '';
  form: FormGroup;
  constructor() {
    this.form = this.fb.group(
      {
        category: ['Kategori 1', Validators.required],
      }
    )
  }


  submit() {
    let req: CreateFilmCategoryRequest = this.form.value;
    this.kategoryService.add(req).subscribe(res => {
      this.snackbar.openSnackBar('Kategori Eklendi')
    })
  }
}
