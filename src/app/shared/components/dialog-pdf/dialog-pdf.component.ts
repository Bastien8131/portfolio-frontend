import {Component, Inject} from '@angular/core';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Article} from '../../../core/models/strapi/collectionType/article.model';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-dialog-pdf',
  imports: [
    PdfViewerModule,
    NgIf
  ],
  templateUrl: './dialog-pdf.component.html',
  styleUrl: './dialog-pdf.component.scss'
})
export class DialogPdfComponent {
  private _zoom = 1;
  isLoad: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogPdfComponent>,
    @Inject(MAT_DIALOG_DATA) public url: string
  ) { }


  get zoom(): number {
    return this._zoom;
  }

  set zoom(value: number) {
    this._zoom = value;
  }


  async partager() {
    if (navigator.share) {
      try {
        // Vérifier si le partage de fichiers est pris en charge
        const response = await fetch(this.url);
        const blob = await response.blob();
        const fichier = new File([blob], 'document.pdf', { type: 'application/pdf' });

        if (navigator.canShare && navigator.canShare({ files: [fichier] })) {
          // Partage avec fichier si pris en charge
          console.log('test')
          await navigator.share({
            title: 'Document PDF',
            files: [fichier]
          });
        } else {
          // Partage avec URL si le partage de fichiers n'est pas pris en charge
          await navigator.share({
            title: 'Document PDF',
            text: 'Consultez ce document PDF',
            url: this.url
          });
        }
      } catch (error) {
        console.error('Erreur de partage:', error);
      }
    } else {
      // Solution de repli pour navigateurs sans support de l'API Web Share
      const lienTemp = document.createElement('a');
      lienTemp.href = this.url;
      lienTemp.target = '_blank';
      lienTemp.click();
    }
  }


  telecharger() {
    //telecharger le pdf
    const lienTemp = document.createElement('a');
    lienTemp.href = this.url;
    lienTemp.download = 'document.pdf';
    lienTemp.click();

  }
}
