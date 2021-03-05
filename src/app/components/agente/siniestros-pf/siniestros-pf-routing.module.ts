import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiniestrosPfComponent } from './siniestros-pf.component';

const ROUTES: Routes = [
  {
    path: ':codAgente',
    component: SiniestrosPfComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class SiniestrosPfRoutingModule { }
