import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductService } from './../../shared/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IProduct } from 'src/app/shared/interfaces';
import { AlertService } from './../../shared/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  form: FormGroup
  product: IProduct
  isSubmitting = false
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        return this.productService.getItem(params['id'])
      })
    ).subscribe(product => {
      this.product = product
      this.form = new FormGroup({
        type: new FormControl(product.type, Validators.required),
        title: new FormControl(product.title, Validators.required),
        photo: new FormControl(product.photo, Validators.required),
        info: new FormControl(product.info, Validators.required),
        price: new FormControl(product.price, Validators.required)
      })
    })
  }
  submit() {
    if (this.form.invalid) return
    this.isSubmitting = true
    this.productService.editItem({
      id: this.product.id,
      type: this.form.value.type,
      title: this.form.value.title,
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price
    }).subscribe(() => {
      this.form.reset()
      this.isSubmitting = false
      this.alert.success('Item edited')
      this.router.navigate(['/admin', 'dashboard'])
    })
  }
}
