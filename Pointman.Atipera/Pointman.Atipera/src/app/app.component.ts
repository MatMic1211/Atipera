import { Component, OnInit } from '@angular/core';
import { ElementService, PeriodicElement } from './services/element.service';


@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['number', 'name', 'weight', 'symbol'];
  dataSource: PeriodicElement[] = [];

  constructor(private elementService: ElementService) { }

  ngOnInit(): void {
    this.elementService.getElements().subscribe(data => {
      this.dataSource = data;
    });
  }
}
