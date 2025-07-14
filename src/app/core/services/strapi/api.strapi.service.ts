import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environmentDev } from '../../../../environments/environment.dev';
import {map, Observable} from 'rxjs';
import {StrapiData, StrapiRoot} from '../../models/strapi/strapi.model';
import {StrapiFile} from '../../models/strapi/file.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environmentDev.strapiUrl + '/api';
  private apiToken = environmentDev.strapiApiToken;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiToken}`
    });
  }


  /**
   * Récupère tous les items d'une collection
   */
  getCollection<T>(endpoint: string, params?: any): Observable<T[]> {
    let httpParams = new HttpParams();

    // Ajoutez les paramètres comme avant
    if (params) {
      if (params.populate) {
        httpParams = httpParams.append('populate', params.populate);
      }
      // Autres paramètres...
    }

    return this.http.get<StrapiRoot<T>>(
      `${this.apiUrl}/${endpoint}`,
      {
        headers: this.getHeaders(),
        params: httpParams
      }
    ).pipe(
      map((response: StrapiRoot<T>) => {
        // Vérifier si data est un tableau
        if (Array.isArray(response.data)) {
          return response.data.map(item => ({
            id: item.id,
            ...item.attributes
          } as unknown as T));
        } else {
          // Si data est un objet unique
          return [{
            id: response.data.id,
            ...response.data.attributes
          }] as unknown as T[];
        }
      })
    );
  }

  // Récupère un item d'une collection
  getItem<T>(endpoint: string, id: number, params?: any): Observable<T> {
    let httpParams = new HttpParams();

    if (params?.populate) {
      httpParams = httpParams.append('populate', params.populate);
    }

    return this.http.get<{ data: StrapiData<T> }>(
      `${this.apiUrl}/${endpoint}/${id}`,
      {
        headers: this.getHeaders(),
        params: httpParams
      }
    ).pipe(
      map(response => ({
        id: response.data.id,
        ...response.data.attributes
      } as unknown as T))
    );
  }

  // Récupère un item d'une collection
  getFile<T>(id: number, params?: any): Observable<T> {
    const httpParams = params?.populate ? new HttpParams().append('populate', params.populate) : new HttpParams();

    return this.http.get<StrapiFile>(
      `${this.apiUrl}/upload/files/${id}`,
      {
        headers: this.getHeaders(),
        params: httpParams
      }
    ).pipe(
      map(response => response as unknown as T)
    );
  }

  // Récupère un single type
  getSingleType<T>(endpoint: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();

    if (params?.populate) {
      httpParams = httpParams.append('populate', params.populate);
    }

    return this.http.get<{ data: StrapiData<T> }>(
      `${this.apiUrl}/${endpoint}`,
      {
        headers: this.getHeaders(),
        params: httpParams
      }
    ).pipe(
      map(response => ({
        id: response.data.id,
        ...response.data.attributes
      } as unknown as T))
    );
  }

  createItem<T>(endpoint: string, data: Partial<T>): Observable<T> {
    return this.http.post<{ data: StrapiData<T> }>(
      `${this.apiUrl}/${endpoint}`,
      { data },
      { headers: this.getHeaders() }
    ).pipe(
      map(response => ({
        id: response.data.id,
        ...response.data.attributes
      } as unknown as T))
    );
  }

  updateItem<T>(endpoint: string, id: number, data: Partial<T>): Observable<T> {
    return this.http.put<{ data: StrapiData<T> }>(
      `${this.apiUrl}/${endpoint}/${id}`,
      { data },
      { headers: this.getHeaders() }
    ).pipe(
      map(response => ({
        id: response.data.id,
        ...response.data.attributes
      } as unknown as T))
    );
  }

  deleteItem<T>(endpoint: string, id: number): Observable<T> {
    return this.http.delete<{ data: StrapiData<T> }>(
      `${this.apiUrl}/${endpoint}/${id}`,
      { headers: this.getHeaders() }
    ).pipe(
      map(response => ({
        id: response.data.id,
        ...response.data.attributes
      } as unknown as T))
    );
  }
}
