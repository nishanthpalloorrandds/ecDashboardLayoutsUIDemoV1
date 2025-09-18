import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicLayoutComponent } from './layouts/basic-layout/basic-layout.component';
import { CrudLayoutComponent } from './layouts/crud-layout/crud-layout.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardLayoutModule,
    BasicLayoutComponent,
    CrudLayoutComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
