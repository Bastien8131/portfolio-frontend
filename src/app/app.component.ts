// app.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { Page } from './core/models/page.model';
import { PageService } from './core/services/page.service';
import { NgxSplideModule } from 'ngx-splide';
import { SplideOptions } from './core/models/splide-options';
import { DataStoreService } from './core/services/store/data-store.service';
import {Observable} from 'rxjs';
import {LoaderComponent} from './shared/components/loader/loader.component';
import {ErrorMessageComponent} from './shared/components/error-message/error-message.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    FormsModule,
    NavbarComponent,
    NgxSplideModule,
    LoaderComponent,
    ErrorMessageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  pages: Page[] = [];
  options!: SplideOptions;
  title!: 'portfolio-frontend';
  isLoading$!: Observable<boolean>;

  constructor(
    protected pageService: PageService,
    private dataStore: DataStoreService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.dataStore.isLoading$; // Initialisation ici
    this.pages = this.pageService.pages;

    // Load all data from Strapi
    this.dataStore.loadAllData();

    this.options = {
      speed: 750,
      arrows: false,
      pagination: false,
      drag: false,
    };
  }
}
