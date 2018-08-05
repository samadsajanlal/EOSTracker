import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EosService} from '../../services/eos.service';
import {Subscription} from 'rxjs';
import {ProducerService} from '../../services/producer.service';

@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html'
})
export class ProducerComponent implements OnInit {
  public id: string;
  public producer = null;
  public actions = null;
  public producerRaw = null;
  private subscriber: Subscription;
  page = 1;

  constructor(
    private route: ActivatedRoute,
    private eosService: EosService,
    private producerService: ProducerService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.producerService.getProducer(this.id).subscribe(data => {
      this.producer = data;
      console.log(this.producer);

      this.subscriber = this.route.queryParams.subscribe(params => {
        this.page = params['page'] || 1;

        this.producerService.getProducerActions(this.id, this.page).subscribe(data => {
          this.actions = data;
          console.log(data);
        });
      });

      this.eosService.eos.getBlock(this.producer.blockId).then(result => {
        for (let index in result.producers) {
          if (result.producers[index].trx.id == this.producer.id) {
            this.producerRaw = result.producers[index];
            return;
          }
        }
      });

    });
  }
}
