import {Component, OnInit} from '@angular/core';
import {ProfileStrapiService} from '../../core/services/strapi/profile.strapi.service';
import {Profile} from '../../core/models/strapi/singleType/profile.model';
import {NgForOf} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  imports: [
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  profile!: Profile;
  private emailJSID = environment.emailJS;
  emailForm = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    email: new FormControl(''),
    message: new FormControl(''),
  });

  constructor(
    private profileService: ProfileStrapiService,
  ) {
  }

  ngOnInit() {
    this.profileService.profile$.subscribe(profile => {
      this.profile = profile;
    });
  }

  getLiens() {
    return this.profile.reseau.data.map(daum => daum.attributes);
  }

  sendEmail(e: Event) {
    e.preventDefault();

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
          console.log('SUCCESS!');
          // Réinitialisez le formulaire
          this.emailForm.reset();
        },
        (error) => {
          console.log('FAILED...', error);
        },
      );
  }
}
