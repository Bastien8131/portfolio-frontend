import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatDialog } from '@angular/material/dialog';
import { DialogPdfComponent } from '../../shared/components/dialog-pdf/dialog-pdf.component';
import { environment } from '../../../environments/environment';
import { DataStoreService } from '../../core/services/store/data-store.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-a-propos',
  standalone: true,
  imports: [
    MarkdownComponent,
    PdfViewerModule,
    NgIf,
    AsyncPipe
  ],
  template: `
    <ng-container *ngIf="isLoading$ | async">
      <div class="loading">Chargement des informations...</div>
    </ng-container>

    <ng-container *ngIf="profile$ | async as profile">
      <markdown [data]="profile.descriptionAPropos"></markdown>
      <button *ngIf="cvUrl$ | async" (click)="openPDF()">Voir mon CV</button>
    </ng-container>
  `,
  styleUrl: './a-propos.component.scss'
})
export class AProposComponent {
  profile$;
  isLoading$;
  cvUrl$;
  apiUrl = environment.strapiUrl;

  constructor(
    private dataStore: DataStoreService,
    public dialog: MatDialog
  ) {
    this.profile$ = this.dataStore.profile$;
    this.isLoading$ = this.dataStore.profileLoading$;

    this.cvUrl$ = this.profile$.pipe(
      map(profile => {
        if (!profile || !profile.cv?.data?.attributes?.url) {
          return null;
        }
        return `${this.apiUrl}${profile.cv.data.attributes.url}`;
      })
    );
  }

  openPDF() {
    this.cvUrl$.subscribe(url => {
      if (!url) return;

      this.dialog.open(DialogPdfComponent, {
        data: { url }
      });
    }).unsubscribe();
  }
}
