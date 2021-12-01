import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from './../../shared/product.service';
import { AlertService } from './../../shared/alert.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {
  form: FormGroup
  isSubmitting = false
  constructor(
    private productService: ProductService,
    private router: Router,
    private alert: AlertService
  ) { }
  ngOnInit() {
    this.form = new FormGroup({
      type: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      photo: new FormControl(null, Validators.required),
      info: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required)
    })
  }
  submit() {
    if (this.form.invalid) return
    this.isSubmitting = true
    this.productService.createItem(this.form.value).subscribe(() => {
      this.form.reset()
      this.isSubmitting = false
      this.alert.success('Item added')
      this.router.navigate(['/admin', 'dashboard'])
    })
  }
}