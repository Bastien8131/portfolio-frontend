import {Component, OnInit} from '@angular/core';
import {ProjetsStrapiService} from '../../core/services/strapi/projets.strapi.service';
import {Projet} from '../../core/models/strapi/collectionType/projet.model';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-projets',
  imports: [
    NgForOf
  ],
  templateUrl: './projets.component.html',
  styleUrl: './projets.component.scss'
})
export class ProjetsComponent implements OnInit {
  projets!: Projet[]

  constructor(
    protected projetsService: ProjetsStrapiService,
  ) {
  }

  ngOnInit() {
    this.projetsService.projets$.subscribe(projets => {
      this.projets = projets.sort((a, b) => new Date(b.dateDebut).getTime() - new Date(a.dateDebut).getTime());
    })
  }


}
