import { Component } from '@angular/core';
import { Projet } from '../../core/models/strapi/collectionType/projet.model';
import {AsyncPipe, DatePipe, NgForOf, NgIf, NgStyle} from '@angular/common';
import { DialogArticleComponent } from '../../shared/components/dialog-article/dialog-article.component';
import { MatDialog } from '@angular/material/dialog';
import { ArticleStrapiService } from '../../core/services/strapi/article.strapi.service';
import { DataStoreService } from '../../core/services/store/data-store.service';
import { Observable } from 'rxjs';
import {FileUrlPipe} from '../../shared/pipe/file-url.pipe';

@Component({
  selector: 'app-projets',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    AsyncPipe,
    NgStyle,
    DatePipe,
    FileUrlPipe
  ],
  templateUrl: './projets.component.html',
  styleUrl: './projets.component.scss'
})
export class ProjetsComponent {
  // Typage explicite des observables
  projets$: Observable<Projet[]>;
  isLoading$: Observable<boolean>;

  constructor(
    protected dataStore: DataStoreService,
    private articleService: ArticleStrapiService,
    public dialog: MatDialog
  ) {
    // Initialisation après la déclaration
    this.projets$ = this.dataStore.projets$;
    this.isLoading$ = this.dataStore.projetsLoading$;
  }

  async openArticle(id: number) {
    const article = await this.articleService.get(id);

    // Dans projets.component.ts
    const dialogRef = this.dialog.open(DialogArticleComponent, {
      data: { article: article },
      maxWidth: '90vw',
      maxHeight: '90vh',
      panelClass: 'article-dialog',
      autoFocus: false // Désactive le focus automatique qui peut causer des problèmes de scroll
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
