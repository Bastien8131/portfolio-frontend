import { Component } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';
import { DataStoreService } from '../../core/services/store/data-store.service';
import { Liens } from '../../core/models/strapi/collectionType/lien.model';
import { Observable } from 'rxjs';
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
  template: `
    <div class="page-content">
      <h1>Contact</h1>

      <ng-container *ngIf="profile$ | async as profile">
        <div class="liens-externes">
          <div *ngIf="profile.email">
            <h2>email</h2>
            <a href="mailto:{{profile.email}}">{{profile.email}}</a>
          </div>

          <div *ngIf="liens$ | async as liens">
            <h2>reseau</h2>
            <ng-container *ngFor="let lien of liens">
              <a [href]="lien.url" target="_blank">{{lien.nom}}</a>
            </ng-container>
          </div>
        </div>
      </ng-container>

      <form [formGroup]="emailForm" (ngSubmit)="sendEmail($event)">
        <div>
          <input type="text" id="nom" formControlName="nom" name="nom" placeholder="Nom" required>
          <input type="text" id="prenom" formControlName="prenom" name="prenom" placeholder="Prenom" required>
        </div>
        <div>
          <input type="email" id="email" formControlName="email" name="email" placeholder="Email" required>
        </div>
        <div>
          <textarea id="message" formControlName="message" name="message" placeholder="Message" required></textarea>
        </div>
        <button type="submit" [disabled]="emailForm.invalid">Envoyer</button>
      </form>
    </div>
  `,
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private emailJSID = environment.emailJS;

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
    this.profile$ = this.dataStore.profile$;

    this.liens$ = this.profile$.pipe(
      map(profile => {
        if (!profile || !profile.reseau?.data) {
          return [];
        }
        return profile.reseau.data.map(d => d.attributes);
      })
    );
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
}
