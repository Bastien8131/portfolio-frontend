import {Article} from './article.model';
import {Technologie} from './technologie.model';
import {Repositorie} from './repositorie.model';
import {StrapiRelation} from '../strapi.model';

export interface Projet {
  titre: string
  description: string
  dateDebut: string
  dateFin?: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
  articles: StrapiRelation<Article[]>
  technologies: StrapiRelation<Technologie[]>
  repositories: StrapiRelation<Repositorie[]>
  // localizations: Localizations
}
