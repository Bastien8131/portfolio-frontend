import {Component, OnInit} from '@angular/core';
import {ProfileStrapiService} from '../../core/services/strapi/profile.strapi.service';
import {ArticleStrapiService} from '../../core/services/strapi/article.strapi.service';
import {Article} from '../../core/models/strapi/collectionType/article.model';
import {Profile} from '../../core/models/strapi/singleType/profile.model';

@Component({
  selector: 'app-accueil',
  imports: [],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent implements OnInit {
  profile: Profile | undefined;

  constructor(
    private articleService: ArticleStrapiService,
    private profileService: ProfileStrapiService,
  ) {}

  ngOnInit() {
    this.profileService.get().subscribe({
      next: (data) => { this.profile = data; },
      error: (error) => {
        console.error('Erreur lors de la récupération de l\'article:', error);
      }
    });
  }
}
