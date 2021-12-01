import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
export type TAlert = 'success' | 'warn' | 'danger'
export interface IAlert {
  type: TAlert
  text: string
}
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public alert$ = new Subject<IAlert>()
  constructor() { }
  success(text: string) {
    this.alert$.next({ type: 'success', text })
  }
  warn(text: string) {
    this.alert$.next({ type: 'warn', text })
  }
  danger(text: string) {
    this.alert$.next({ type: 'danger', text })
  }
}
