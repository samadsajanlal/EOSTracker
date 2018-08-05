import {Component, OnInit} from '@angular/core';
import {ProducerService} from '../../services/producer.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

declare let jquery: any;
declare let $: any;

@Component({
  selector: 'app-producers',
  templateUrl: './producers.component.html',
  styleUrls: ['./producers.component.scss']
})
export class ProducersComponent implements OnInit {
  producers = null;
  private subscriber: Subscription;
  page = 1;

  constructor(
    private producerService: ProducerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.subscriber = this.route.queryParams.subscribe(params => {
      this.page = params['page'] || 1;

      this.producerService.getProducers(this.page).subscribe(data => {
        this.producers = data;
        console.log(data);
      });
    });
  }


  nextPage() {
    this.page++;
    this.router.navigate(['/producers'], {queryParams: {page: this.page}});
  }

  prevPage() {
    this.page--;
    this.router.navigate(['/producers'], {queryParams: {page: this.page}});
  }
}
