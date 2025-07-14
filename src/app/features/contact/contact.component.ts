import { Component } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { environmentDev } from '../../../environments/environment.dev';
import { DataStoreService } from '../../core/services/store/data-store.service';
import { Liens } from '../../core/models/strapi/collectionType/lien.model';
import {Observable, of, switchMap} from 'rxjs';
import { map } from 'rxjs/operators';
import { Profile } from '../../core/models/strapi/singleType/profile.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    AsyncPipe
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private emailJSID = environmentDev.emailJS;

  // Typage explicite des observables
  profile$: Observable<Profile | null>;
  liens$: Observable<Liens[]>;

  emailForm = new FormGroup({
    nom: new FormControl('', { nonNullable: true }),
    prenom: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true }),
    message: new FormControl('', { nonNullable: true }),
  });

  constructor(
    private dataStore: DataStoreService,
  ) {
    // Initialisation après la déclaration
    // Modification de l'initialisation des liens
    this.profile$ = this.dataStore.profile$;

    // Créer un observable qui filtre les liens basé sur les IDs associés au profil
    this.liens$ = this.profile$.pipe(
      switchMap(profile => {
        if (!profile || !profile.reseau?.data) {
          return of([]); // Retourne un tableau vide si pas de profil ou pas de réseau
        }

        // Extraire les IDs des liens associés au profil
        const linkedIds = profile.reseau.data.map(item => item.id);

        // Filtrer les liens pour ne garder que ceux associés au profil
        return this.dataStore.liens$.pipe(
          map(liens => {
            // Pour chaque lien dans dataStore.liens$, vérifier si son ID est dans linkedIds
            // Ici, on suppose que l'ID est disponible ailleurs, peut-être comme une propriété supplémentaire
            return liens.filter((lien, index) => {
              // Rechercher l'index du lien actuel dans les données du profil
              return linkedIds.includes(index + 1);
            });
          })
        );
      })
    )
  }

  sendEmail(e: Event) {
    e.preventDefault();

    if (this.emailForm.invalid) {
      return;
    }

    // Récupérez les valeurs du formulaire
    const formData = this.emailForm.value;

    emailjs
      .send(this.emailJSID.serviceID, this.emailJSID.templateID, {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        message: formData.message
      }, {
        publicKey: this.emailJSID.publicKey,
      })
      .then(
        () => {
          console.log('Email envoyé avec succès');
          // Réinitialisez le formulaire
          this.emailForm.reset();
        },
        (error) => {
          console.error('Erreur lors de l\'envoi de l\'email', error);
        },
      );
  }

  getFileUrl(filename: string): string | null {
    return this.dataStore.getFileByName(filename);
  }
}
