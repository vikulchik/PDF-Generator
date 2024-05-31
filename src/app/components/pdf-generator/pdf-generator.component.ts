import {Component, ViewChild} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PdfJsViewerModule} from "ng2-pdfjs-viewer";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../config";
import {PdfHistoryService} from "./pdf-history.service";
import {PDFHistory} from "./pdf-generator.types";
import {DatePipe, NgForOf} from "@angular/common";

type GeneratePDFOptions = {
  history?: PDFHistory;
  addToHistory?: boolean
}

@Component({
  selector: 'app-pdf-generator',
  standalone: true,
  imports: [
    FormsModule,
    PdfJsViewerModule,
    ReactiveFormsModule,
    NgForOf,
    DatePipe,
  ],
  templateUrl: './pdf-generator.component.html',
})
export class PdfGeneratorComponent {
  text = new FormControl('');
  history: PDFHistory[] = [];

  @ViewChild('pdfViewer') pdfViewer: any;

  constructor(private http: HttpClient, private pdfHistoryService: PdfHistoryService) {
    this.renderHistory();
  }

  public generate(options?: GeneratePDFOptions): any {
    const {history, addToHistory = true} = options ?? {};
    const text = history?.text || this.text.value || '';

    if (!text) {
      return;
    }

    return this.http.post(API_URL, {'text': text}, {responseType: 'blob'})
      .subscribe(
        (res: Blob) => {
          this.renderPdf(res);
          this.text.reset();

          if (addToHistory) {
            this.pdfHistoryService.create(text);
            this.renderHistory();
          }
        }
      );
  }

  public renderPdf(res: any) {
    this.pdfViewer.pdfSrc = res;
    this.pdfViewer.refresh();
  }

  private renderHistory() {
    this.history = Object.values(this.pdfHistoryService.getAll() ?? []);
  }
}
