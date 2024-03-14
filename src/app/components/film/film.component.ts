import { Component, inject } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { FavoriFilmlerControllerService, FilmControllerService, FilmResponse, GeKullaniciFavoriteResponseFilm, KullaniciControllerService, RemoveFavoriFilmRequest } from '../../../../dist/api-client-lib';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FragmanDialogComponent } from '../dialogs/fragman-dialog/fragman-dialog.component';
import { MatButton } from '@angular/material/button';
import { SafePipe } from '../utils/safe-pipe';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-film',
  standalone: true,
  imports: [NgFor, NgIf, MatButton, SafePipe, MatIconModule],
  templateUrl: './film.component.html',
  styleUrl: './film.component.scss'
})
export class FilmComponent {
  dizis!: FilmResponse[];
  favoriService = inject(FavoriFilmlerControllerService);
  favoriDizis!: GeKullaniciFavoriteResponseFilm[];
  kullaniciService = inject(KullaniciControllerService);
  dialog = inject(MatDialog);
  dizi = inject(FilmControllerService);
  route = inject(Router);

  ngOnInit(): void {
    this.dizi.getAllFilms().subscribe(res => {
      this.dizis = res;
    });

    this.favoriService.getFavorilerByKullanici().subscribe(res => {
      this.favoriDizis = res
    })
  }


  goToDizi(id: any) {
    this.route.navigate(['film-izle', id])
  }

  addFavori(id: any) {
    this.favoriService.addFavoriFilm(id).subscribe(res => {
      console.log(res);
    })
  }

  check(name: any): boolean {
    if (!(this.favoriDizis.length !== 0)) {
      return true
    }
    return this.favoriDizis.filter(a => a.filmName === name).length !== 0 ? true : false
  }

  deleteFav(id: any) {
    let req: RemoveFavoriFilmRequest = {
      filmId: id
    }
    this.favoriService.removeFavoriteFilm(req).subscribe(res => {
      console.log(res);
    })
  }

  goToFragman(fragmanPath: string) {
    const dialogRef = this.dialog.open(FragmanDialogComponent, {
      data: { fragmanPath: fragmanPath },
      width: '700px',
      height: '450px'
    });
  }



}
