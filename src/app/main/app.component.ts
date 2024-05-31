import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {PdfJsViewerModule} from 'ng2-pdfjs-viewer';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PdfGeneratorComponent} from "../components/pdf-generator/pdf-generator.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PdfJsViewerModule, PdfGeneratorComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
}
