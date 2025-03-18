import { Injectable } from '@angular/core';
import {Page} from '../models/page.model';
import {AccueilComponent} from '../../features/accueil/accueil.component';
import {ProjetsComponent} from '../../features/projets/projets.component';
import {AProposComponent} from '../../features/a-propos/a-propos.component';
import {ContactComponent} from '../../features/contact/contact.component';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private _currentPage: number = 0;
  private _pages: Page[] = [
    {
      id: 'accueil',
      label: 'Accueil',
      component: AccueilComponent,
      icon: 'home' // Si vous utilisez des icônes dans la navbar
    },
    {
      id: 'projets',
      label: 'Projets',
      component: ProjetsComponent,
      icon: 'work'
    },
    {
      id: 'apropos',
      label: 'À Propos',
      component: AProposComponent,
      icon: 'info'
    },
    {
      id: 'contact',
      label: 'Contact',
      component: ContactComponent,
      icon: 'contact'
    }
  ];

  get pages(): Page[] {
    return [...this._pages]; // Retourne une copie pour éviter la modification directe
  }

  getPageById(id: string): Page | undefined {
    return this._pages.find(page => page.id === id);
  }

  getPageIndexById(id: string): number {
    return this._pages.findIndex(page => page.id === id);
  }


  get currentPage(): number {
    return this._currentPage;
  }

  set currentPage(value: number) {
    if (value >= 0 && value < this._pages.length) {
      this._currentPage = value;
    }
  }

  goTo(name: string) {
    const index = this.getPageIndexById(name);
    this.currentPage = index;
  }
}
