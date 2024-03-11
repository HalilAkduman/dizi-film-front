import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { DiziControllerService, DiziResponse } from '../../../../dist/api-client-lib';

@Component({
  selector: 'app-dizi-izle',
  standalone: true,
  imports: [NgFor, NgIf, MatButton],
  templateUrl: './dizi-izle.component.html',
  styleUrl: './dizi-izle.component.scss'
})
export class DiziIzleComponent implements OnInit {

  activatedRouter = inject(ActivatedRoute);
  dizi: any = Object.create(null);
  service = inject(DiziControllerService);
  router = inject(Router);
  activeBolum: any;
  activeId: any;

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(a => {

      this.activeId = a['id'];
      this.service.getDiziById(a['id']).subscribe(res => {
        this.dizi = res;
        this.dizi = {
          ...this.dizi,
          bolums: [
            {
              name: "bölüm 1",
              path: "assets/video.mp4"
            },
            {
              name: "bölüm 2",
              path: "assets/video2.mp4"
            },
            {
              name: "bölüm 3",
              path: "assets/video.mp4"
            },
            {
              name: "bölüm 4",
              path: "assets/video2.mp4"
            },
            {
              name: "bölüm 5",
              path: "assets/video.mp4"
            },
          ]
        };
        if (!a['bolum']) {
          this.activeBolum = this.dizi.bolums[0]
        } else {
          this.activeBolum = this.dizi.bolums.filter((b: any) => b.name === a['bolum'])[0];
        }
      }
      )
    })
  }

  changeBolum(name: any) {
    this.router.navigate(['/dizi-izle', this.activeId, name])
  }
}
