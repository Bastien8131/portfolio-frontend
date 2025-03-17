// shared/components/navbar/navbar.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Page} from '../../../core/models/page.model';

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

  selectPage(index: number): void {
    this.pageSelected.emit(index);
  }
}
