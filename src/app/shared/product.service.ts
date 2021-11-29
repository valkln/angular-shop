import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs';
import { FBResponse } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  create(product) {
    return this.http.post<FBResponse>(`${environment.DBUrl}products.json`, product)
      .pipe(map(res => {
        return {
          ...product,
          id: res.name
        }
      }))
  }
}