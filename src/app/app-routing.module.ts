import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { ExcelImportExportComponent } from './excel-import-export/excel-import-export.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {path: 'table',component: TableComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'table' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
