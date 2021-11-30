import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { map, Observable } from 'rxjs';
import { FBResponse, IProduct } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  type = 'phone'
  cart: IProduct[] = []
  constructor(private http: HttpClient) { }
  createItem(product) {
    return this.http.post<FBResponse>(`${environment.DBUrl}products.json`, product)
      .pipe(map(res => {
        return {
          ...product,
          id: res.name
        }
      }))
  }
  getList(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${environment.DBUrl}products.json`)
      .pipe(map(res => {
        return Object.keys(res)
          .map(key => ({
            ...res[key],
            id: key,
          }))
      }))
  }
  getItem(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${environment.DBUrl}products/${id}.json`)
      .pipe(map((res) => {
        return {
          ...res,
          id
        }
      }))
  }
  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.DBUrl}products/${id}.json`)
  }
  editItem(product: IProduct): Observable<IProduct> {
    return this.http.patch<IProduct>(`${environment.DBUrl}products/${product.id}.json`, product)
  }
  setType(type) {
    this.type = type
  }
  addToCart(product) {
    this.cart.push(product)
  }
}