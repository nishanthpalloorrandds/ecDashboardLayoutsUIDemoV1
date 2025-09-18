
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicLayoutComponent } from './layouts/basic-layout/basic-layout.component';
import { CrudLayoutComponent } from './layouts/crud-layout/crud-layout.component';
import { CustomPanelLayoutComponent } from './layouts/custom-panel-layout/custom-panel-layout.component';

const routes: Routes = [
  { path: 'basic', component: BasicLayoutComponent },
  { path: 'crud', component: CrudLayoutComponent },
  { path: 'custom', component: CustomPanelLayoutComponent },
  { path: '', redirectTo: '/basic', pathMatch: 'full' },
  { path: '**', redirectTo: '/basic' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
