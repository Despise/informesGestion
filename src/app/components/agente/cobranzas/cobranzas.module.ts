import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule} from '@modules/material/material-module';
import { InformesCobranzasRoutingModule } from '@components/agente/cobranzas/cobranzas-routing.module';
import { FormsModule } from '@angular/forms';

import { InformesCobranzasComponent } from '@components/agente/cobranzas/cobranzas.component';
import { FilterItemDirective } from '@app/directives/filter-item.directive';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginatorClp } from '@comp-custom/custom-paginator-clp';
import { TableLoadingComponent } from '@app/shared/table-loading/table-loading.component';

@NgModule({
  declarations: [
      InformesCobranzasComponent,
      TableLoadingComponent,
      FilterItemDirective
    ],
  imports: [
    FlexLayoutModule,
    CommonModule,
    MaterialModule,
    InformesCobranzasRoutingModule,
    FormsModule
  ],
  providers: [
    {
        provide: MatPaginatorIntl,
        useClass: CustomPaginatorClp
    }
  ]
})
export class InformesCobranzasModule { }