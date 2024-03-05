import { CommonModule, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { BackButtonDirective } from 'app/components/utils/back-button.directive';
import { AdminGetAllDiziResponse, CreateDiziRequest, DiziBolumleriResponse, DiziControllerService } from '../../../../../dist/api-client-lib';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dizi-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    BackButtonDirective,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf
  ],

  template: `
  <div class="container">
  <button mat-raised-button color="primary" class="m-5" backButton> <-- Geri Dön</button>
  <div class="row">
    <div class="col-6">
      <table *ngIf="dataSource.length !== 0 " mat-table [dataSource]="dataSource " class="mat-elevation-z8">
          <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef> id </th>
              <td mat-cell *matCellDef="let element"> {{element.id}} </td>
          </ng-container>
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef> No. </th>
            <td mat-cell *matCellDef="let element"> {{element.name}} </td>
          </ng-container>
          <ng-container matColumnDef="konu">
            <th mat-header-cell *matHeaderCellDef> konu </th>
            <td mat-cell *matCellDef="let element"> {{element.konu}} </td>
          </ng-container>
          <ng-container matColumnDef="diziCategoryName">
            <th mat-header-cell *matHeaderCellDef> diziCategoryName </th>
            <td mat-cell *matCellDef="let element"> {{element.diziCategoryName}} </td>
          </ng-container>
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let element">
            <button class="mx-2" mat-raised-button color="primary">Düzenle</button>
            <button mat-raised-button color="warn">Sil</button>
          </td>
          </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns" ></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;" (click)="getRow(row)"></tr>
</table>
      </div>
      <div class="col-6">
      <form [formGroup]="form" (ngSubmit)="edit()" class="mt-5">
      <div class="d-flex justify-content-center align-items-center flex-column">
      <h1>Dizi Ekle</h1>
     <mat-form-field>
          <mat-label>kapak:</mat-label>
          <input formControlName="kapak" matInput>
        </mat-form-field>

        <mat-form-field>
          <mat-label>fragman:</mat-label>
          <input formControlName="fragman" matInput>
        </mat-form-field>
        <mat-form-field>
          <mat-label>name:</mat-label>
          <input formControlName="name" matInput>
        </mat-form-field>
        <mat-form-field>
          <mat-label>konu:</mat-label>
          <input formControlName="konu" matInput>
        </mat-form-field>
        <mat-form-field>
          <mat-label>diziCategoryId:</mat-label>
          <input type="number" formControlName="diziCategoryId" matInput>
        </mat-form-field>
        <mat-form-field>
          <mat-label>yili:</mat-label>
          <input formControlName="yili" matInput>
        </mat-form-field>
        <mat-form-field>
          <mat-label>yonetmen:</mat-label>
          <input formControlName="yonetmen" matInput>
        </mat-form-field>
        <ng-container formArrayName="bolums">
        <ng-container *ngFor="let bolumForm of bolums.controls ; let i = index" [formGroupName]="i">
            <div class="lesson-form-row" >
                <mat-form-field appearance="fill">
                    <input matInput
                           formControlName="bolum"
                           placeholder="Bölüm ismi">
                </mat-form-field>
                <mat-form-field appearance="fill">
                    <input matInput
                           formControlName="upload"
                           placeholder="upload">
                </mat-form-field>
                <button (click)="deleteLesson(i)"> Sil </button>
            </div>
        </ng-container>
    </ng-container>
  
    <button mat-raised-button (click)="addLesson()">
        add
    </button>
        <button mat-raised-button color="primary" type="submit">Ekle</button>
      </div>
    </form>
        </div>
      </div>
  </div>
  

  `,
  styleUrl: './dizi-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiziTableComponent implements OnInit {

  dataSource!: AdminGetAllDiziResponse[];
  diziService = inject(DiziControllerService);
  displayedColumns: string[] = ['name', 'konu', 'diziCategoryName', 'actions'];
  form: FormGroup;
  selectedDizi: AdminGetAllDiziResponse = Object.create(null);

  deleteThisOne: AdminGetAllDiziResponse = {
    bolum: [
      {
        bolum: 'Bölüm 1'
      },
      {
        bolum: 'Bölüm 2'
      },
      {
        bolum: 'Bölüm 3'
      },
    ],
    diziCategoryName: 'Korku',
    id: 1,
    kapakPath: 'yok',
    konu: 'denemelik',
    name: 'Interstaller'
  }

  constructor(private fb: FormBuilder) {
    this.form = fb.group(
      {
        kapak: [''],
        fragman: [''],
        name: [''],
        konu: [''],
        diziCategoryId: [''],
        yili: [''],
        yonetmen: [''],
        bolums: this.fb.array([])
      }
    )
  }

  ngOnInit(): void {
    this.diziService.adminGetAllDizi().subscribe(res => {
      console.log(res);
      this.dataSource = res;
    });
  }

  addLesson() {
    const lessonForm = this.fb.group({
      bolum: ['', Validators.required],
      upload: ['', Validators.required]
    });

    this.bolums.push(lessonForm);
  }

  deleteLesson(lessonIndex: number) {
    this.bolums.removeAt(lessonIndex);
  }

  setForm() {
    //todo :  upload kısmına bölüm.path gelecek
    this.selectedDizi.bolum?.forEach(bolum => {
      this.form = this.fb.group(
        {
          bolum: [bolum.bolum, Validators.required],
          upload: ['', Validators.required]
        }
      )
    })
  }


  edit() {
    let req: CreateDiziRequest = {
      diziCategoryId: this.form.controls['diziCategoryId'].value,
      konu: this.form.controls['konu'].value,
      name: this.form.controls['name'].value,
      yili: this.form.controls['yili'].value,
      yonetmen: this.form.controls['yonetmen'].value
    }
    this.diziService.addDizi(req).subscribe(res => {
      console.log(res);
    })
    console.log(req);
  }


  getRow(row: any) {
    this.selectedDizi = row;
    this.setForm()
  }

  get bolums() {
    return this.form.controls["bolums"] as FormArray;
  }
}
