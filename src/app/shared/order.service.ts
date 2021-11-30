import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FBResponse } from './interfaces';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }
  createOrder(order) {
    return this.http.post<FBResponse>(`${environment.DBUrl}orders.json`, order)
      .pipe(map(res => {
        return {
          ...order,
          id: res.name,
          date: new Date(order.date)
        }
      }))
  }
  getOrders() {
    return this.http.get(`${environment.DBUrl}orders.json`)
      .pipe(map(res => {
        return Object.keys(res)
          .map(key => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date)
          }))
      }))
  }
}
