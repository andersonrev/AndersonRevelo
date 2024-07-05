import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastTypeInterface } from '../../interfaces/toast.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationsToastService {

  showToastSubject = new Subject<ToastTypeInterface>();

  constructor() { }

  showToast(type: 'success' | 'error', text: string) {
    this.showToastSubject.next({ text, type });
  }
}
