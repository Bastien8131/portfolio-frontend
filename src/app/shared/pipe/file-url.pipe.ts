// src/app/shared/pipes/file-url.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { DataStoreService } from '../../core/services/store/data-store.service';

@Pipe({
  name: 'fileUrl',
  standalone: true,
  pure: true // Important : un pipe pur n'est évalué que si ses entrées changent
})
export class FileUrlPipe implements PipeTransform {
  // Cache pour stocker les résultats précédents
  private cache = new Map<string, string | null>();

  constructor(private dataStore: DataStoreService) {}

  transform(filename: string | null | undefined): string | null {
    // Si le nom de fichier est null ou undefined, retourner null directement
    if (filename === null || filename === undefined) {
      return null;
    }

    // Vérifier si nous avons déjà calculé cette URL
    if (!this.cache.has(filename)) {
      // Si non, calculer et stocker dans le cache
      this.cache.set(filename, this.dataStore.getFileByName(filename));
    }

    // Retourner depuis le cache
    return this.cache.get(filename) || null;
  }
}
