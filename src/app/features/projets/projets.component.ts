import { Component } from '@angular/core';
import { Projet } from '../../core/models/strapi/collectionType/projet.model';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { DialogArticleComponent } from '../../shared/components/dialog-article/dialog-article.component';
import { MatDialog } from '@angular/material/dialog';
import { ArticleStrapiService } from '../../core/services/strapi/article.strapi.service';
import { DataStoreService } from '../../core/services/store/data-store.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-projets',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    AsyncPipe
  ],
  template: `
    <div class="page-content">
      <ng-container *ngIf="isLoading$ | async">
        <div class="loading">Chargement des projets...</div>
      </ng-container>

      <ng-container *ngIf="(projets$ | async) as projets">
        <div *ngIf="projets.length === 0 && !(isLoading$ | async)" class="no-data">
          Aucun projet disponible pour le moment.
        </div>

        <div *ngFor="let projet of sortProjets(projets)" class="card">
          <h3>{{projet.titre}}</h3>
          <p>{{projet.description}}</p>
          <button
            *ngIf="projet.articles.data.length !== 0"
            (click)="openArticle(projet.articles.data[0].id)"
          >Voir le projet</button>
        </div>
      </ng-container>
    </div>
  `,
  styleUrl: './projets.component.scss'
})
export class ProjetsComponent {
  projets$;
  isLoading$;

  constructor(
    private dataStore: DataStoreService,
    private articleService: ArticleStrapiService,
    public dialog: MatDialog
  ) {
    this.projets$ = this.dataStore.projets$;
    this.isLoading$ = this.dataStore.projetsLoading$;
  }

  async openArticle(id: number) {
    const article = await this.articleService.get(id);

    const dialogRef = this.dialog.open(DialogArticleComponent, {
      data: { article: article }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  sortProjets(projets: Projet[]): Projet[] {
    if (!Array.isArray(projets)) {
      return [];
    }

    return [...projets].sort((a, b) =>
      new Date(b.dateDebut).getTime() - new Date(a.dateDebut).getTime()
    );
  }
}
