// app.component.ts
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import {Page} from './core/models/page.model';
import {PageService} from './core/services/page.service';
import {ProfileStrapiService} from './core/services/strapi/profile.strapi.service';
import {AccueilComponent} from './features/accueil/accueil.component';
import {NgxSplideModule} from 'ngx-splide';
import {SplideOptions} from './core/models/splide-options';
import {FilesStrapiService} from './core/services/strapi/files.strapi.service';
import {ProjetsStrapiService} from './core/services/strapi/projets.strapi.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    FormsModule,
    NavbarComponent,
    NgxSplideModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  pages: Page[] = [];
  selectedPageIndex = 0;
  options!: SplideOptions;
  title!: 'portfolio-frontend';

  constructor(
    protected pageService: PageService,
    private profileService: ProfileStrapiService,
    private filesService: FilesStrapiService,
    private projetsService: ProjetsStrapiService,
  ) {}

  ngOnInit(): void {
    this.pages = this.pageService.pages;
    this.profileService.loadProfile();
    this.filesService.loadFiles();
    this.projetsService.loadProjets();

    this.options = {
      speed: 750,
      arrows: false,
      pagination: false,
      drag: false,
    }
  }
}
