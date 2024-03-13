import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { GetAllDiziResponse, FavoriDizilerControllerService, DiziControllerService, DiziResponse, GeKullaniciFavoriteResponseDizi, KullaniciControllerService, RemoveFavoriDiziRequest } from '../../../../dist/api-client-lib';
import { AuthService } from 'app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { FragmanDialogComponent } from '../dialogs/fragman-dialog/fragman-dialog.component';

@Component({
  selector: 'app-dizi',
  standalone: true,
  imports: [NgFor, NgIf, MatButton],
  templateUrl: './dizi.component.html',
  styleUrl: './dizi.component.scss'
})
export class DiziComponent implements OnInit {

  dizis!: DiziResponse[];
  favoriService = inject(FavoriDizilerControllerService);
  favoriDizis!: GeKullaniciFavoriteResponseDizi[];
  kullaniciService = inject(KullaniciControllerService);
  dialog = inject(MatDialog);

  ngOnInit(): void {
    this.dizi.getAllDizi().subscribe(res => {
      this.dizis = res;
    });

    this.favoriService.getFavorilerByKullanici1().subscribe(res => {
      this.favoriDizis = res
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

  check(name: any): boolean {
    if (!(this.favoriDizis.length !== 0)) {
      return true
    }
    return this.favoriDizis.filter(a => a.diziName === name).length !== 0 ? true : false
  }

  deleteFav(id: any) {
    let req: RemoveFavoriDiziRequest = {
      diziId: id
    }
    this.favoriService.removeFavoriteDizi(req).subscribe(res => {
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
