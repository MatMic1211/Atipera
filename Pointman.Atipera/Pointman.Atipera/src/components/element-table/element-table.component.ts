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
  isLoading: boolean = false;
  filterControl = new FormControl('');
  editDialogOpen = false;
  editedElement: PeriodicElement | null = null;
  editedCopy: PeriodicElement = { id: 0, position: 0, name: '', weight: 0, symbol: '' };

  constructor(private elementService: ElementService) { }

  ngOnInit(): void {
    this.loadData();

    this.filterControl.valueChanges.pipe(debounceTime(2000)).subscribe(value => {
      const filterValue = value?.toString().toLowerCase() ?? '';
      this.isLoading = true;
      this.elementService.getElements().subscribe(data => {
        this.dataSource = data.filter(el =>
          el.name.toLowerCase().includes(filterValue) ||
          el.symbol.toLowerCase().includes(filterValue) ||
          el.position.toString().includes(filterValue) ||
          el.weight.toString().includes(filterValue) ||
          el.id.toString().includes(filterValue)
        );
        this.isLoading = false;
      });
    });
  }

  loadData(): void {
    this.isLoading = true;
    this.elementService.getElements().subscribe(data => {
      this.dataSource = data;
      this.isLoading = false;
    });
  }

  openEditDialog(element: PeriodicElement): void {
    this.editedElement = element;
    this.editedCopy = { ...element };
    this.editDialogOpen = true;
  }

  saveEdit(): void {
    if (!this.editedElement || !this.isEditValid()) {
      return;
    }

    this.elementService.updateElement(this.editedCopy).subscribe(updated => {
      const index = this.dataSource.findIndex(el => el.id === updated.id);
      if (index !== -1) {
        this.dataSource[index] = { ...updated };
        this.dataSource = [...this.dataSource]; 
      }
      this.closeEditDialog();
    });
  }

  closeEditDialog(): void {
    this.editDialogOpen = false;
    this.editedElement = null;
  }

  isEditValid(): boolean {
    return this.editedCopy.name.trim() !== '' &&
      this.editedCopy.symbol.trim() !== '' &&
      this.editedCopy.position !== null &&
      this.editedCopy.weight !== null &&
      !isNaN(this.editedCopy.position) &&
      !isNaN(this.editedCopy.weight);
  }

  isValueNaN(value: any): boolean {
    return isNaN(value);
  }
}
