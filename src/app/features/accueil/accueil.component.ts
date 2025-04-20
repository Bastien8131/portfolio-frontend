import { Component } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { PageService } from '../../core/services/page.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { DataStoreService } from '../../core/services/store/data-store.service';
import { Observable } from 'rxjs';
import { Profile } from '../../core/models/strapi/singleType/profile.model';
import { StrapiFile } from '../../core/models/strapi/file.model';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    MarkdownComponent,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent {
  // Typage explicite des observables
  profile$: Observable<Profile | null>;
  files$: Observable<StrapiFile[]>;

  constructor(
    protected pageServices: PageService,
    private dataStore: DataStoreService
  ) {
    // Initialisation après la déclaration
    this.profile$ = this.dataStore.profile$;
    this.files$ = this.dataStore.files$;
  }

  getFileUrl(filename: string): string | null {
    return this.dataStore.getFileByName(filename);
  }
}
