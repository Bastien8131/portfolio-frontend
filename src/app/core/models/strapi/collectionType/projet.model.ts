import {Article} from './article.model';
import {Technologie} from './technologie.model';
import {Repositorie} from './repositorie.model';
import {StrapiRelationList} from '../strapi.model';

export interface Projet {
  titre: string
  description: string
  dateDebut: string
  dateFin?: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
  articles: StrapiRelationList<Article>
  technologies: StrapiRelationList<Technologie>
  repositories: StrapiRelationList<Repositorie>
  // localizations: Localizations
}
