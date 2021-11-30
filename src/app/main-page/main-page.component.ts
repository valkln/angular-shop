import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/interfaces';
import { ProductService } from './../shared/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  products$: Observable<IProduct[]>
  constructor(
    public productService: ProductService
  ) { }

  ngOnInit() {
    this.products$ = this.productService.getList()
  }
}
