import { Injectable } from '@angular/core';
import {BehaviorSubject, firstValueFrom, Observable} from 'rxjs';
import { ApiService } from './api.strapi.service';
import { StrapiFile } from '../../models/strapi/file.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesStrapiService {
  private endpoint = 'upload/files';
  private filesSubject = new BehaviorSubject<StrapiFile[]>([]);
  public files$ = this.filesSubject.asObservable();
  private loaded = false;
  private apiUrl = environment.strapiUrl + '/api';
  private apiToken = environment.strapiApiToken;

  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) { }

  loadFiles() {
    if (!this.loaded) {
      this.getAll().subscribe({
        next: (data) => {
          this.filesSubject.next(data);
          this.loaded = true;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des fichiers:', error);
        }
      });
    }
  }

  private getAll(): Observable<StrapiFile[]> {
    // L'API upload/files ne suit pas le même format que les autres endpoints,
    // donc on doit faire une requête HTTP directe au lieu d'utiliser apiService.getCollection
    return this.http.get<StrapiFile[]>(`${this.apiUrl}/${this.endpoint}`, {
      headers: {
        'Authorization': `Bearer ${this.apiToken}`
      }
    });
  }

  getFiles() {
    return this.files$;
  }

  async get(id: number): Promise<StrapiFile> {
    return await firstValueFrom(
      this.apiService.getFile<StrapiFile>(id, {populate: '*'})
    );
  }

  // Méthode pour récupérer l'URL complète d'un fichier par son nom
  getFile(filename: string): string | null {
    const files = this.filesSubject.getValue();

    const file = files.find(f => f.name === filename);
    if (!file) return null;

    if (file.ext == '.svg') return environment.strapiUrl + file.url;

    return environment.strapiUrl + file.formats.thumbnail.url;
  }
}
