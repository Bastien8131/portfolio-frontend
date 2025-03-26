import {Component, Inject} from '@angular/core';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Article} from '../../../core/models/strapi/collectionType/article.model';

@Component({
  selector: 'app-dialog-pdf',
  imports: [
    PdfViewerModule
  ],
  templateUrl: './dialog-pdf.component.html',
  styleUrl: './dialog-pdf.component.scss'
})
export class DialogPdfComponent {
  zoom = 1;

  constructor(
    public dialogRef: MatDialogRef<DialogPdfComponent>,
    @Inject(MAT_DIALOG_DATA) public url: string
  ) { }


  zoomBtn(opt: string) {
    switch (opt){
      case 'in':
        this.zoom += 0.1;
        break;
      case 'out':
        this.zoom -= 0.1;
        break;
      default :
        this.zoom = 1;
        break;
    }
  }
}
