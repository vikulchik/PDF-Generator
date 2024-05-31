import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {PdfGeneratorComponent} from './pdf-generator.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {PdfHistoryService} from "./pdf-history.service";
import {API_URL} from "../../config";
import {FormControl} from "@angular/forms";


class PdfHistoryServiceMock {
  create(text: string) {
    console.log(text)
  }

  getAll() {
    return {
      '1234': {
        text: 'Sample text',
        date: new Date().toISOString(),
        version: '1234'
      }
    }
  }
}

describe('PdfGeneratorComponent', () => {
  let component: PdfGeneratorComponent;
  let fixture: ComponentFixture<PdfGeneratorComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, PdfGeneratorComponent],
      providers: [{provide: PdfHistoryService, useClass: PdfHistoryServiceMock}]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfGeneratorComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call generate method when button is clicked', () => {
    spyOn(component, 'generate');

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    expect(component.generate).toHaveBeenCalled();
  });

  it('should render PDF after successful API request', () => {
    const testData = {data: 'test data'};
    component.text = new FormControl('test text')
    spyOn(component, 'renderPdf');


    component.generate();
    const mockBlob = new Blob(['test data'], {type: 'application/pdf'});

    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe('POST');
    req.flush(mockBlob);

    expect(component.renderPdf).toHaveBeenCalledWith(mockBlob);
  });
});


