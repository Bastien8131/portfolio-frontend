import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatDialog } from '@angular/material/dialog';
import { DialogPdfComponent } from '../../shared/components/dialog-pdf/dialog-pdf.component';
import { DataStoreService } from '../../core/services/store/data-store.service';
import { Observable } from 'rxjs';
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
  profile$: Observable<Profile | null>;
  isLoading$: Observable<boolean>;
  cvUrl$: Observable<string | null>;

  constructor(
    private dataStore: DataStoreService,
    public dialog: MatDialog
  ) {
    this.profile$ = this.dataStore.profile$;
    this.isLoading$ = this.dataStore.profileLoading$;
    this.cvUrl$ = this.dataStore.cvUrl$;
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
