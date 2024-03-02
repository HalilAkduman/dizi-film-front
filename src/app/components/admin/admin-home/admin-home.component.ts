import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { AddDiziComponent } from '../add-dizi/add-dizi.component';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [
    CommonModule,
    AddCategoryComponent,
    AddDiziComponent
  ],
  template: `
    <div class="container">
      <div class="row">
        <div class="col-6 mt-5 border">
          <h1 class="text-center">Film Kategorisi</h1>
            <app-add-category/>
        </div>
        <div class="col-6 mt-5 border">
        <h1 class="text-center">Dizi Kategorisi</h1>
           <app-add-dizi/>
        </div>
      </div>
    </div>
  `,
  styleUrl: './admin-home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminHomeComponent {


}
