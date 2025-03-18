import { Injectable } from '@angular/core';
import {ApiService} from './api.strapi.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {Profile} from '../../models/strapi/singleType/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileStrapiService {
  private endpoint = 'profile';
  private profileSubject = new BehaviorSubject<Profile>({} as Profile);
  public profile$ = this.profileSubject.asObservable();
  private loaded = false;

  constructor(private apiService: ApiService) { }

  loadProfile() {
    if (!this.loaded) {
      this.get().subscribe({
        next: (data) => {
          this.profileSubject.next(data);
          this.loaded = true;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération du profil:', error);
        }
      });
    }
  }

  private get(): Observable<Profile> {
    return this.apiService.getSingleType<Profile>(this.endpoint, { populate: '*' });
  }

  getProfile() {
    return this.profile$;
  }
}
