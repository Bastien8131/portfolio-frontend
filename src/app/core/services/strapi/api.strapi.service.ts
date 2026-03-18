import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map, Observable } from 'rxjs';
import { StrapiData, StrapiRoot } from '../../models/strapi/strapi.model';
import { StrapiFile } from '../../models/strapi/file.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.strapiUrl + '/api';
  private apiToken = environment.strapiApiToken;

  constructor(private http: HttpClient) {}

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiToken}`
    });
  }

  /**
   * Récupère tous les items d'une collection (format REST Strapi standard)
   */
  getCollection<T>(endpoint: string, params?: any): Observable<T[]> {
    let httpParams = new HttpParams();
    if (params?.populate) {
      httpParams = httpParams.append('populate', params.populate);
    }

    return this.http.get<StrapiRoot<T>>(
      `${this.apiUrl}/${endpoint}`,
      { headers: this.getHeaders(), params: httpParams }
    ).pipe(
      map((response: StrapiRoot<T>) => {
        if (Array.isArray(response.data)) {
          return response.data.map(item => ({ id: item.id, ...item.attributes } as unknown as T));
        }
        return [{ id: response.data.id, ...response.data.attributes }] as unknown as T[];
      })
    );
  }

  /**
   * Récupère un item par id
   */
  getItem<T>(endpoint: string, id: number, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    if (params?.populate) {
      httpParams = httpParams.append('populate', params.populate);
    }

    return this.http.get<{ data: StrapiData<T> }>(
      `${this.apiUrl}/${endpoint}/${id}`,
      { headers: this.getHeaders(), params: httpParams }
    ).pipe(
      map(response => ({ id: response.data.id, ...response.data.attributes } as unknown as T))
    );
  }

  /**
   * Récupère un single type
   */
  getSingleType<T>(endpoint: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    if (params?.populate) {
      httpParams = httpParams.append('populate', params.populate);
    }

    return this.http.get<{ data: StrapiData<T> }>(
      `${this.apiUrl}/${endpoint}`,
      { headers: this.getHeaders(), params: httpParams }
    ).pipe(
      map(response => ({ id: response.data.id, ...response.data.attributes } as unknown as T))
    );
  }

  /**
   * Récupère un fichier upload par id
   */
  getFile<T>(id: number, params?: any): Observable<T> {
    const httpParams = params?.populate
      ? new HttpParams().append('populate', params.populate)
      : new HttpParams();

    return this.http.get<StrapiFile>(
      `${this.apiUrl}/upload/files/${id}`,
      { headers: this.getHeaders(), params: httpParams }
    ).pipe(map(response => response as unknown as T));
  }

  /**
   * Récupère tous les fichiers upload.
   * L'endpoint /upload/files retourne un tableau brut (pas le format { data: [] } standard).
   */
  getUploadFiles(): Observable<StrapiFile[]> {
    return this.http.get<StrapiFile[]>(
      `${this.apiUrl}/upload/files`,
      { headers: this.getHeaders() }
    );
  }

  createItem<T>(endpoint: string, data: Partial<T>): Observable<T> {
    return this.http.post<{ data: StrapiData<T> }>(
      `${this.apiUrl}/${endpoint}`,
      { data },
      { headers: this.getHeaders() }
    ).pipe(
      map(response => ({ id: response.data.id, ...response.data.attributes } as unknown as T))
    );
  }

  updateItem<T>(endpoint: string, id: number, data: Partial<T>): Observable<T> {
    return this.http.put<{ data: StrapiData<T> }>(
      `${this.apiUrl}/${endpoint}/${id}`,
      { data },
      { headers: this.getHeaders() }
    ).pipe(
      map(response => ({ id: response.data.id, ...response.data.attributes } as unknown as T))
    );
  }

  deleteItem<T>(endpoint: string, id: number): Observable<T> {
    return this.http.delete<{ data: StrapiData<T> }>(
      `${this.apiUrl}/${endpoint}/${id}`,
      { headers: this.getHeaders() }
    ).pipe(
      map(response => ({ id: response.data.id, ...response.data.attributes } as unknown as T))
    );
  }
}
