import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Producer } from '../models/Producer';
import { Action } from '../models/Action';
import { Result } from '../models/Result';
import { EosService } from './eos.service';

@Injectable()
export class ProducerService {

  constructor(
    private http: HttpClient,
    private eosService: EosService
  ) { }

  getProducer(id: string): Observable<Result<Producer>> {
    return this.http.get(`${environment.apiUrl}/producers/${id}`).pipe(
      map(producer => {
        return <Result<Producer>>{
          isError: false,
          value: producer as Producer
        };
      }),
      catchError(error => {
        console.log('TODO: API Error', error);
        return this.eosService.getProducer(id);
      })
    );
  }

  getProducers(page = 1, size = 30): Observable<Producer[]> {
    return this.http.get(`${environment.apiUrl}/producers`, {
      params: new HttpParams({
        fromString: `page=${page}&size=${size}`
      })
    }).pipe(
      map((producers: any) => producers.map(producer => producer as Producer))
    );
  }

  getProducerActions(id: string, page = 1): Observable<Action[]> {
    return this.http.get(`${environment.apiUrl}/producers/${id}/actions`, {
      params: new HttpParams({
        fromString: `page=${page}`
      })
    }).pipe(
      map((actions: any) => actions.map(action => action as Action))
    );
  }
}
