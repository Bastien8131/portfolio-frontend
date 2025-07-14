import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatDialog } from '@angular/material/dialog';
import { DialogPdfComponent } from '../../shared/components/dialog-pdf/dialog-pdf.component';
import { environmentDev } from '../../../environments/environment.dev';
import { DataStoreService } from '../../core/services/store/data-store.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profile } from '../../core/models/strapi/singleType/profile.model';

@Component({
  selector: 'app-a-propos',
  standalone: true,
  imports: [
    MarkdownComponent,
    PdfViewerModule,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './a-propos.component.html',
  styleUrl: './a-propos.component.scss'
})
export class AProposComponent {
  // Typage explicite des observables
  profile$: Observable<Profile | null>;
  isLoading$: Observable<boolean>;
  cvUrl$: Observable<string | null>;
  apiUrl = environmentDev.strapiUrl;

  constructor(
    private dataStore: DataStoreService,
    public dialog: MatDialog
  ) {
    // Initialisation après la déclaration
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
        data: { url },
        panelClass: 'pdf-dialog',
        autoFocus: false
      });
    }).unsubscribe();
  }
}
