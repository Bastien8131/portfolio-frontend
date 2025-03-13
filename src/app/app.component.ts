// app.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import {Page} from './core/models/page.model';
import {PageService} from './core/services/page.service';
import {ProfileStrapiService} from './core/services/strapi/profile.strapi.service';
import {AccueilComponent} from './features/accueil/accueil.component';
import {NgxSplideModule} from 'ngx-splide';

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
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  pages: Page[] = [];
  selectedPageIndex = 0;
  options: any;

  constructor(
    private pageService: PageService,
    private profileService: ProfileStrapiService
  ) {}

  ngOnInit(): void {
    this.pages = this.pageService.pages;
    // this.profileService.loadProfile();
    this.options = {
      speed: 750,
      arrows: false,
      pagination: false,
    }
  }
}
