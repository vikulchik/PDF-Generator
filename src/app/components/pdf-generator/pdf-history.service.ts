import {Injectable} from '@angular/core';
import {PDFHistory, PDFHistoryRecord} from "./pdf-generator.types";

import {StorageService} from "../../services/storage/storage.service";
import {PDF_HISTORY_STORAGE_KEY} from "../../config";
import {IdService} from "../../services/id/id.service";

@Injectable({
  providedIn: 'root'
})
export class PdfHistoryService {
  constructor(private storage: StorageService, private id: IdService) {}

  create(text: string) {
    const version = this.id.generate();
    const data: PDFHistory = {
      text,
      date: new Date().toISOString(),
      version
    }

    const pdfHistory: PDFHistoryRecord = this.storage.get(PDF_HISTORY_STORAGE_KEY) ?? {}
    pdfHistory[version] = data;

    this.storage.set<PDFHistoryRecord>(PDF_HISTORY_STORAGE_KEY, pdfHistory);
  }

  getAll(): PDFHistoryRecord | null {
    return this.storage.get(PDF_HISTORY_STORAGE_KEY);
  }
}
