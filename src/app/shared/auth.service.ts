import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient
  ) { }
  login(user) {
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
      user).pipe(
        tap(this.setToken)
      )
  }
  logout() {
    return this.setToken(null)
  }
  isAuth() {
    return !!this.token
  }
  private setToken(res) {
    if (res) {
      const expTime = new Date(new Date().getTime() + +res.expiresIn * 1000)
      localStorage.setItem('token-exp', expTime.toString())
      localStorage.setItem('token', res.idToken)
    } else {
      localStorage.clear()
    }
  }
  get token() {
    const expTime = new Date(localStorage.getItem('token-exp'))
    if (new Date > expTime) {
      this.logout()
      return null
    }
    return localStorage.getItem('token')
  }
}
