export type PDFHistory = {
  text: string;
  date: string;
  version: string;
}

export type PDFHistoryRecord = Record<string, PDFHistory>
