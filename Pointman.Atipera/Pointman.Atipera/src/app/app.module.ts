import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ElementTableComponent } from '../components/element-table/element-table.component';
import { MatSortModule } from '@angular/material/sort';
import { ElementLoaderComponent } from '../components/element-loader/element-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    ElementTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatCardModule,
    MatSortModule,
    ElementLoaderComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
