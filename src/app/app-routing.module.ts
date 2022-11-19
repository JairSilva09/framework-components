import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { ExcelImportExportComponent } from './excel-import-export/excel-import-export.component';

const routes: Routes = [
  {path: 'file',component: ExcelImportExportComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'file' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
