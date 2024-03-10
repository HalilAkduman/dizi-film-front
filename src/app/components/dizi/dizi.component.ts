import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { DiziControllerService, DiziResponse } from '../../../../dist/api-client-lib';

@Component({
  selector: 'app-dizi',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './dizi.component.html',
  styleUrl: './dizi.component.scss'
})
export class DiziComponent implements OnInit {
  dizis!: DiziResponse[];
  ngOnInit(): void {
    this.dizi.getAllDizi().subscribe(res => {
      this.dizis = res;
    })
  }
  dizi = inject(DiziControllerService);


}
