import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, Observable } from 'rxjs';
import { IProduct } from '../shared/interfaces';
import { ProductService } from './../shared/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  product$: Observable<IProduct>
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.product$ = this.route.params
      .pipe(switchMap(params => {
        return this.productService.getItem(params['id'])
      }))
  }

}
