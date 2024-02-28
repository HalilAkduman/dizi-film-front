import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AddCategoryComponent } from '../add-category.component';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [
    CommonModule,
    AddCategoryComponent
  ],
  template: `
  
    <app-add-category/>
  `,
  styleUrl: './admin-home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminHomeComponent {


}
