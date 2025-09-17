
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicLayoutComponent } from './layouts/basic-layout/basic-layout.component';
import { CrudLayoutComponent } from './layouts/crud-layout/crud-layout.component';

const routes: Routes = [
  { path: 'basic', component: BasicLayoutComponent },
  { path: 'crud', component: CrudLayoutComponent },
  { path: '', redirectTo: '/basic', pathMatch: 'full' },
  { path: '**', redirectTo: '/basic' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
