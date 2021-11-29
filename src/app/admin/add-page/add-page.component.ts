import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from './../../shared/product.service';

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
    private router: Router
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
    this.productService.create(this.form.value).subscribe(() => {
      this.form.reset()
      this.isSubmitting = false
      this.router.navigate(['/admin'])
    })
  }
}