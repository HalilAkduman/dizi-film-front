import { Component, inject } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { DiziControllerService, DiziResponse, FavoriDizilerControllerService, FilmControllerService, GetAllFilmsResponse } from '../../../../dist/api-client-lib';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-film',
  standalone: true,
  imports: [NgFor],
  templateUrl: './film.component.html',
  styleUrl: './film.component.scss'
})
export class FilmComponent {
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
