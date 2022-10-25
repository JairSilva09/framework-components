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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokeInterceptor } from './store/token.interceptor';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

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
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: TokeInterceptor,
    multi: true,
  }, { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 1000 } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
