import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformesCobranzasComponent } from '@components/agente/cobranzas/cobranzas.component';

const ROUTES: Routes = [
  {
    path: '',
    component: InformesCobranzasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class InformesCobranzasRoutingModule { }