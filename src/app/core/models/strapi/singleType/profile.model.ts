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
  reseau: Reseau
  cv: StrapiRelation<StrapiFile>
  localizations: any
}

interface Reseau {
  data: Daum[]
}

interface Daum {
  id: number
  attributes: Lien
}
