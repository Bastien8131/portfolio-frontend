// shared/components/navbar/navbar.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Page} from '../../../core/models/page.model';
import {PageService} from '../../../core/services/page.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input() pages: Page[] = [];
  @Input() selectedIndex = 0;
  @Output() pageSelected = new EventEmitter<number>();

  constructor(
    protected pageService: PageService,
    private router: Router
  ) {}

  selectPage(index: number): void {
    this.pageSelected.emit(index);
  }
}
