import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoxesComponent } from './boxes/boxes.component';
import { ItemComponent } from './item/item.component';
import { FormsModule } from '@angular/forms';
import { StoreComponent } from './store/store.component';
import { ItemCardComponent } from './item-card/item-card.component';
import { CrudeComponentComponent } from './crude-component/crude-component.component';

@NgModule({
  declarations: [
    AppComponent,
    BoxesComponent,
    ItemComponent,
    StoreComponent,
    ItemCardComponent,
    CrudeComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
