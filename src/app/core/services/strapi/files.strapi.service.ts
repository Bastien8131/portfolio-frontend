import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.strapi.service';
import { StrapiFile } from '../../models/strapi/file.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesStrapiService {
  private endpoint = 'upload/files';
  private fileSubject = new BehaviorSubject<StrapiFile[] | null>(null);
  public file$ = this.fileSubject.asObservable();
  private loaded = false;
  private apiUrl = environment.strapiUrl + '/api';
  private apiToken = environment.strapiApiToken;

  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) { }

  loadFiles() {
    if (!this.loaded) {
      this.get().subscribe({
        next: (data) => {
          this.fileSubject.next(data);
          this.loaded = true;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des fichiers:', error);
        }
      });
    }
  }

  private get(): Observable<StrapiFile[]> {
    // L'API upload/files ne suit pas le même format que les autres endpoints,
    // donc on doit faire une requête HTTP directe au lieu d'utiliser apiService.getCollection
    return this.http.get<StrapiFile[]>(`${this.apiUrl}/${this.endpoint}`, {
      headers: {
        'Authorization': `Bearer ${this.apiToken}`
      }
    });
  }

  getFiles() {
    return this.file$;
  }

  // Méthode pour récupérer l'URL complète d'un fichier par son nom
  getFile(filename: string): string | null {
    const files = this.fileSubject.getValue();
    if (!files) return null;

    const file = files.find(f => f.name === filename);
    if (!file) return null;

    if (file.ext == '.svg') return environment.strapiUrl + file.url;

    return environment.strapiUrl + file.formats.thumbnail.url;
  }
}
