// shared/components/navbar/navbar.component.ts
import { Component, EventEmitter, Input, Output, ElementRef, ViewChild, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Page } from '../../../core/models/page.model';
import { PageService } from '../../../core/services/page.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnChanges {
  @Input() pages: Page[] = [];
  @Input() selectedIndex = 0;
  @Output() pageSelected = new EventEmitter<number>();
  @ViewChild('navItems', { static: true }) navItems!: ElementRef;

  constructor(protected pageService: PageService) {}

  ngOnInit(): void {
    this.updateNavProperties();
  }

  ngOnChanges(): void {
    this.updateNavProperties();
  }

  private updateNavProperties(): void {
    if (this.navItems?.nativeElement) {
      this.navItems.nativeElement.style.setProperty('--nav-count', this.pages.length.toString());
      this.navItems.nativeElement.style.setProperty('--active-index', this.pageService.currentPage.toString());
    }
  }

  selectPage(index: number): void {
    this.navItems.nativeElement.style.setProperty('--active-index', index.toString());
    this.pageSelected.emit(index);
  }
}
