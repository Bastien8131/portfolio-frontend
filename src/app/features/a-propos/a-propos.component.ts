import {Component, OnInit} from '@angular/core';
import {Profile} from '../../core/models/strapi/singleType/profile.model';
import {StrapiFile} from '../../core/models/strapi/file.model';
import {FilesStrapiService} from '../../core/services/strapi/files.strapi.service';
import {ProfileStrapiService} from '../../core/services/strapi/profile.strapi.service';
import {NgIf} from '@angular/common';
import {MarkdownComponent} from 'ngx-markdown';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {environment} from '../../core/environments/environment';
import {MatDialog} from '@angular/material/dialog';
import {DialogPdfComponent} from '../../shared/components/dialog-pdf/dialog-pdf.component';

@Component({
  selector: 'app-a-propos',
  imports: [
    MarkdownComponent,
    PdfViewerModule
  ],
  templateUrl: './a-propos.component.html',
  styleUrl: './a-propos.component.scss'
})
export class AProposComponent implements OnInit {
  profile!: Profile;
  url = '';
  apiUrl = environment.strapiUrl;

  constructor(
    private filesStrapiService: FilesStrapiService,
    private profileService: ProfileStrapiService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.profileService.profile$.subscribe(profile => {
      this.profile = profile;
      this.url = `${this.apiUrl}${profile.cv?.data.attributes.url}`;
      // this.cv = {
      //   ...profile.cv?.data.attributes,
      //   id: profile.cv?.data.id
      // }
    });
  }

  openPDF() {
    let dialogRef = this.dialog.open(DialogPdfComponent, {
      data: { url: this.url }
    });
  }
}
