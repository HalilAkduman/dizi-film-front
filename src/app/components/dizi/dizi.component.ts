import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { GetAllDiziResponse, FavoriDizilerControllerService, DiziControllerService } from '../../../../dist/api-client-lib';

@Component({
  selector: 'app-dizi',
  standalone: true,
  imports: [NgFor, NgIf, MatButton],
  templateUrl: './dizi.component.html',
  styleUrl: './dizi.component.scss'
})
export class DiziComponent implements OnInit {
  dizis!: GetAllDiziResponse[];
  favoriService = inject(FavoriDizilerControllerService);
  favoriDizis!: GetAllDiziResponse[];
  ngOnInit(): void {
    this.dizi.getAllDizi().subscribe(res => {
      this.dizis = res;
      console.log(this.dizis);

      // this.favoriDizis = this.dizis.filter(dizi => dizi.id === ) 

    })
  }
  dizi = inject(DiziControllerService);
  route = inject(Router);

  goToDizi(id: any) {
    this.route.navigate(['dizi-izle', id])
  }

  addFavori(id: any) {
    this.favoriService.addFavoriDizi(id).subscribe(res => {
      console.log(res);
    })
  }

}
