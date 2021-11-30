import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/shared/interfaces';
import { ProductService } from './../../shared/product.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  products: IProduct[] = []
  pSub: Subscription
  dSub: Subscription
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.pSub = this.productService.getList().subscribe(products => {
      this.products = products
    })
  }
  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
    if (this.dSub) {
      this.dSub.unsubscribe()
    }
  }
  delete(id: string) {
    this.dSub = this.productService.deleteItem(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id)
    })
  }
}