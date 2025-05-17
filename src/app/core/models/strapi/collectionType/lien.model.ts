import {StrapiImage, StrapiRelation} from '../strapi.model';
import {StrapiFile} from '../file.model';

export interface Liens {
  nom: string
  url: string
  logo: StrapiRelation<StrapiFile>
  documents: StrapiRelation<StrapiFile>
  createdAt: string
  updatedAt: string
}
