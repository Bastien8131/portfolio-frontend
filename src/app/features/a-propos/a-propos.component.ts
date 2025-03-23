import {Component, OnInit} from '@angular/core';
import {Profile} from '../../core/models/strapi/singleType/profile.model';
import {StrapiFile} from '../../core/models/strapi/file.model';
import {FilesStrapiService} from '../../core/services/strapi/files.strapi.service';
import {ProfileStrapiService} from '../../core/services/strapi/profile.strapi.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-a-propos',
  imports: [],
  templateUrl: './a-propos.component.html',
  styleUrl: './a-propos.component.scss'
})
export class AProposComponent implements OnInit {
  profile!: Profile;
  cv!: StrapiFile;

  constructor(
    private filesStrapiService: FilesStrapiService,
    private profileService: ProfileStrapiService,
  ) {
  }

  ngOnInit() {
    this.profileService.profile$.subscribe(profile => {
      this.profile = profile;
      console.log(this.profile);
    });
  }

}
