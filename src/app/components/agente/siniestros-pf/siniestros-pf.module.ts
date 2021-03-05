import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiniestrosPfRoutingModule } from './siniestros-pf-routing.module';
import { SiniestrosPfComponent } from './siniestros-pf.component';


@NgModule({
  declarations: [
    SiniestrosPfComponent
  ],
  imports: [
    CommonModule,
    SiniestrosPfRoutingModule
  ]
})
export class SiniestrosPfModule { }
