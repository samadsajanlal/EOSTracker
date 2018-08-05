import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProducerRoutingModule } from './Producer-routing.module';

import { ProducersComponent } from './Producers/Producers.component';
import { ProducerComponent } from './Producer/Producer.component';

@NgModule({
  imports: [
    SharedModule,
    ProducerRoutingModule
  ],
  declarations: [
    ProducersComponent,
    ProducerComponent
  ]
})
export class ProducerModule { }
