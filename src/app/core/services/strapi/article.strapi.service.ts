import {Injectable} from '@angular/core';
import {ApiService} from './api.strapi.service';
import {BehaviorSubject, firstValueFrom, Observable} from 'rxjs';
import {Article} from '../../models/strapi/collectionType/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleStrapiService {
  private endpoint = 'articles';
  private articlesSubject = new BehaviorSubject<Article[]>({} as Article[]);
  public articles$ = this.articlesSubject.asObservable();
  private loaded = false;

  constructor(private apiService: ApiService) { }

  loadArticles() {
    if (!this.loaded) {
      this.getAll().subscribe({
        next: (data) => {
          this.articlesSubject.next(data);
          this.loaded = true;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération du profil:', error);
        }
      });
    }
  }

  async get(id: number): Promise<Article> {
    return await firstValueFrom(
      this.apiService.getItem<Article>(this.endpoint, id, {populate: '*'})
    );
  }

  getAll(): Observable<Article[]> {
    return this.apiService.getCollection<Article>(this.endpoint, { populate: '*' })
  }
}
