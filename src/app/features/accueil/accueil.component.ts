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
  template: `
    <div class="page-content">
      <div class="heading">
        <img
          *ngIf="(files$ | async)?.length"
          [src]="getFileUrl('logo.svg')"
          alt="Logo">
        <h2>{{ (profile$ | async)?.statut }}</h2>
      </div>

      <div>
        <markdown [data]="(profile$ | async)?.descriptionAccueil"></markdown>

        <p>
          J'ai piqué votre curiosité, aller voir
          <u class="link" (click)="pageServices.goTo('projets')">mes projets</u>
        </p>
      </div>
    </div>
  `,
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
