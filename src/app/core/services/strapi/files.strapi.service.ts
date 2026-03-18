import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { ApiService } from './api.strapi.service';
import { StrapiFile } from '../../models/strapi/file.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesStrapiService {
  private filesSubject = new BehaviorSubject<StrapiFile[]>([]);
  public files$ = this.filesSubject.asObservable();
  private loaded = false;

  constructor(private apiService: ApiService) {}

  loadFiles() {
    if (!this.loaded) {
      this.apiService.getUploadFiles().subscribe({
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

  getFiles(): Observable<StrapiFile[]> {
    return this.files$;
  }

  async get(id: number): Promise<StrapiFile> {
    return await firstValueFrom(
      this.apiService.getFile<StrapiFile>(id, { populate: '*' })
    );
  }

  /**
   * Retourne l'URL complète d'un fichier par son nom.
   * Retourne le thumbnail pour les images, l'URL directe pour les SVG.
   */
  getFileUrl(filename: string): string | null {
    const file = this.filesSubject.getValue().find(f => f.name === filename);
    if (!file) return null;

    if (file.ext === '.svg') return environment.strapiUrl + file.url;

    return environment.strapiUrl + file.formats.thumbnail.url;
  }
}
