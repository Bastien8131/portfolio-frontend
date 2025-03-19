import {Component, OnInit} from '@angular/core';
import {ProfileStrapiService} from '../../core/services/strapi/profile.strapi.service';
import {Profile} from '../../core/models/strapi/singleType/profile.model';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  profile!: Profile;

  constructor(
    private profileService: ProfileStrapiService,
  ) {
  }

  ngOnInit() {
    this.profileService.profile$.subscribe(profile => {
      this.profile = profile;
    });
  }

}
