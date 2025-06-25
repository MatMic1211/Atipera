import { Component, OnInit } from '@angular/core';
import { ElementService, PeriodicElement } from '../../app/services/element.service';



@Component({
  selector: 'element-table',
  standalone: false,
  templateUrl: './element-table.component.html',
  styleUrls: ['./element-table.component.css']
})
export class ElementTableComponent implements OnInit {
  displayedColumns: string[] = ['number', 'name', 'weight', 'symbol'];
  dataSource: PeriodicElement[] = [];

  constructor(private elementService: ElementService) { }

  ngOnInit(): void {
    this.elementService.getElements().subscribe(data => {
      this.dataSource = data;
    });
  }
}
