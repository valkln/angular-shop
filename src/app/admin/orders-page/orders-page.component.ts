import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from './../../shared/order.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {
  orders = []
  oSub: Subscription
  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.oSub = this.orderService.getOrders().subscribe(orders => {
      this.orders = orders
    })
  }
  ngOnDestroy() {
    if (this.oSub) {
      this.oSub.unsubscribe()
    }
  }

}
