import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '@components/not-found/not-found.component';
import { CobranzasGuard } from '@services-cobranzas/cobranzas.guard';
import { SiniestrosGuard } from '@components/agente/siniestros-pf/services/siniestros.guard';

const ROUTES: Routes =[
  {
    path: '',
    component: NotFoundComponent
  },
  {
    path: 'cobranzas-agente/:codAgente',
    loadChildren: () => import('@components/agente/cobranzas/cobranzas.module').then(m => m.InformesCobranzasModule),
    canLoad:[CobranzasGuard]
  },
  {
    path: 'siniestros-agente',
    loadChildren: () => import('@components/agente/siniestros-pf/siniestros-pf.module').then(m => m.SiniestrosPfModule),
    canLoad:[SiniestrosGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
