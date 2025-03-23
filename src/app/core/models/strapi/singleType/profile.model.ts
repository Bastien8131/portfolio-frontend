// models/profile.model.ts
import {StrapiRelation} from '../strapi.model';
import {StrapiFile} from '../file.model';

export interface Profile {
  statut: string
  dateNaissance: string
  email: string
  cursus: string
  createdAt: string
  updatedAt: string
  locale: string
  descriptionAccueil: string
  descriptionAPropos: string
  reseau: any
  cv: StrapiRelation<StrapiFile>
  localizations: any
}
