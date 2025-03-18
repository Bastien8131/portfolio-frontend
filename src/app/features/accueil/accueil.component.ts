import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ProfileStrapiService} from '../../core/services/strapi/profile.strapi.service';
import {ArticleStrapiService} from '../../core/services/strapi/article.strapi.service';
import {Article} from '../../core/models/strapi/collectionType/article.model';
import {Profile} from '../../core/models/strapi/singleType/profile.model';
import {MarkdownComponent} from 'ngx-markdown';
import {PageService} from '../../core/services/page.service';
import {FilesStrapiService} from '../../core/services/strapi/files.strapi.service';
import {StrapiFile} from '../../core/models/strapi/file.model';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-accueil',
  imports: [
    MarkdownComponent,
    NgIf
  ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent implements OnInit {
  profile!: Profile | null;
  files!: any | null;

  constructor(
    private profileService: ProfileStrapiService,
    protected pageServices: PageService,
    protected fileService: FilesStrapiService,
  ) {}

  ngOnInit() {

    this.fileService.files$.subscribe(files => {
      this.files = files;
    });

    // S'abonner aux changements du profil
    this.profileService.profile$.subscribe(profile => {
      this.profile = profile;
    });
  }

  showFile() {
    console.log(this.files);
    console.log(this.profile);
  }




}
