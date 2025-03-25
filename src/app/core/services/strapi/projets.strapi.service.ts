import { Injectable } from '@angular/core';
import {ApiService} from './api.strapi.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {Article} from '../../models/strapi/collectionType/article.model';
import {Projet} from '../../models/strapi/collectionType/projet.model';
import {Profile} from '../../models/strapi/singleType/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProjetsStrapiService {
  private endpoint = 'projets';
  private projetsSubject = new BehaviorSubject<Projet[]>({} as Projet[]);
  public projets$ = this.projetsSubject.asObservable();
  private loaded = false;

  constructor(private apiService: ApiService) { }

  loadProjets() {
    if (!this.loaded) {
      this.getAll().subscribe({
        next: (data) => {
          this.projetsSubject.next(data);
          this.loaded = true;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération du profil:', error);
        }
      });
    }
  }

  get(id: number): Observable<Projet> {
    return this.apiService.getItem<Projet>(this.endpoint, id, { populate: '*' })
  }

  getAll(): Observable<Projet[]> {
    return this.apiService.getCollection<Projet>(this.endpoint, { populate: '*' })
  }
}
