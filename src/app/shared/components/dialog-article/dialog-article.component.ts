import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Article} from '../../../core/models/strapi/collectionType/article.model';
import {MarkdownComponent} from 'ngx-markdown';

@Component({
  selector: 'app-dialog-article',
  imports: [
    MarkdownComponent
  ],
  templateUrl: './dialog-article.component.html',
  styleUrl: './dialog-article.component.scss'
})
export class DialogArticleComponent implements OnInit {
  article!: Article;

  constructor(
    public dialogRef: MatDialogRef<DialogArticleComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.article = data.article as Article;
  }

  ngOnInit() {
    console.log(this.data);
    console.log('test', this.article);
  }

}
