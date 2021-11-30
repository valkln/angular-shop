import { Component, OnInit } from '@angular/core';
import { ProductService } from './../shared/product.service';
import { IProduct } from 'src/app/shared/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from './../shared/order.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  form: FormGroup
  isSubmitting = false
  cart: IProduct[] = []
  totalPrice = 0
  constructor(
    private productService: ProductService,
    private orderService: OrderService
  ) { }
  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      payment: new FormControl(null, Validators.required),
    })
    this.cart = this.productService.cart
    for (let i = 0; i < this.cart.length; i++) {
      this.totalPrice += +this.cart[i].price
    }
  }
  submit() {
    if (this.form.invalid) return
    this.isSubmitting = true
    let order = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      payment: this.form.value.payment,
      price: this.totalPrice,
      date: new Date(),
      products: this.cart
    }
    this.orderService.createOrder(order).subscribe(() => {
      this.form.reset()
      this.isSubmitting = false
    })
  }
  delete(product) {
    this.totalPrice -= +product.ProductService
    this.cart.splice(this.cart.indexOf(product), 1)
  }
}
