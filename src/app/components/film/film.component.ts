import { Component, inject } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { FilmControllerService, GetAllFilmsResponse } from '../../../../dist/api-client-lib';

@Component({
  selector: 'app-film',
  standalone: true,
  imports: [],
  templateUrl: './film.component.html',
  styleUrl: './film.component.scss'
})
export class FilmComponent {
  filmService = inject(FilmControllerService);
  authService = inject(AuthService);
  films: GetAllFilmsResponse[] = []

  ngOnInit(): void {
    this.authService._currentUser.subscribe(res => {
      console.log(res);
    })
    this.filmService.adminGetAllFilms().subscribe(res => {
      this.films = res;
    })
  }
}
