import { Component } from '@angular/core';
import { PDFDocument, PDFPage } from 'pdf-lib';

@Component({
  selector: 'app-pdf-joiner',
  templateUrl: './pdf-joiner.component.html',
  styleUrls: ['./pdf-joiner.component.css'],
})
export class PdfJoinerComponent {
  outputURL?: string;

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    const filePromises: Promise<Uint8Array>[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePromise = this.readFileAsArrayBuffer(file);
      filePromises.push(filePromise);
    }

    Promise.all(filePromises).then(async (fileArrayBuffers: Uint8Array[]) => {
      const mergedPDF = await this.mergePDFs(fileArrayBuffers);
      this.outputURL = URL.createObjectURL(
        new Blob([mergedPDF], { type: 'application/pdf' })
      );
    });
  }

  readFileAsArrayBuffer(file: File): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const arrayBuffer = event.target.result;
        const uint8Array = new Uint8Array(arrayBuffer);
        resolve(uint8Array);
      };
      reader.onerror = (event) => {
        reject(event);
      };
      reader.readAsArrayBuffer(file);
    });
  }

  async mergePDFs(fileArrayBuffers: Uint8Array[]): Promise<Uint8Array> {
    const mergedPDF = await PDFDocument.create();

    for (const fileArrayBuffer of fileArrayBuffers) {
      const pdf = await PDFDocument.load(fileArrayBuffer);
      const pages = await mergedPDF.copyPages(pdf, pdf.getPageIndices());

      for (const page of pages) {
        mergedPDF.addPage(page);
      }
    }

    const mergedPDFBytes = await mergedPDF.save();
    return mergedPDFBytes;
  }

  joinPDFs() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
    fileInput.addEventListener('change', this.onFileSelected.bind(this));
    fileInput.click();
  }
}
