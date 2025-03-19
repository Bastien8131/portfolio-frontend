import {Component, OnInit} from '@angular/core';
import {ProfileStrapiService} from '../../core/services/strapi/profile.strapi.service';
import {Profile} from '../../core/models/strapi/singleType/profile.model';
import {NgForOf} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

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

  onSubmit() {
    let value = this.emailForm.value;
    console.log(value)
  }
}
