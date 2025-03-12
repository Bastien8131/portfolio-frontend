import { Injectable } from '@angular/core';
import {ApiService} from './api.strapi.service';
import {Observable} from 'rxjs';
import {Profile} from '../../models/strapi/singleType/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileStrapiService {
  private endpoint = 'profile'; //Pour tester

  constructor(private apiService: ApiService) { }

  get(): Observable<Profile> {
    return this.apiService.getSingleType<Profile>(this.endpoint, { populate: '*' });
  }
}
