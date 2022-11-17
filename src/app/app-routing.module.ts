import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WirelessDeviceManagementComponent } from './wireless-device-management/wireless-device-management.component';


const routes: Routes = [
  {path: '**',component: WirelessDeviceManagementComponent},
  { path: '**', pathMatch: 'full', redirectTo: '**' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
