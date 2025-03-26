import {Component, OnInit} from '@angular/core';
import {ProjetsStrapiService} from '../../core/services/strapi/projets.strapi.service';
import {Projet} from '../../core/models/strapi/collectionType/projet.model';
import {NgForOf, NgIf} from '@angular/common';
import {DialogArticleComponent} from '../../shared/components/dialog-article/dialog-article.component';
import {MatDialog} from '@angular/material/dialog';
import {ArticleStrapiService} from '../../core/services/strapi/article.strapi.service';

@Component({
  selector: 'app-projets',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './projets.component.html',
  styleUrl: './projets.component.scss'
})
export class ProjetsComponent implements OnInit {
  projets: Projet[] = []

  constructor(
    protected projetsService: ProjetsStrapiService,
    private articleService: ArticleStrapiService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.projetsService.projets$.subscribe(projets => {
      this.projets = projets
    })
  }


  async openArticle(id: number) {
    const article = await this.articleService.get(id);

    let dialogRef = this.dialog.open(DialogArticleComponent, {
      data: {
        article: article
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  getSortProjet() {
    if (!Array.isArray(this.projets)) {
      return [];
    }

    return this.projets.sort((a, b) => new Date(b.dateDebut).getTime() - new Date(a.dateDebut).getTime());
  }
}
