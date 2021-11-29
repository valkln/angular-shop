import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup
  isSubmitting = false
  constructor(
    public auth: AuthService,
    private router: Router
  ) { }
  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }
  submit() {
    if (this.form.invalid) return
    this.isSubmitting = true
    const user = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    }
    this.auth.login(user).subscribe({
      next: () => {
        this.form.reset
        this.router.navigate(['/admin', 'dashboard'])
        this.isSubmitting = false
      },
      error: (err) => {
        console.log(err)
        this.isSubmitting = false
      }
    })
  }
}
