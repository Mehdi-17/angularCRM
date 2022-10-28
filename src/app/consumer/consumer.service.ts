import { Consumer } from './model/consumer';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const KEY_JWTTOKEN = 'angularCRM.jwtToken';

@Injectable({
  providedIn: 'root',
})
export class ConsumerService {
  private consumers?: Consumer[];

  constructor(private http: HttpClient) {
  }

  getConsumersList(): Observable<Consumer[]>{
    return this.http.get<Consumer[]>('api/consumers');
  }

  getConsumersByName(name: string): Observable<Consumer[]>{
    return this.http.get<Consumer[]>(`api/consumers?q=${name}`);
  }

  getConsumerById(id: string): Observable<Consumer>{
    return this.http.get<Consumer>(`api/consumers/${id}`);
  }

  createOrUpdateConsumer(consumer: Consumer): Observable<void>{
    if(consumer.id){
      return this.http.put<void>(`api/consumers/${consumer.id}`, consumer);
    }
    return this.http.post<void>('api/consumers', consumer);
  }

}
