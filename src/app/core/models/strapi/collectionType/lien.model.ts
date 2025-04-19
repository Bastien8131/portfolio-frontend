import {StrapiImage} from '../strapi.model';
import {StrapiFile} from '../file.model';

export interface Liens {
  nom: string
  url: string
  logo: StrapiFile
  documents: StrapiFile
  createdAt: string
  updatedAt: string
}
