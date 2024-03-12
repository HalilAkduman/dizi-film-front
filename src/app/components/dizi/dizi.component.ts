import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { DiziControllerService, DiziResponse, FavoriDizilerControllerService } from '../../../../dist/api-client-lib';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dizi',
  standalone: true,
  imports: [NgFor, NgIf, MatButton],
  templateUrl: './dizi.component.html',
  styleUrl: './dizi.component.scss'
})
export class DiziComponent implements OnInit {
  dizis!: DiziResponse[];
  favoriService = inject(FavoriDizilerControllerService)
  ngOnInit(): void {
    this.dizi.adminGetAllDizi().subscribe(res => {
      this.dizis = res;
      console.log(res);

    })
  }
  dizi = inject(DiziControllerService);
  route = inject(Router);

  goToDizi(id: any) {
    this.route.navigate(['dizi-izle', id])
  }

  addFavori(id: any) {
    this.favoriService.addFavoriDizi(id).subscribe(res => {
      
    })
  }

}
