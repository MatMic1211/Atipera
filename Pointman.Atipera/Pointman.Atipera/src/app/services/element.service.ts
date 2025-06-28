import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface PeriodicElement {
  id: number;
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

@Injectable({
  providedIn: 'root'
})
export class ElementService {
  private elements: PeriodicElement[] = [
    { id: 1, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { id: 2, position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { id: 3, position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { id: 4, position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { id: 5, position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { id: 6, position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { id: 7, position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { id: 8, position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { id: 9, position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { id: 10, position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  ];

  constructor() { }

  getElements(): Observable<PeriodicElement[]> {
    return of(this.elements).pipe(delay(1000));
  }

  updateElement(updatedElement: PeriodicElement): Observable<PeriodicElement> {
    const index = this.elements.findIndex(e => e.id === updatedElement.id);
    if (index !== -1) {
      this.elements[index] = { ...updatedElement };
    }
    return of(this.elements[index])
  }
}
