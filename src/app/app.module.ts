import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoxesComponent } from './boxes/boxes.component';
import { ItemComponent } from './item/item.component';
import { FormsModule } from '@angular/forms';
import { StoreComponent } from './store/store.component';
import { ItemCardComponent } from './item-card/item-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from './pagination/pagination.component';
import { ExcelImportExportComponent } from './excel-import-export/excel-import-export.component';
import { TableComponent } from './table/table.component';
import { SearchBoxComponent } from './search-box/search-box.component';

@NgModule({
  declarations: [
    AppComponent,
    BoxesComponent,
    ItemComponent,
    StoreComponent,
    ItemCardComponent,
    PaginationComponent,
    ExcelImportExportComponent,
    TableComponent,
    SearchBoxComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 1000 } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
