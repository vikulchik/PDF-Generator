import { TestBed } from '@angular/core/testing';
import { PdfHistoryService } from './pdf-history.service';
import { StorageService } from '../../services/storage/storage.service';
import { PDF_HISTORY_STORAGE_KEY } from '../../config';
import {PDFHistory, PDFHistoryRecord} from './pdf-generator.types';
import * as uuidAll from 'uuid';
import {IdService} from "../../services/id/id.service";

// Mock StorageService
class MockStorageService {
  private store: PDFHistoryRecord = {};

  get(key: string): any {
    return this.store[key] || null;
  }

  set(key: string, value: PDFHistory): void {
    this.store[key] = value;
  }

  remove(key: string): void {
    delete this.store[key];
  }
}

class MockIdService {
  generate() {
    return '1234';
  }
}

describe('PdfHistoryService', () => {
  let service: PdfHistoryService;
  let storageService: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PdfHistoryService,
        { provide: StorageService, useClass: MockStorageService },
        { provide: IdService, useClass: MockIdService },
      ]
    });

    service = TestBed.inject(PdfHistoryService);
    storageService = TestBed.inject(StorageService);
  });

  it('should create a PDF history', () => {
    const text = 'Sample text';
    service.create(text);

    const history = storageService.get<PDFHistoryRecord>(PDF_HISTORY_STORAGE_KEY);
    expect(history!['1234']).toEqual({
      text: 'Sample text',
      date: jasmine.any(String),
      version: '1234'
    });
  });

  it('should return all PDF history', () => {
    storageService.set(PDF_HISTORY_STORAGE_KEY, {
      '1234': {
        text: 'Sample text',
        date: new Date().toISOString(),
        version: '1234'
      },
      '5678': {
        text: 'Sample text 2',
        date: new Date().toISOString(),
        version: '5678'
      }
    })

    const history = storageService.get(PDF_HISTORY_STORAGE_KEY);
    expect(history).toEqual({
      '1234': {
        text: 'Sample text',
        date: jasmine.any(String),
        version: '1234'
      },
      '5678': {
        text: 'Sample text 2',
        date: jasmine.any(String),
        version: '5678'
      }
    });
  });
});
