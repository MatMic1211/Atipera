import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-element-loader',
  templateUrl: './element-loader.component.html',
  styleUrls: ['./element-loader.component.css'],
  standalone: true,
  imports: [MatProgressSpinnerModule],
})
export class ElementLoaderComponent {
}
