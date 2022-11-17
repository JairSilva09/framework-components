import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudeComponentComponent } from './crude-component/crude-component.component';

const routes: Routes = [
  {path: '**',component: CrudeComponentComponent},
  { path: '**', pathMatch: 'full', redirectTo: '**' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
