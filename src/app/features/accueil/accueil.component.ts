import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ProfileStrapiService} from '../../core/services/strapi/profile.strapi.service';
import {ArticleStrapiService} from '../../core/services/strapi/article.strapi.service';
import {Article} from '../../core/models/strapi/collectionType/article.model';
import {Profile} from '../../core/models/strapi/singleType/profile.model';
import {MarkdownComponent} from 'ngx-markdown';

@Component({
  selector: 'app-accueil',
  imports: [
    MarkdownComponent
  ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent implements OnInit {
  profile!: Profile | null;

  constructor(
    private profileService: ProfileStrapiService,
  ) {}

  ngOnInit() {
    // Charger le profil si ce n'est pas déjà fait
    this.profileService.loadProfile();

    // S'abonner aux changements du profil
    this.profileService.profile$.subscribe(profile => {
      this.profile = profile;
    });
  }
}
