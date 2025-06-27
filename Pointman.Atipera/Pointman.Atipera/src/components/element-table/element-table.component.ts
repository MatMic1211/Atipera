import { Component, OnInit } from '@angular/core';
import { ElementService, PeriodicElement } from '../../app/services/element.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'element-table',
  standalone: false,
  templateUrl: './element-table.component.html',
  styleUrls: ['./element-table.component.css']
})
export class ElementTableComponent implements OnInit {
  displayedColumns: string[] = ['number', 'name', 'weight', 'symbol', 'actions'];
  dataSource: PeriodicElement[] = [];
  fullData: PeriodicElement[] = [];
  isLoading: boolean = false;
  filterControl = new FormControl('');
  editDialogOpen = false;
  editedElement: PeriodicElement | null = null;
  editedCopy: PeriodicElement = { position: 0, name: '', weight: 0, symbol: '' };

  constructor(private elementService: ElementService) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.elementService.getElements().subscribe(data => {
      this.fullData = data;
      this.dataSource = [...data];
      this.isLoading = false;
    });

    this.filterControl.valueChanges
      .subscribe(() => {
        this.isLoading = true;  
      });

    this.filterControl.valueChanges
      .pipe(debounceTime(2000))
      .subscribe(value => {
        const filterValue = value?.toString().toLowerCase() ?? '';
        this.dataSource = this.fullData.filter(el =>
          el.name.toLowerCase().includes(filterValue) ||
          el.symbol.toLowerCase().includes(filterValue) ||
          el.position.toString().includes(filterValue) ||
          el.weight.toString().includes(filterValue)
        );
        this.isLoading = false;  
      });
  }

  openEditDialog(element: PeriodicElement): void {
    this.editedElement = element;
    this.editedCopy = { ...element };
    this.editDialogOpen = true;
  }

  saveEdit(): void {
    if (this.editedElement) {
      const index = this.fullData.findIndex(e => e.position === this.editedElement?.position);
      if (index !== -1) {
        this.fullData[index] = { ...this.editedCopy };
        this.dataSource = [...this.fullData];
      }
    }
    this.closeEditDialog();
  }

  closeEditDialog(): void {
    this.editDialogOpen = false;
    this.editedElement = null;
  }
}
