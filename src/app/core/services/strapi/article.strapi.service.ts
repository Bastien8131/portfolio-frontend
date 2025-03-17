import { Injectable } from '@angular/core';
import {ApiService} from './api.strapi.service';
import {Observable} from 'rxjs';
import {Article} from '../../models/strapi/collectionType/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleStrapiService {
  private endpoint = 'articles'; //Pour tester

  constructor(private apiService: ApiService) { }

  get(id: number): Observable<Article> {
    return this.apiService.getItem<Article>(this.endpoint, id, { populate: '*' });
  }
}
