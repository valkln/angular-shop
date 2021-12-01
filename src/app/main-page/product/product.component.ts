import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from './../../shared/product.service';
import { AlertService } from './../../shared/alert.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product
  constructor(
    private productService: ProductService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
  }
  addToCart(product) {
    this.productService.addToCart(product)
    this.alert.success('Item added to cart')
  }
}
