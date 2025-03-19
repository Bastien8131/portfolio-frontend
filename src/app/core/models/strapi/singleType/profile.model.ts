// models/profile.model.ts
import {Lien} from '../collectionType/lien.model';

export interface Profile {
  id: number;
  statut: string;
  dateNaissance: string;
  email: string;
  cursus: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
  reseau: Reseau
  descriptionAccueil: string;
  descriptionAPropos: string;
}

interface Reseau {
  data: Daum[]
}

interface Daum {
  id: number
  attributes: Lien
}
