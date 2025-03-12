// app.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import {Page} from './core/models/page.model';
import {PageService} from './core/services/page.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    FormsModule,
    NavbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  pages: Page[] = [];
  selectedPageIndex = 0;
  tempIndex: number | undefined;

  constructor(private pageService: PageService) {}

  ngOnInit(): void {
    this.pages = this.pageService.pages;
  }

  changeTab(): void {
    if (this.tempIndex !== undefined) {
      this.selectedPageIndex = this.tempIndex;
    }
  }
}
