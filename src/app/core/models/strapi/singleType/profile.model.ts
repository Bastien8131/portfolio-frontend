// models/profile.model.ts
export interface Profile {
  id: number;
  statut: string;
  dateNaissance: string;
  email: string;
  cursus: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
  descriptionAccueil: string;
  descriptionAPropos: string;
}
